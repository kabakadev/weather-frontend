import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <Header />
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
