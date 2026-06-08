# Weather App 🌦️

A React Native weather application built with Expo and TypeScript that allows users to search weather conditions by city, view forecasts, use their current location, and save recent searches.

## Features

- 🔍 Search weather by city name
- 📍 Get weather using current device location
- 🌡️ View current temperature and weather conditions
- 📅 5-day weather forecast
- 🕒 Recent search history
- 💾 Persist last searched city using AsyncStorage
- 🔄 Pull to refresh weather data
- 📱 Built with React Native and Expo
- 📝 TypeScript support

## Screenshots

Add screenshots of your app here.

## Tech Stack

- React Native
- Expo
- TypeScript
- Axios
- Expo Location
- AsyncStorage
- OpenWeather API

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd weather-app
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npx expo start
```

## Environment Setup

Create a configuration file and add your OpenWeather API key:

```ts
export const WEATHER_API_KEY = "YOUR_API_KEY";
```

Get a free API key from OpenWeather.

## Project Structure

```text
src/
├── app/
│   └── index.tsx
├── components/
│   ├── ForecastList.tsx
│   ├── LocationButton.tsx
│   ├── SearchBar.tsx
│   ├── SearchHistory.tsx
│   └── WeatherCard.tsx
├── services/
│   └── weatherService.ts
├── constants/
│   └── config.ts
└── utils/
    └── helpers.ts
```

## Learning Outcomes

This project helped practice:

- React Native fundamentals
- Component-based architecture
- API integration with Axios
- AsyncStorage persistence
- Location services
- State management with React Hooks
- TypeScript in React Native
- Error handling and loading states

## Future Improvements

- Dark mode support
- Weather icons from API
- Hourly forecast
- Weather maps
- Better UI animations
- Unit conversion (°C / °F)

## Author

Swarna Latha
