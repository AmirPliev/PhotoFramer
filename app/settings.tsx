import { StyleSheet } from "react-native";
import MyDivider from "@/components/MyDivider";
import { StatusBar } from "expo-status-bar";
import { Host } from "react-native-portalize";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import DisplayTime from "@/components/Settings/DisplayTime";
import FolderSelector from "@/components/Settings/FolderSelector";

type Settings = {
  displayTime: number;
};

export default function Settings() {
  return (
    <>
      <StatusBar hidden={false} style="light" />

      <Host>
        <ThemedView style={styles.container}>
          <FolderSelector />
          <DisplayTime />
        </ThemedView>
      </Host>
    </>
  );
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: "#000",
    color: "#000",
  },

  container: {
    height: "100%",
  },

  titleContainer: {
    marginTop: 16,
    paddingBottom: 8,
    fontSize: 22,
  },
});
