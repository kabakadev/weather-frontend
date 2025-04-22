"use client";

import { useState } from "react";

export default function Header({
  onSearch,
}: {
  onSearch: (city: string, unit: "C" | "F") => void;
}) {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState<"C" | "F">("C");

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city, unit);
    }
  };

  return (
    <div className="flex flex-col md:flex-row flex-wrap items-center justify-between gap-4 p-4 bg-white shadow-md rounded-xl">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search city..."
        className="input input-bordered w-full md:w-1/2"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      {/* Go Button */}
      <button
        onClick={handleSearch}
        className="btn btn-primary w-full md:w-auto"
      >
        Go
      </button>

      {/* Unit toggle */}
      <div className="flex items-center gap-2">
        <span className={unit === "C" ? "font-bold" : "text-gray-500"}>°C</span>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={unit === "F"}
          onChange={() => setUnit(unit === "C" ? "F" : "C")}
        />
        <span className={unit === "F" ? "font-bold" : "text-gray-500"}>°F</span>
      </div>
    </div>
  );
}
