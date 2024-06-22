import ImageFader from "@/components/ImageFader";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { Asset } from "expo-media-library";
import { router } from "expo-router";
import { useLocalImages } from "@/hooks/images/useLocalImages";
import { StatusBar } from "expo-status-bar";
import { useConfigs } from "@/hooks/useConfigs";

const TEMP_IMAGES = [
  "https://images.unsplash.com/photo-1718042416613-43cc2d64f518?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Sun
  "https://images.unsplash.com/photo-1717765450292-18590bd7d975?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Woman
  "https://images.unsplash.com/photo-1548154030-e69e8e64177d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Mountain
];

export default function Frame() {
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const { currentImages } = useLocalImages();
  const { data } = useConfigs();

  useEffect(() => {
    const images = currentImages.map((image: Asset) => image.uri);
    setImageFiles(images);
  }, [currentImages]);

  function goToSettings() {
    setTimeout(() => {
      router.push("/settings");
    }, 100);
  }

  return (
    <>
      <StatusBar hidden={true} />

      <TouchableOpacity
        style={{ width: "100%", height: "100%" }}
        onPress={goToSettings}
        activeOpacity={0.8}
      >
        <ImageFader
          images={imageFiles.length ? imageFiles : TEMP_IMAGES}
          switchTime={data.displayTime}
        />
      </TouchableOpacity>
    </>
  );
}
