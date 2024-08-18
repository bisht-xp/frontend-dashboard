import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CountryData, useGetAllCountries } from "../hooks/covidCountries";

const CovidMap: React.FC = () => {
  const { data, error } = useGetAllCountries();

  if (error) {
    return (
      <div className="text-red-500">Error loading data: {error.message}</div>
    );
  }

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      className="h-[500px] w-full md:w-[70%] z-0"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        noWrap={true}
      />
      {data?.map((country: CountryData) => (
        <Marker
          key={country.country}
          position={[country.countryInfo.lat, country.countryInfo.long]}
        >
          <Popup className="">
            <div className="bg-black bg-opacity-80 text-white p-2 rounded-lg">
              <div className="flex flex-col justify-center items-center gap-3">
                <img
                  src={country.countryInfo.flag}
                  alt={country.countryInfo.iso3}
                  width={20}
                  height={20}
                />
                <h3 className="text-white font-bold">{country.country}</h3>
              </div>
              <p className="mb-1">Active cases: {country.active}</p>
              <p className="mb-1">Recovered: {country.recovered}</p>
              <p>Deaths: {country.deaths}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CovidMap;
