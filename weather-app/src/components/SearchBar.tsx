import { Pressable, Text, TextInput, View } from "react-native";

interface Props {
  city: string;
  loading: boolean;
  onChangeText: (text: string) => void;
  onSearch: () => void;
}

export default function SearchBar({
  city,
  loading,
  onChangeText,
  onSearch,
}: Props) {
  return (
    <View>
      <TextInput
        value={city}
        placeholder="Enter city name"
        onChangeText={onChangeText}
        onSubmitEditing={onSearch}
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
        }}
      />

      <Pressable
        onPress={onSearch}
        disabled={loading}
        style={{
          backgroundColor: loading ? "gray" : "black",
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
          {loading ? "Loading..." : "Get Weather"}
        </Text>
      </Pressable>
    </View>
  );
}
