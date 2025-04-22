"use client";
import { FC } from "react";

import { useEffect, useState } from "react";

type WeatherData = {
  icon: string;
  temperature: number;
  description: string;
  city: string;
  date: string;
  humidity: number;
  windspeed: number;
  unit: string;
};
type Props = {
  data: WeatherData | null;
};
const CurrentWeather: FC<Props> = ({ data }) => {
  if (!data) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-md">
        <p className="text-gray-500">Search for a city to see the weather 🌍</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 gap-3 bg-white rounded-xl shadow-md">
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
      <div className="text-sm text-gray-500 text-center">
        <p>{data.date}</p>
        <p>{data.city}</p>
      </div>

      {/* Extra info */}
      <div className="flex gap-6 text-sm text-gray-600 mt-2">
        <p>💧 {data.humidity}%</p>
        <p>💨 {data.windspeed} m/s</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
