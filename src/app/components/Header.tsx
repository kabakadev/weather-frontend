"use client";
import { useState, useEffect, type KeyboardEvent } from "react";

export default function Header({
  onSearch,
}: {
  onSearch: (city: string, unit: "C" | "F") => void;
}) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [unit, setUnit] = useState<"C" | "F">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("weatherUnit") as "C" | "F") || "C";
    }
    return "C";
  });

  useEffect(() => {
    if (city.length > 2) {
      const timer = setTimeout(() => {
        fetchCitySuggestions(city);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [city]);

  useEffect(() => {
    localStorage.setItem("weatherUnit", unit);
  }, [unit]);

  const fetchCitySuggestions = async (query: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/city-suggestions?q=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleUnitChange = () => {
    const newUnit = unit === "C" ? "F" : "C";
    setUnit(newUnit);
    if (city.trim()) {
      onSearch(city, newUnit);
    }
  };

  const handleSearch = (selectedCity?: string) => {
    const cityToSearch = selectedCity || city.trim();
    if (cityToSearch) {
      onSearch(cityToSearch, unit);
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center justify-between gap-4 p-5 bg-white shadow-lg md:flex-row rounded-xl">
      <div className="relative w-full md:w-2/3">
        <input
          type="text"
          placeholder="Search city..."
          className="w-full border-2 input input-ghost-secondary focus:border-blue-500"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Search for a city"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-3 transition-colors duration-200 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setCity(suggestion);
                  handleSearch(suggestion);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center w-full gap-4 md:w-auto">
        <button
          onClick={() => handleSearch()}
          className="w-full px-6 btn btn-primary md:w-auto"
          aria-label="Search weather"
        >
          GO
        </button>

        <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
          <span
            className={`text-lg transition-colors duration-200 ${
              unit === "C" ? "text-blue-500 font-bold" : "text-gray-500"
            }`}
            aria-hidden="true"
          >
            °C
          </span>
          <label className="flex items-center mx-1 cursor-pointer">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={unit === "F"}
              onChange={handleUnitChange}
              aria-label="Toggle between Celsius and Fahrenheit"
            />
          </label>
          <span
            className={`text-lg transition-colors duration-200 ${
              unit === "F" ? "text-blue-500 font-bold" : "text-gray-500"
            }`}
            aria-hidden="true"
          >
            °F
          </span>
        </div>
      </div>
    </div>
  );
}
