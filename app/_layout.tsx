import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

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
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          headerTintColor: textColor,
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
                color={textColor}
                size={30}
                style={{ marginHorizontal: 8 }}
                onPress={() => router.back()}
              />
            ),
          }}
        />

        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
