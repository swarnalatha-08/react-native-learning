import { Pressable, Text, View } from "react-native";
import { Todo } from "../types/todo";

type Props = {
  item: Todo;
  index: number;
  onToggle: (index: number) => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

export default function TodoItem({
  item,
  onToggle,
  onEdit,
  onDelete,
  index,
}: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#eee",
      }}
    >
      <Pressable
        onPress={() => onToggle(index)}
        style={{
          width: 22,
          height: 22,
          borderWidth: 2,
          borderColor: "black",
          marginRight: 10,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: item.completed ? "black" : "white",
        }}
      >
        {item.completed && <Text style={{ color: "white" }}>✓</Text>}
      </Pressable>

      <Text style={{ flex: 1 }}>{item.text}</Text>

      <Pressable onPress={() => onEdit(index)}>
        <Text style={{ color: "blue", marginRight: 10 }}>Edit</Text>
      </Pressable>

      <Pressable onPress={() => onDelete(index)}>
        <Text style={{ color: "red" }}>Delete</Text>
      </Pressable>
    </View>
  );
}
