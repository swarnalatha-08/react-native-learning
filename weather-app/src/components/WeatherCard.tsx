import { Text, View } from "react-native";
import { getWeatherIcon } from "../utils/helpers";

interface Props {
  weather: any;
}

export default function WeatherCard({ weather }: Props) {
  if (!weather?.weather?.length) return null;

  return (
    <View
      style={{
        marginTop: 20,
        padding: 20,
        borderRadius: 12,
        backgroundColor: "#f2f2f2",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "600" }}>
        {weather.name}, {weather.sys.country}
      </Text>

      <Text style={{ fontSize: 50, marginVertical: 10 }}>
        {getWeatherIcon(weather.weather[0].main)}
      </Text>

      <Text style={{ fontSize: 40, fontWeight: "bold" }}>
        {Math.round(weather.main.temp)}°C
      </Text>

      <Text style={{ fontSize: 18, marginTop: 5 }}>
        {weather.weather[0].main}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <View style={{ marginRight: 25 }}>
          <Text>💧 Humidity</Text>
          <Text>{weather.main.humidity}%</Text>
        </View>

        <View>
          <Text>💨 Wind</Text>
          <Text>{weather.wind.speed} m/s</Text>
        </View>
      </View>
    </View>
  );
}
