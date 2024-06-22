import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { TabBarIcon } from "@/components/Navigation/TabBarIcon";
import { View } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";
import "react-native-reanimated";
import { ConfigsProvider } from "@/hooks/useConfigs";
import { LocalImagesProvider } from "@/hooks/images/useLocalImages";

import { router } from "expo-router";
import Colors from "@/constants/Colors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Josefin: require("../assets/fonts/JosefinNormal.ttf"),
    JosefinBold: require("../assets/fonts/JosefinBold.ttf"),
    JosefinItalic: require("../assets/fonts/JosefinItalic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  console.log(fontsLoaded);

  return (
    <View
      onLayout={onLayoutRootView}
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}
    >
      <ConfigsProvider>
        <LocalImagesProvider>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors.accent,
              },
              headerTintColor: Colors.lightText,
              headerTitleStyle: {
                fontFamily: "JosefinBold",
              },
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: "Frame",
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="settings"
              options={{
                title: "Settings",
                headerLeft: () => (
                  <TabBarIcon
                    name="arrow-back"
                    color={Colors.lightText}
                    size={30}
                    style={{ marginHorizontal: 8 }}
                    onPress={() => router.back()}
                  />
                ),
              }}
            />

            <Stack.Screen name="+not-found" />
          </Stack>
        </LocalImagesProvider>
      </ConfigsProvider>
    </View>
  );
}
