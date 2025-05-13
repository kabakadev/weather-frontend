"use client";
import type { FC } from "react";

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
  if (!data) {
    return (
      <div className="flex items-center justify-center h-64 bg-white shadow-lg rounded-xl">
        <p className="text-lg text-gray-500">
          Search for a city to see the weather 🌍
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-full p-8 bg-white shadow-lg rounded-xl">
      {/* Weather icon from OpenWeatherMap */}
      <div className="mb-4">
        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@4x.png`}
          alt={data.description}
          className="w-32 h-32"
        />
      </div>

      {/* Temperature */}
      <div className="mb-2 text-6xl font-bold">
        {data.temperature}°{data.unit}
      </div>

      {/* Description */}
      <div className="mb-6 text-2xl font-semibold text-gray-700 capitalize">
        {data.description}
      </div>

      {/* Date & Location */}
      <div className="mt-auto text-center text-gray-600">
        <p className="text-lg font-medium">{data.date}</p>
        <p className="text-xl font-semibold">{data.city}</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
