import { Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Asset } from "expo-media-library";
import { ThemedText } from "../ThemedText";
import ConfigButton from "./ConfigButton";
import { useLocalImages } from "@/hooks/images/useLocalImages";
import Select from "../Select";
import { ThemedView } from "../ThemedView";
import { SheetButton } from "../Select";

const ImagePickerComponent = () => {
  const { currentImages, pickImage, deleteImage } = useLocalImages();

  return (
    <Select
      title="Select your images"
      button={<ConfigButton iconName="images" text="Edit Images" />}
    >
      <ThemedView
        style={{
          maxHeight: "75%",
        }}
      >
        <SheetButton text="Add new" iconName="add-circle" onPress={pickImage} />

        <ThemedText style={styles.imagesTitle}>Images</ThemedText>

        <ThemedText style={styles.removeMessage}>
          Touch an image to remove it
        </ThemedText>

        <ScrollView contentContainerStyle={styles.imageContainer}>
          {currentImages.map((image: Asset) => (
            <TouchableOpacity
              style={styles.imageButton}
              key={image.id}
              onPress={() => deleteImage(image)}
            >
              <Image source={{ uri: image.uri }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>
    </Select>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  imagesTitle: {
    paddingHorizontal: 24,
    fontWeight: "bold",
    marginTop: 8,
  },

  removeMessage: {
    paddingHorizontal: 24,
    fontStyle: "italic",
  },

  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: "flex-start",
  },

  imageButton: {
    padding: 2,
    width: "33%",
    aspectRatio: 1,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
