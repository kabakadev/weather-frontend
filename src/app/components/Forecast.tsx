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
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <div className="grid grid-cols-3 gap-4">
        {forecast.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 transition-shadow duration-300 border rounded-lg hover:shadow-md"
          >
            <p className="mb-2 text-lg font-medium">{item.day}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
              alt="Weather icon"
              className="w-16 h-16 my-2"
            />
            <div className="flex gap-3 text-lg">
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
