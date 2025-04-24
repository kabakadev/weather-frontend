"use client";

import { useState, useEffect, KeyboardEvent } from "react";

export default function Header({
  onSearch,
}: {
  onSearch: (city: string, unit: "C" | "F") => void;
}) {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState<"C" | "F">(() => {
    // Initialize from localStorage if available
    if (typeof window !== "undefined") {
      const savedUnit = localStorage.getItem("weatherUnit");
      return savedUnit === "F" ? "F" : "C";
    }
    return "C";
  });

  // Persist unit preference to localStorage
  useEffect(() => {
    localStorage.setItem("weatherUnit", unit);
  }, [unit]);

  const handleUnitChange = () => {
    const newUnit = unit === "C" ? "F" : "C";
    setUnit(newUnit);
    if (city.trim()) {
      onSearch(city, newUnit);
    }
  };

  const handleSearch = () => {
    const trimmedCity = city.trim();
    if (trimmedCity) {
      onSearch(trimmedCity, unit);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col flex-wrap items-center justify-between gap-4 p-4 bg-white shadow-md md:flex-row rounded-xl">
      {/* Search input with Enter key support */}
      <input
        type="text"
        placeholder="Search city..."
        className="w-full input input-bordered md:w-1/2"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Search for a city"
      />

      {/* Go Button */}
      <button
        onClick={handleSearch}
        className="w-full btn btn-primary md:w-auto"
        aria-label="Search weather"
      >
        Go
      </button>

      {/* Unit toggle with better accessibility */}
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
