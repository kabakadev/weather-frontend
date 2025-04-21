import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">
        Welcome to the Weather App
      </h1>
      <button className="btn btn-primary">RippleUi button</button>
    </main>
  );
}
