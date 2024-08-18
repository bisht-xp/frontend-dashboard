import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchChartData = async () => {
  const response = await axios.get(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
  return response.data;
};

export const useGetChartsData = () => {
  const query = useQuery({
    queryKey: ["covidChart"],
    queryFn: fetchChartData,
  });

  return { ...query, data: query.data };
};
