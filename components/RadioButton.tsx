import { View } from "react-native";
import Colors from "@/constants/Colors";

export default function RadioButton({
  style = {},
  selected,
}: {
  style?: any;
  selected: boolean;
}) {
  return (
    <View
      style={[
        {
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: Colors.text,
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
            backgroundColor: Colors.text,
          }}
        />
      ) : null}
    </View>
  );
}
