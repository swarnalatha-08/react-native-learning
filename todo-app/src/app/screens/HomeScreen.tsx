import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import TodoFilters from "../components/TodoFilter";
import TodoItem from "../components/TodoItem";
import { getTodos, saveTodos } from "../services/todoStorage";
import { Todo } from "../types/todo";

export default function HomeScreen() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const update = (newTodos: Todo[]) => {
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const addOrUpdate = () => {
    if (!text.trim()) return;

    if (editIndex !== null) {
      const copy = [...todos];
      copy[editIndex].text = text;
      update(copy);
      setEditIndex(null);
    } else {
      update([...todos, { text, completed: false }]);
    }

    setText("");
  };

  const toggle = (index: number) => {
    const copy = [...todos];
    copy[index].completed = !copy[index].completed;
    update(copy);
  };

  const remove = (index: number) => {
    update(todos.filter((_, i) => i !== index));
  };

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Enter todo"
        style={{ borderWidth: 1, padding: 10 }}
      />

      <Pressable
        onPress={addOrUpdate}
        style={{ backgroundColor: "black", padding: 10, marginVertical: 10 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Add Todo</Text>
      </Pressable>

      <TodoFilters filter={filter} setFilter={setFilter} />

      <FlatList
        data={filtered}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <TodoItem
            item={item}
            index={index}
            onToggle={toggle}
            onEdit={(i) => {
              setEditIndex(i);
              setText(todos[i].text);
            }}
            onDelete={remove}
          />
        )}
      />
    </View>
  );
}
