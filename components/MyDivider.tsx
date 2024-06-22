import { View, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function MyDivider() {
  const textColor = useThemeColor({}, "text");
  return (
    <View
      style={{
        zIndex: 1,
        // marginHorizontal: 16,
        borderBottomColor: textColor,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
}
