"use client";

type ForecastItem = {
  day: string;
  icon: string;
  high: number;
  low: number;
};

type ForecastProps = {
  forecast: ForecastItem[];
  unit: string;
};

const Forecast = ({ forecast, unit }: ForecastProps) => {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <h2 className="mb-4 text-xl font-semibold">3-Day Forecast</h2>
      <div className="grid grid-cols-3 gap-4">
        {forecast.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <p className="font-medium">{item.day}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
              alt="Weather icon"
              className="w-12 h-12"
            />
            <div className="flex gap-2">
              <span className="font-bold">{item.high}°</span>
              <span className="text-gray-500">{item.low}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
