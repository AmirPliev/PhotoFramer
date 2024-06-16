import { View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function RadioButton({
  style = {},
  selected,
}: {
  style?: any;
  selected: boolean;
}) {
  const textColor = useThemeColor({}, "text");
  return (
    <View
      style={[
        {
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: textColor,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      {selected ? (
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: textColor,
          }}
        />
      ) : null}
    </View>
  );
}
