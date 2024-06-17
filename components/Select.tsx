import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Portal } from "react-native-portalize";

import { ThemedText } from "@/components/ThemedText";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import RadioButton from "./RadioButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRef } from "react";
import { ThemedView } from "./ThemedView";

type Option = {
  label: string;
  value: number;
};

const options = [
  {
    label: "1 minute",
    value: 1,
  },
  {
    label: "5 minutes",
    value: 5,
  },
  {
    label: "10 minutes",
    value: 10,
  },
  {
    label: "15 minutes",
    value: 15,
  },
  {
    label: "30 minutes",
    value: 30,
  },
];

export default function Select({
  style = {},
  children,
}: {
  style?: any;
  children: React.ReactNode;
}) {
  const sheetRef = useRef<BottomSheetMethods>(null);
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const [currentOption, setCurrentOption] = useState<Option>(options[0]);

  return (
    <>
      <TouchableOpacity
        style={{ ...style, ...styles.menuItem }}
        onPress={() => sheetRef.current?.open()}
      >
        {children}
      </TouchableOpacity>

      <Portal>
        <BottomSheet
          ref={sheetRef}
          // containerHeight="100%"
          height="80%"
          style={{
            zIndex: 100,
            backgroundColor: backgroundColor,
            position: "absolute",
            bottom: 0,
          }}
        >
          <ThemedText style={styles.header}>
            How long should an image be shown?
          </ThemedText>

          {options.map((option) => (
            <TouchableOpacity
              style={styles.sheetItem}
              key={option.value}
              onPress={() => {
                setCurrentOption(option);
                sheetRef.current?.close();
              }}
            >
              <ThemedText>{option.label}</ThemedText>
              <RadioButton selected={currentOption.value === option.value} />
            </TouchableOpacity>
          ))}

          <ThemedView
            style={{
              flexDirection: "row",
              width: "100%",
              paddingHorizontal: 24,
              alignItems: "center",
              gap: 12,
            }}
          >
            <TextInput
              style={{
                ...styles.input,
                color: textColor,
                borderBottomColor: textColor,
              }}
              placeholder="Custom"
              placeholderTextColor={textColor}
              keyboardType="numeric"
              cursorColor={textColor}
            />

            <ThemedText>minutes</ThemedText>

            <TouchableOpacity
              onPress={() => {
                setCurrentOption({
                  label: "Custom",
                  value: 0,
                });
              }}
            >
              <RadioButton selected={currentOption.value === 0} />
            </TouchableOpacity>
          </ThemedView>
        </BottomSheet>
      </Portal>
    </>
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

  header: {
    padding: 16,
    fontSize: 16,
    fontWeight: "bold",
  },

  sheetItem: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-end",
    padding: 16,
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },

  input: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexGrow: 1,
  },
});
