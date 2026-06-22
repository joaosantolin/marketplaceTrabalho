import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";

function HeaderLogo() {
  return (
    <Image
      source={require("../assets/images/icon.png")}
      style={styles.logo}
      resizeMode="contain"
    />
  );
}

function HeaderProfileButton() {
  const router = useRouter();

  return (
    <Pressable style={styles.headerButton} onPress={() => router.push("/profile")}>
      <Ionicons name="person-circle-outline" size={28} color="#1f2937" />
    </Pressable>
  );
}

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: () => <HeaderLogo />,
        headerTitleAlign: "center",
        headerRight: () => <HeaderProfileButton />,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#fff7ed" },
        contentStyle: { backgroundColor: "#f7f3ea" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "" }} />
      <Stack.Screen name="perfilScreen" options={{ title: "" }} />
      <Stack.Screen name="signup" options={{ title: "" }} />
      <Stack.Screen name="new-ad" options={{ title: "" }} />
      <Stack.Screen name="my-ads" options={{ title: "" }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 12,
    padding: 4,
  },
  logo: {
    width: 120,
    height: 34,
  },
});
