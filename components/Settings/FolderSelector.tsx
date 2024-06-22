import { ScrollView, StyleSheet } from "react-native";
import { Asset } from "expo-media-library";
import { ThemedText } from "../ThemedText";
import ConfigButton from "./ConfigButton";
import { useLocalImages } from "@/hooks/images/useLocalImages";
import Select from "../Select";
import { ThemedView } from "../ThemedView";
import { SheetButton } from "../Select";
import ImageElement from "./ImageElement";

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
          Tap an image to remove it
        </ThemedText>

        {currentImages.length === 0 ? (
          <ThemedText style={styles.noImages}>No images selected</ThemedText>
        ) : (
          <ScrollView contentContainerStyle={styles.imageContainer}>
            {currentImages.map((image: Asset) => (
              <ImageElement
                key={image.id}
                image={image}
                deleteImage={deleteImage}
              />
            ))}
          </ScrollView>
        )}
      </ThemedView>
    </Select>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  imagesTitle: {
    paddingHorizontal: 24,
    fontFamily: "JosefinBold",
    marginTop: 8,
  },

  removeMessage: {
    paddingHorizontal: 24,
    fontFamily: "JosefinItalic",
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

  noImages: {
    paddingHorizontal: 24,
    fontFamily: "Josefin",
    width: "100%",
    textAlign: "center",
    paddingVertical: 32,
  },
});
