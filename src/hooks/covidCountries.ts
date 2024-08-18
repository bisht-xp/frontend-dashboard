import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface CountryInfo {
  _id: number;
  iso2: string;
  iso3: string;
  lat: number;
  long: number;
  flag: string;
}

export interface CountryData {
  updated: number;
  country: string;
  countryInfo: CountryInfo;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  continent: string;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
}

type CountriesData = CountryData[];

const fetchCountryData = async () => {
  const response = await axios.get("https://disease.sh/v3/covid-19/countries");
  return response.data;
};

export const useGetAllCountries = () => {
  const query = useQuery<CountriesData>({
    queryKey: ["covidCountries"],
    queryFn: fetchCountryData,
  });

  return { ...query, data: query.data };
};
