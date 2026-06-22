import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, Pressable, StyleSheet } from "react-native";

// Importando suas telas diretamente da pasta src/screens
import CadastroScreen from "../screens/cadastroScreen";
import IndexScreen from "../screens/indexScreen"; // Antigo app/index.tsx
import MeusAnunciosScreen from "../screens/meusAnunciosScreen";
import NovoAnuncioScreen from "../screens/novoAnuncioScreen";
import PerfilScreen from "../screens/perfilScreen";

const Stack = createNativeStackNavigator();

function HeaderLogo() {
  return (
    <Image
      source={require("../../assets/images/logomarket.png")} // Confirme se o caminho relativo está correto
      style={styles.logo}
      resizeMode="contain"
    />
  );
}

function HeaderProfileButton() {
  const navigation = useNavigation();

  return (
    <Pressable style={styles.headerButton} onPress={() => navigation.navigate("Perfil")}>
      <Ionicons name="person-circle-outline" size={28} color="#1f2937" />
    </Pressable>
  );
}

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => <HeaderLogo />,
        headerTitleAlign: "center",
        headerRight: () => <HeaderProfileButton />,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#fff7ed" },
        contentStyle: { backgroundColor: "#f7f3ea" },
      }}
    >
      {/* Os nomes aqui ("Home", "Perfil", etc) serão usados para a navegação */}
      <Stack.Screen name="Home" component={IndexScreen} options={{ title: "" }} />
      <Stack.Screen name="Perfil" component={PerfilScreen} options={{ title: "" }} />
      <Stack.Screen name="Signup" component={CadastroScreen} options={{ title: "" }} />
      <Stack.Screen name="NewAd" component={NovoAnuncioScreen} options={{ title: "" }} />
      <Stack.Screen name="MyAds" component={MeusAnunciosScreen} options={{ title: "" }} />
    </Stack.Navigator>
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