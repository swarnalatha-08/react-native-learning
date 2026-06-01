import { Pressable, Text, View } from "react-native";

type Props = {
  filter: "all" | "active" | "completed";
  setFilter: (value: any) => void;
};

export default function TodoFilters({ filter, setFilter }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
      }}
    >
      {["all", "active", "completed"].map((type) => (
        <Pressable
          key={type}
          onPress={() => setFilter(type)}
          style={{
            padding: 8,
            borderBottomWidth: filter === type ? 2 : 0,
          }}
        >
          <Text
            style={{
              fontWeight: filter === type ? "bold" : "normal",
              textTransform: "capitalize",
            }}
          >
            {type}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
