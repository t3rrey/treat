import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL || "";

const convex = new ConvexReactClient(convexUrl, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ConvexProvider>
  );
}
