export const getWeatherIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "clear":
      return "☀️";
    case "clouds":
      return "☁️";
    case "rain":
      return "🌧️";
    case "thunderstorm":
      return "⛈️";
    case "snow":
      return "❄️";
    case "mist":
    case "haze":
    case "fog":
      return "🌫️";
    default:
      return "🌤️";
  }
};
