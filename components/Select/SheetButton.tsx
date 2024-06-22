import { TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "../ThemedText";
import Colors from "@/constants/Colors";

export default function SheetButton({
  text,
  iconName,
  onPress,
}: {
  text: string;
  iconName: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 24,
        borderColor: Colors.text,
        backgroundColor: Colors.accent,

        gap: 8,
        borderWidth: StyleSheet.hairlineWidth,
        marginHorizontal: 24,
        marginVertical: 2,
        borderRadius: 8,
        padding: 12,
      }}
      onPress={onPress}
    >
      <Ionicons name={iconName as any} size={24} color={Colors.lightText} />
      <ThemedText style={{ color: Colors.lightText }}>{text}</ThemedText>
    </TouchableOpacity>
  );
}
