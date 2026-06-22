import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { useAuthUser } from "../hooks/useAuthUser";
import { login, logout } from "../services/AuthService";
import { styles } from "../styles";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user, loading } = useAuthUser();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert("Informe um e-mail e uma senha.");
      return;
    }

    try {
      await login(email.trim(), senha);
    } catch (error) {
      Alert.alert("Erro ao entrar", error.message);
    }
  }

  async function handleLogout() {
    await logout();
  }

  if (loading) {
    return (
      <View style={styles.screen}>
        <Text style={styles.helperText}>A carregar perfil...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.screen}>
        <View style={styles.authCard}>
          <Text style={styles.sectionTitle}>Entrar na conta</Text>
          <Text style={styles.sectionSubtitle}>
            Aceda para anunciar novos itens e ver os seus anúncios.
          </Text>

          <Text style={styles.fieldLabel}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="seuemail@exemplo.com"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.fieldLabel}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor="#9ca3af"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <Pressable style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Entrar</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.secondaryButtonText}>Ir para registo</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.authCard}>
        <Text style={styles.sectionTitle}>Perfil do utilizador</Text>
        <Text style={styles.profileEmail}>{user.email}</Text>

        <Pressable style={styles.primaryButton} onPress={() => navigation.navigate("NewAd")}>
          <Text style={styles.primaryButtonText}>Anunciar novo item</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate("MyAds")}>
          <Text style={styles.secondaryButtonText}>Ver os meus anúncios</Text>
        </Pressable>

        <Pressable style={styles.dangerButton} onPress={handleLogout}>
          <Text style={styles.dangerButtonText}>Sair</Text>
        </Pressable>
      </View>
    </View>
  );
}