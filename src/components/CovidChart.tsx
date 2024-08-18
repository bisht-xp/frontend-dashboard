import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { useGetChartsData } from "../hooks/covidChartData";

interface ChartData {
  date: string;
  cases: number;
  deaths: number;
  recovered: number;
}

// interface CovidData {
//   cases: { [date: string]: number };
//   deaths: { [date: string]: number };
//   recovered: { [date: string]: number };
// }

type DataType = "all" | "cases" | "deaths" | "recovered";

const CovidChart: React.FC = () => {
  const { data, isLoading, error } = useGetChartsData();
  const [selectedDataType, setSelectedDataType] = useState<DataType>("all");

  const colors: { [key in Exclude<DataType, "all">]: string } = {
    cases: "#4BC0C0",
    deaths: "#FF6384",
    recovered: "#36A2EB",
  };

  const formatData = (): ChartData[] => {
    if (!data || !data.cases || !data.deaths || !data.recovered) return [];
    return Object.keys(data.cases).map((date) => ({
      date: new Date(date).toLocaleDateString(),
      cases: data.cases[date] || 0,
      deaths: data.deaths[date] || 0,
      recovered: data.recovered[date] || 0,
    }));
  };

  const chartData = formatData();

  const formatYAxis = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(value);
  };

  const formatTooltipValue = (value: number): string => {
    return new Intl.NumberFormat().format(value);
  };

  interface CustomTooltipProps extends TooltipProps<number, string> {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      color: string;
    }>;
    label?: string;
  }

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-4 rounded shadow-lg">
          <p className="text-gray-300">{`Date: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${formatTooltipValue(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (error) {
    return <div className="text-red-500">Error loading data: {error.message}</div>;
  }

  if (isLoading) {
    return <div className="text-gray-300">Loading...</div>;
  }

  return (
    <div className="p-4 bg-gray-900 rounded-lg shadow-md w-full md:w-[90%]">
      <div className="mb-4">
        <label htmlFor="dataType" className="mr-2 text-gray-300">
          Select data type:
        </label>
        <select
          id="dataType"
          value={selectedDataType}
          onChange={(e) => setSelectedDataType(e.target.value as DataType)}
          className="p-2 border rounded bg-gray-800 text-gray-300 gap-3 "
        >
          <option className="gap-2" value="all">All</option>
          <option value="cases">Cases</option>
          <option value="deaths">Deaths</option>
          <option value="recovered">Recovered</option>
        </select>
      </div>
      <div className="h-[60vh] md:h-[70vh]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#9CA3AF", fontSize: 10 }}
              angle={90}
              textAnchor="start"
              height={60}
            />
            <YAxis
              tick={{ fill: "#9CA3AF", fontSize: 10 }}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "#9CA3AF" }} />
            {(selectedDataType === "all" || selectedDataType === "cases") && (
              <Line
                type="monotone"
                dataKey="cases"
                stroke={colors.cases}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
            )}
            {(selectedDataType === "all" || selectedDataType === "deaths") && (
              <Line
                type="monotone"
                dataKey="deaths"
                stroke={colors.deaths}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
            )}
            {(selectedDataType === "all" || selectedDataType === "recovered") && (
              <Line
                type="monotone"
                dataKey="recovered"
                stroke={colors.recovered}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CovidChart;