"use client";
import { FC } from "react";

type ForecastItem = {
  day: string;
  icon: string;
  high: number;
  low: number;
};

type WeatherData = {
  icon: string;
  temperature: number;
  description: string;
  city: string;
  date: string;
  humidity: number;
  wind_speed: number;
  wind_direction?: number;
  unit: string;
  forecast: ForecastItem[];
};
type Props = {
  data: WeatherData | null;
};
const CurrentWeather: FC<Props> = ({ data }) => {
  const getWindDirection = (degrees?: number) => {
    if (degrees === undefined) return "N/A";
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(degrees / 45) % 8];
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64 bg-white shadow-md rounded-xl">
        <p className="text-gray-500">Search for a city to see the weather 🌍</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 p-6 bg-white shadow-md rounded-xl">
      {/* Weather icon from OpenWeatherMap */}
      <img
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt={data.description}
        className="w-20 h-20"
      />

      {/* Temperature */}
      <div className="text-4xl font-bold">
        {data.temperature}°{data.unit}
      </div>

      {/* Description */}
      <div className="text-xl font-semibold text-gray-700 capitalize">
        {data.description}
      </div>

      {/* Date & Location */}
      <div className="text-sm text-center text-gray-500">
        <p>{data.date}</p>
        <p>{data.city}</p>
      </div>

      {/* Extra info */}
      <div className="flex gap-6 mt-2 text-sm text-gray-600">
        <p>💧 {data.humidity}%</p>
        <p>
          💨 {data.wind_speed} m/s {getWindDirection(data.wind_direction)}{" "}
        </p>
      </div>
    </div>
  );
};

export default CurrentWeather;
