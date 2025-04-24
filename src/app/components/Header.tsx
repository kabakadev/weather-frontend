"use client";
import { useState, useEffect, KeyboardEvent } from "react";

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

  // Fetch suggestions when city input changes
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

  // Persist unit preference
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
    <div className="relative flex flex-col flex-wrap items-center justify-between gap-4 p-4 bg-white shadow-md md:flex-row rounded-xl">
      {/* Search input with suggestions dropdown */}
      <div className="relative w-full md:w-1/2">
        <input
          type="text"
          placeholder="Search city..."
          className="w-full input input-bordered"
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
                className="p-2 cursor-pointer hover:bg-gray-100"
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

      {/* Go Button - unchanged from your version */}
      <button
        onClick={() => handleSearch()}
        className="w-full btn btn-primary md:w-auto"
        aria-label="Search weather"
      >
        Go
      </button>

      {/* Unit toggle - unchanged from your version */}
      <div className="flex items-center gap-2">
        <span
          className={unit === "C" ? "font-bold" : "text-gray-500"}
          aria-hidden="true"
        >
          °C
        </span>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={unit === "F"}
            onChange={handleUnitChange}
            aria-label="Toggle between Celsius and Fahrenheit"
          />
        </label>
        <span
          className={unit === "F" ? "font-bold" : "text-gray-500"}
          aria-hidden="true"
        >
          °F
        </span>
      </div>
    </div>
  );
}
