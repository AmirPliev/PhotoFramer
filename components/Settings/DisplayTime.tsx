import Select from "../Select";
import Colors from "@/constants/Colors";
import { useEffect, useState } from "react";
import ConfigButton from "./ConfigButton";
import { useConfigs } from "@/hooks/useConfigs";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import RadioButton from "../RadioButton";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "@/components/ThemedText";

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

export default function DisplayTime() {
  const [currentOption, setCurrentOption] = useState<Option>(options[0]);
  const { data, setData } = useConfigs();

  useEffect(() => {
    const findOption = options.find(
      (option) => option.value === data.displayTime,
    );
    if (findOption) {
      setCurrentOption(findOption);
    } else {
      setCurrentOption({
        label: "Custom",
        value: data.displayTime,
      });
    }
  }, [data]);

  function saveDisplayTime(option: Option) {
    setData({
      ...data,
      displayTime: option.value,
    });

    setCurrentOption(option);
  }

  return (
    <Select
      title="How long should an image be shown?"
      style={styles.menuItem}
      button={<ConfigButton iconName="time" text="Display Time" />}
    >
      {options.map((option) => (
        <TouchableOpacity
          style={styles.sheetItem}
          key={option.value}
          onPress={() => {
            saveDisplayTime(option);
          }}
        >
          <ThemedText>{option.label}</ThemedText>
          <RadioButton selected={currentOption.value === option.value} />
        </TouchableOpacity>
      ))}

      <ThemedView style={styles.customEntry}>
        <TextInput
          style={{
            ...styles.input,
            color: Colors.text,
            borderBottomColor: Colors.text,
          }}
          placeholder="Custom"
          placeholderTextColor={Colors.text}
          keyboardType="numeric"
          cursorColor={Colors.text}
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
    </Select>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-end",
    width: "100%",
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

  customEntry: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 24,
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
});
