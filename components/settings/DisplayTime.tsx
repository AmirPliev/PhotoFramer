import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Select from "../Select";

import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function DisplayTime() {
  const textColor = useThemeColor({}, "text");

  return (
    <Select style={styles.menuItem}>
      <>
        <Ionicons name="time" size={24} color={textColor} />
        <ThemedText style={{ color: textColor }}>Display Time</ThemedText>
      </>
    </Select>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-end",
    padding: 16,
    width: "100%",
    paddingHorizontal: 24,
  },
});
