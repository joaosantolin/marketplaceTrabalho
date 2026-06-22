import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { cadastrar } from "../src/services/AuthService";
import { styles } from "../src/styles";

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSignup() {
    if (!name || !email || !senha) {
      Alert.alert("Preencha nome, e-mail e senha.");
      return;
    }

    try {
      await cadastrar({ name: name.trim(), email: email.trim(), senha });
      router.replace("/profile");
    } catch (error) {
      Alert.alert("Erro ao cadastrar", error.message);
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.authCard}>
        <Text style={styles.sectionTitle}>Criar conta</Text>
        <Text style={styles.sectionSubtitle}>
          Cadastre-se para publicar e acompanhar seus anúncios.
        </Text>

        <Text style={styles.fieldLabel}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          placeholderTextColor="#9ca3af"
          value={name}
          onChangeText={setName}
        />

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

        <Pressable style={styles.primaryButton} onPress={handleSignup}>
          <Text style={styles.primaryButtonText}>Cadastrar</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={() => router.back()}>
          <Text style={styles.secondaryButtonText}>Voltar</Text>
        </Pressable>
      </View>
    </View>
  );
}
