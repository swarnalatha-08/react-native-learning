import { Pressable, Text } from "react-native";

interface Props {
  onPress: () => void;
}

export default function LocationButton({ onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "#007AFF",
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
      }}
    >
      <Text
        style={{
          color: "white",
          textAlign: "center",
        }}
      >
        📍 Use My Location
      </Text>
    </Pressable>
  );
}
