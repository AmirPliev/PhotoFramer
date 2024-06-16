import { StyleSheet } from "react-native";
import MyDivider from "@/components/MyDivider";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import DisplayTime from "@/components/settings/DisplayTime";
import FolderSelector from "@/components/settings/FolderSelector";

type Settings = {
  displayTime: number;
};

export default function Settings() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.titleContainer}>Slide Show</ThemedText>

      <MyDivider />

      <DisplayTime />

      <ThemedText style={styles.titleContainer}>Source Folder</ThemedText>
      <MyDivider />
      <FolderSelector />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: "#000",
    color: "#000",
  },
  container: {
    flex: 1,
    height: "100%",
  },
  titleContainer: {
    padding: 16,
    paddingBottom: 8,
    fontSize: 22,
  },
});
