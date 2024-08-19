import React from "react";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CountryData, useGetAllCountries } from "../hooks/covidCountries";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const CovidMap: React.FC = () => {
  const { data, isLoading, error } = useGetAllCountries();

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
          icon={DefaultIcon}
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
