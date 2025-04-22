"use client";

import { useEffect, useState } from "react";

type WeatherData = {
  icon: string;
  temperature: number;
  description: string;
  location: string;
  date: string;
};

export default function CurrentWeather() {
  const [data, setData] = useState<WeatherData>({
    icon: "☀️",
    temperature: 13,
    description: "Sunny",
    location: "Nairobi",
    date: "22nd May 2025",
  });
  useEffect(() => {}, []); // when the component first mounts, the weather data will be fetched
  return (
    <div className="flex flex-col items-center p-6 gap-3 bg-white rounded-xl shadowmd">
      {/* Weather icon */}
      <div className="text-6xl">
        {/*display data.icon if it exists*/}weather
      </div>

      {/*Temperature*/}
      <div className="text-4xl font-bold">
        {/*display temperature in degrees*/}temperature
      </div>

      {/*Description */}
      <div className="text-xl font-semibold text-gray-700">
        {/* display the description */} description
      </div>

      {/*Date & Location */}
      <div className="text-sm text-gray-500 text-center">
        <p>{/*date */} date</p>
        <p>{/*location */} location</p>
      </div>
    </div>
  );
}
