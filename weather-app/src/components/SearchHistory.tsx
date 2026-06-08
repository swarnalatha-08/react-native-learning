import { Pressable, Text, View } from "react-native";

interface Props {
  history: string[];
  onSelect: (city: string) => void;
  onRemove: (city: string) => void;
  onClear: () => void;
}

export default function SearchHistory({
  history,
  onSelect,
  onRemove,
  onClear,
}: Props) {
  if (!history.length) return null;

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
        Recent Searches
      </Text>

      {history.map((city) => (
        <View
          key={city}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Pressable onPress={() => onSelect(city)} style={{ flex: 1 }}>
            <Text>{city}</Text>
          </Pressable>

          <Pressable onPress={() => onRemove(city)}>
            <Text style={{ color: "red" }}>✕</Text>
          </Pressable>
        </View>
      ))}

      <Pressable onPress={onClear}>
        <Text style={{ color: "red" }}>Clear History</Text>
      </Pressable>
    </View>
  );
}
