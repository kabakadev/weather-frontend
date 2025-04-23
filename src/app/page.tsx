"use client";
import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import { useState } from "react";
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
  unit: string;
  forecast: ForecastItem[];
};

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string, unit: "C" | "F") => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:8000/api/weather?city=${city}&unit=${
          unit === "C" ? "metric" : "imperial"
        }`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      setWeatherData({
        ...data,
        date: new Date().toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch weather"
      );
      console.error("Failed to fetch weather:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <Header onSearch={handleSearch} />

      {loading && (
        <div className="flex justify-center my-8">
          <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full space-y-6 md:w-1/3">
          <CurrentWeather data={weatherData} />
        </div>

        <div className="w-full space-y-6 md:w-2/3">
          {weatherData?.forecast && (
            <Forecast forecast={weatherData.forecast} unit={weatherData.unit} />
          )}

          {/* Additional weather stats can go here */}
          {weatherData && (
            <div className="p-6 bg-white shadow-md rounded-xl">
              <h2 className="mb-4 text-xl font-semibold">Weather Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Humidity</p>
                  <p className="text-2xl font-bold">{weatherData.humidity}%</p>
                </div>
                <div>
                  <p className="text-gray-500">Wind Speed</p>
                  <p className="text-2xl font-bold">
                    {weatherData.wind_speed} m/s
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
