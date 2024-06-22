import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Asset } from "expo-media-library";
import { ThemedView } from "../ThemedView";

export default function ImageElement({
  image,
  deleteImage,
}: {
  image: Asset;
  deleteImage: (image: Asset) => void;
}) {
  return (
    <ThemedView style={styles.imageButton}>
      <Image source={{ uri: image.uri }} style={styles.image} />

      <TouchableOpacity
        style={styles.overlay}
        onPress={() => deleteImage(image)}
      >
        <Ionicons name="close" size={24} color="rgba(255, 254, 255, 0.8)" />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },

  imageButton: {
    position: "relative",
    padding: 2,
    width: "33%",
    aspectRatio: 1,
  },

  overlay: {
    position: "absolute",
    top: 2,
    left: 2,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 254, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
});
