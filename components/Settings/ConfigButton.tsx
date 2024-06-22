import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "../ThemedView";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function ConfigButton({
  iconName,
  text,
}: {
  iconName: string;
  text: string;
}) {
  return (
    <ThemedView
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        width: "100%",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 16,
        paddingHorizontal: 20,
      }}
    >
      <Ionicons name={iconName as any} size={24} color={Colors.text} />
      <ThemedText style={{ color: Colors.text}}>{text}</ThemedText>
    </ThemedView>
  );
}
