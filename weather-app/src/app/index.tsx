import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text } from "react-native";
import ForecastList from "../components/ForecastList";
import LocationButton from "../components/LocationButton";
import SearchBar from "../components/SearchBar";
import SearchHistory from "../components/SearchHistory";
import WeatherCard from "../components/WeatherCard";
import {
  fetchForecastData,
  fetchWeatherByCoords,
  fetchWeatherData,
} from "../services/weatherService";

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<null | any>(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [forecast, setForecast] = useState<any[]>([]);

  useEffect(() => {
    loadLastCity();
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await AsyncStorage.getItem("searchHistory");

    if (data) {
      setHistory(JSON.parse(data));
    }
  };
  const loadLastCity = async () => {
    try {
      const savedCity = await AsyncStorage.getItem("lastCity");

      if (savedCity) {
        setCity(savedCity);
        // optional: auto fetch weather
        fetchWeatherData(savedCity).then(setWeather);
      }
    } catch (error) {
      console.log("Error loading last city", error);
    }
  };

  const saveSearchHistory = async (cityName: string) => {
    try {
      const existing = await AsyncStorage.getItem("searchHistory");
      const cities: string[] = existing ? JSON.parse(existing) : [];
      const updated = [
        cityName,
        ...cities.filter((c) => c.toLowerCase() !== cityName.toLowerCase()),
      ].slice(0, 5); // keep last 5 unique

      await AsyncStorage.setItem("searchHistory", JSON.stringify(updated));

      setHistory(updated);
    } catch (error) {
      console.log("Error saving search history", error);
    }
  };

  const fetchWeather = async () => {
    if (!city.trim()) {
      alert("Please enter a city name");
      return;
    }

    await getWeatherByCity(city);
    await saveSearchHistory(city);
  };

  const getWeatherByCity = async (cityName: string) => {
    try {
      setLoading(true);
      setError("");

      const weatherData = await fetchWeatherData(cityName);
      const forecastData = await fetchForecastData(cityName);

      setWeather(weatherData);
      setForecast(forecastData.list);
      setCity(cityName);

      await AsyncStorage.setItem("lastCity", cityName);
    } catch (error: any) {
      setWeather(null);
      setForecast([]);
      setError(error?.response?.data?.message || "Error fetching weather");
    } finally {
      setLoading(false);
    }
  };

  const removeHistoryItem = async (cityName: string) => {
    const updatedHistory = history.filter((item) => item !== cityName);

    setHistory(updatedHistory);

    await AsyncStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const clearHistory = async () => {
    setHistory([]);
    await AsyncStorage.removeItem("searchHistory");
  };

  const getCurrentLocationWeather = async () => {
    try {
      setLoading(true);
      setError("");

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setError("Location permission denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      const data = await fetchWeatherByCoords(
        location.coords.latitude,
        location.coords.longitude,
      );

      setWeather(data);
      setCity(data.name);
    } catch (error) {
      console.log("Location Weather Error:", error);
      setError("Unable to fetch location weather");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 40,
      }}
    >
      <SearchBar
        city={city}
        loading={loading}
        onChangeText={(text) => setCity(text.trimStart())}
        onSearch={fetchWeather}
      />
      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
      <WeatherCard weather={weather} />

      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        Forecast
      </Text>

      <ForecastList
        forecast={forecast}
        loading={loading}
        onRefresh={() => getWeatherByCity(city)}
      />

      <SearchHistory
        history={history}
        onSelect={getWeatherByCity}
        onRemove={removeHistoryItem}
        onClear={clearHistory}
      />

      <LocationButton onPress={getCurrentLocationWeather} />
      {!!error && (
        <Text
          style={{
            color: "red",
            marginTop: 20,
          }}
        >
          {error}
        </Text>
      )}
    </ScrollView>
  );
}
