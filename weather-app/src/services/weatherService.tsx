import axios from "axios";
import { BASE_URL, WEATHER_API_KEY } from "../constants/config";

export const fetchWeatherData = async (city: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const fetchWeatherByCoords = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`,
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching weather by coords:", error);
    throw error;
  }
};

export const fetchForecastData = async (city: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`,
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching forecast:", error);
    throw error;
  }
};
