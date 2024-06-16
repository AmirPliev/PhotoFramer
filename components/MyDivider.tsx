import { View, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function MyDivider() {
  const textColor = useThemeColor({}, "text");
  return (
    <View
      style={{
        marginHorizontal: 16,
        borderBottomColor: textColor,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
}
