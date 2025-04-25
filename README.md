# 🌦️ Weather Forecast Frontend

A responsive weather forecasting web app built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Ripple UI**, consuming a Laravel backend API to display real-time weather conditions.

---

## 🚀 Features

- 🌍 Search weather by city name
- 🌡️ Toggle between Celsius and Fahrenheit
- ⛅ Displays:
  - Current temperature
  - Weather description and icon
  - Humidity and wind speed
  - Location and current date
- ~~🔮 Placeholder for 3-day forecast~~ ➡️ Real-time 3-day forecast

- 💅 Fully responsive, clean UI with Ripple UI (Tailwind-based component kit)

---

## 🧱 Tech Stack

| Layer           | Technology                                    |
| --------------- | --------------------------------------------- |
| Framework       | [Next.js (App Router)](https://nextjs.org/)   |
| Language        | [TypeScript](https://www.typescriptlang.org/) |
| Styling         | [Tailwind CSS](https://tailwindcss.com/)      |
| UI Kit          | [Ripple UI](https://ripple-ui.com/)           |
| Runtime         | [Node.js](https://nodejs.org/) (`v20.x`)      |
| Package Manager | `npm` or `pnpm`                               |

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/weather-app-frontend.git
cd weather-app-frontend

# Install dependencies
npm install
# or
pnpm install
```

---

## 🛠️ Development

```bash
npm run dev
# or
pnpm dev
```

Then visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🌐 Backend API Dependency

This app expects a Laravel backend running at:

```
GET http://localhost:8000/api/weather?city=Nairobi&unit=C
```

Expected API Response:

```json
{
  "city": "Nairobi",
  "temperature": 23,
  "unit": "C",
  "description": "Clear sky",
  "icon": "01d",
  "humidity": 70,
  "wind_speed": 4.2,
  "forecast": []
}
```

You can find the backend project [here](https://github.com/kabakadev/flashlearn-backends)

---

## 📁 Project Structure

```
📆 app/
 ├ 📋 page.tsx         # Main page
 └ 📂 components/
     ├ 📋 Header.tsx   # City search and unit toggle
     └ 📋 CurrentWeather.tsx # Displays current weather
```

---

## 📌 Todo

- [ ] Improve error handling (e.g., invalid cities)
- [ ] Add loading and fallback UI
- [ ] Deployment to Netlify

---

## 📄 License

MIT — feel free to use and modify.

---

## 💬 Author

Built with 💙 by Ian

> “Always building, always learning.”
