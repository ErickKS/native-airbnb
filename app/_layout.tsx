import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();

  const [fontLoaded, fontError] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (fontLoaded) SplashScreen.hideAsync();
  }, [fontLoaded]);

  if (!fontLoaded) return null;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="(modals)/login"
        options={{
          title: "Log or sign up",
          headerTitleStyle: { fontFamily: "mon-sb" },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
          animation: "fade_from_bottom",
          presentation: "modal",
        }}
      />

      <Stack.Screen
        name="(modals)/booking"
        options={{
          title: "Log or sign up",
          headerTitleStyle: { fontFamily: "mon-sb" },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
          animation: "fade",
          presentation: "transparentModal",
        }}
      />

      <Stack.Screen name="listing/[id]" options={{ headerTitle: "" }} />
    </Stack>
  );
}
