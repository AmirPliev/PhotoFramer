import ImageFader from "@/components/ImageFader";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

const TEMP_IMAGES = [
  "https://images.unsplash.com/photo-1718042416613-43cc2d64f518?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Sun
  "https://images.unsplash.com/photo-1717765450292-18590bd7d975?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Woman
  "https://images.unsplash.com/photo-1548154030-e69e8e64177d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Mountain
];

export default function Frame() {
  function goToSettings() {
    setTimeout(() => {
      router.push("/settings");
    }, 100);
  }

  return (
    <TouchableOpacity
      style={{ width: "100%", height: "100%" }}
      onPress={goToSettings}
      activeOpacity={0.8}
    >
      <ImageFader images={TEMP_IMAGES} />
    </TouchableOpacity>
  );
}
