"use client";
import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";
import { useState } from "react";

interface WeatherData {
  icon: string;
  temperature: number;
  description: string;
  location: string;
  date: string;
}
export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleSearch = async (city: string, unit: "C" | "F") => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/weather?city=${city}&unit=${unit}`
      );
      const data = await response.json();
      setWeatherData({
        icon: data.icon,
        temperature: data.temperature,
        description: data.description,
        location: data.city,
        date: new Date().toLocaleDateString("en-US", {
          weekday: "long",
        }),
      });
    } catch (error) {
      console.error("Failed to fetch weather:", error);
    }
  };
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <Header onSearch={handleSearch} />
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left panel - Current Weather */}
        <div className="w-full md:w-1/3">
          <CurrentWeather />
        </div>
        {/*Right panel - other components will be here */}
        <div className="w-full md:w-2/3">
          {/* info about forecast and stats */}
        </div>
      </div>
    </main>
  );
}
