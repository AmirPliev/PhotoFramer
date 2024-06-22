import ImageFader from "@/components/ImageFader";
import { useEffect } from "react";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { Asset } from "expo-media-library";
import { router } from "expo-router";
import { useLocalImages } from "@/hooks/images/useLocalImages";
import { StatusBar, setStatusBarHidden } from "expo-status-bar";
import { useConfigs } from "@/hooks/useConfigs";
import { ThemedText } from "@/components/ThemedText";

export default function Frame() {
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const { currentImages } = useLocalImages();
  const { data } = useConfigs();

  useEffect(() => {
    const images = currentImages.map((image: Asset) => image.uri);
    setImageFiles(images);
  }, [currentImages]);

  function goToSettings() {
    setStatusBarHidden(false);
    setTimeout(() => {
      router.push("/settings");
    }, 100);
  }

  if (imageFiles.length < 1) {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "#F2F3ED",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
        onPress={goToSettings}
        activeOpacity={0.8}
      >
        <StatusBar hidden={false} style="dark" />
        <Image
          source={require("../assets/images/no-images.jpeg")}
          style={{
            width: "80%",
            height: "30%",
          }}
          contentFit="contain"
        />
        <ThemedText style={{ fontFamily: "JosefinBold" }}>
          No images found
        </ThemedText>
        <ThemedText style={{ marginTop: 30 }}>
          Press anywhere to go to settings and select images to showcase!
        </ThemedText>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <StatusBar hidden />

      <TouchableOpacity
        style={{ width: "100%", height: "100%" }}
        onPress={goToSettings}
        activeOpacity={0.8}
      >
        <ImageFader images={imageFiles} switchTime={data.displayTime} />
      </TouchableOpacity>
    </>
  );
}
