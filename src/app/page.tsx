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
  wind_direction?: number;
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
    <main className="min-h-screen p-6 bg-gradient-to-b from-sky-50 to-blue-100">
      <div className="container max-w-6xl mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Weather Forecast
        </h1>

        <div className="mb-6">
          <Header onSearch={handleSearch} />
        </div>

        {loading && (
          <div className="flex justify-center my-8">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        )}

        {error && (
          <div className="mb-6 alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 stroke-current shrink-0"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {weatherData && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <CurrentWeather data={weatherData} />
            </div>

            <div className="flex flex-col gap-6 md:col-span-2">
              {weatherData?.forecast && (
                <Forecast
                  forecast={weatherData.forecast}
                  unit={weatherData.unit}
                />
              )}

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white shadow-lg rounded-xl">
                  <h2 className="mb-4 text-xl font-semibold text-center">
                    Wind Status
                  </h2>
                  <div className="flex flex-col items-center">
                    <p className="mb-2 text-4xl font-bold">
                      {weatherData.wind_speed} m/s
                    </p>
                    <div className="flex items-center justify-center w-12 h-12 p-3 mt-4 bg-gray-100 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                    <p className="mt-2 text-gray-600">
                      {weatherData.wind_direction !== undefined
                        ? `${getWindDirection(weatherData.wind_direction)}`
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-white shadow-lg rounded-xl">
                  <h2 className="mb-4 text-xl font-semibold text-center">
                    Humidity
                  </h2>
                  <div className="flex flex-col items-center">
                    <p className="mb-4 text-4xl font-bold">
                      {weatherData.humidity}%
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{ width: `${weatherData.humidity}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between w-full mt-1 text-xs text-gray-500">
                      <span>0</span>
                      <span>50</span>
                      <span>100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );

  function getWindDirection(degrees: number) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(degrees / 45) % 8];
  }
}
