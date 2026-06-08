import { FlatList, Text, View } from "react-native";

interface Props {
  forecast: any[];
  loading: boolean;
  onRefresh: () => void;
}

export default function ForecastList({ forecast, loading, onRefresh }: Props) {
  return (
    <FlatList
      data={forecast.slice(0, 8)}
      keyExtractor={(item) => item.dt_txt}
      refreshing={loading}
      onRefresh={onRefresh}
      scrollEnabled={false}
      renderItem={({ item }) => {
        const date = new Date(item.dt_txt);

        return (
          <View
            style={{
              padding: 16,
              marginBottom: 12,
              backgroundColor: "#fff",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#eee",
            }}
          >
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              {date.toLocaleDateString()}
            </Text>

            <Text style={{ color: "gray", marginTop: 4 }}>
              {date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>

            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                marginTop: 8,
              }}
            >
              {Math.round(item.main.temp)}°C
            </Text>

            <Text style={{ marginTop: 4 }}>{item.weather[0].main}</Text>
          </View>
        );
      }}
    />
  );
}
