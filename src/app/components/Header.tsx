"use client";

import { useState } from "react";
export default function Header() {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState<"C" | "F">("C");

  const handleSearch = () => {
    console.log(`Searching weather for ${city} in ${unit}`);
  };
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white shadow-md rounded-xl">
      {/* Search input*/}
      <input
        type="text"
        placeholder="Search city..."
        className="input input-bordered w-full sm:w-1/2"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {/* Go Button */}
      <button onClick={handleSearch} className="btn btn-primary">
        Go
      </button>

      {/*Unit toggle */}
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
