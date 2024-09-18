import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "OpenRunde-Bold": require("../assets/fonts/OpenRunde-Bold.otf"),
    "OpenRunde-Medium": require("../assets/fonts/OpenRunde-Medium.otf"),
    "OpenRunde-Regular": require("../assets/fonts/OpenRunde-Regular.otf"),
    "OpenRunde-Semibold": require("../assets/fonts/OpenRunde-Semibold.otf"),
  });

  return (
    <GestureHandlerRootView>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
