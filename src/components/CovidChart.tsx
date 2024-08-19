import React, { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
  AreaChart,
  Area,
} from "recharts";
import { useGetChartsData } from "../hooks/covidChartData";

interface ChartData {
  year: string;
  cases: number;
  deaths: number;
  recovered: number;
}

type DataType = "all" | "cases" | "deaths" | "recovered";

const CovidChart: React.FC = () => {
  // Fetching COVID-19 chart data, along with loading and error states using react query
  const { data, isLoading, error } = useGetChartsData();
  const [selectedDataType, setSelectedDataType] = useState<DataType>("all");

  const colors: { [key in Exclude<DataType, "all">]: string } = {
    cases: "#4BC0C0",
    deaths: "#FF6384",
    recovered: "#36A2EB",
  };

  // Function to format the fetched data into a yearly aggregated format
  const formatData = (): ChartData[] => {
    if (!data || !data.cases || !data.deaths || !data.recovered) return [];

    const yearlyData: { [year: string]: ChartData } = {};

    Object.keys(data.cases).forEach((date) => {
      const year = new Date(date).getFullYear().toString();
      if (!yearlyData[year]) {
        yearlyData[year] = { year, cases: 0, deaths: 0, recovered: 0 };
      }
      yearlyData[year].cases += data.cases[date] || 0;
      yearlyData[year].deaths += data.deaths[date] || 0;
      yearlyData[year].recovered += data.recovered[date] || 0;
    });

    return Object.values(yearlyData);
  };

  const chartData = formatData();

  // Function to format Y-axis labels with compact notation (e.g., "1.5M" for 1,500,000)
  const formatYAxis = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 1,
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

   // Custom Tooltip component to display additional information on hover
  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-4 rounded shadow-lg">
          <p className="text-gray-300">{`Year: ${label}`}</p>
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
    return (
      <div className="w-full h-[50vh] flex justify-center items-center">
        <p className="text-red-500">Error loading data: {error.message}</p>
      </div>
    );
  }

  return isLoading ? (
    <div className="w-full h-[50vh] flex justify-center items-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-white border-r-transparent "></div>
    </div>
  ) : (
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
          <option className="gap-2" value="all">
            All
          </option>
          <option value="cases">Cases</option>
          <option value="deaths">Deaths</option>
          <option value="recovered">Recovered</option>
        </select>
      </div>
      <div className="h-[60vh] md:h-[70vh]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="year"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              angle={0}
              textAnchor="middle"
              height={30}
            />
            <YAxis
              tick={{ fill: "#9CA3AF", fontSize: 10 }}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "#9CA3AF" }} />
            {(selectedDataType === "all" || selectedDataType === "cases") && (
              <Area
                type="monotone"
                dataKey="cases"
                stroke={colors.cases}
                fill={colors.cases}
                fillOpacity={0.3}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
            )}
            {(selectedDataType === "all" || selectedDataType === "deaths") && (
              <Area
                type="monotone"
                dataKey="deaths"
                stroke={colors.deaths}
                fill={colors.deaths}
                fillOpacity={0.3}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
            )}
            {(selectedDataType === "all" ||
              selectedDataType === "recovered") && (
              <Area
                type="monotone"
                dataKey="recovered"
                stroke={colors.recovered}
                fill={colors.recovered}
                fillOpacity={0.3}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CovidChart;
