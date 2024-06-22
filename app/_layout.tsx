import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { TabBarIcon } from "@/components/Navigation/TabBarIcon";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { ConfigsProvider } from "@/hooks/useConfigs";
import { LocalImagesProvider } from "@/hooks/images/useLocalImages";

import { router } from "expo-router";
import Colors from "@/constants/Colors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ConfigsProvider>
      <LocalImagesProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.accent,
            },
            headerTintColor: Colors.lightText,
            headerTitleStyle: {
              fontWeight: "bold",
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
  );
}
