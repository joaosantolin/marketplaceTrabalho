import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { cadastrar } from "../services/AuthService";
import { styles } from "../styles";

export default function SignupScreen() {
  const navigation = useNavigation();
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
      navigation.replace("Perfil");
    } catch (error) {
      Alert.alert("Erro ao registar", error.message);
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.authCard}>
        <Text style={styles.sectionTitle}>Criar conta</Text>
        <Text style={styles.sectionSubtitle}>
          Registe-se para publicar e acompanhar os seus anúncios.
        </Text>

        <Text style={styles.fieldLabel}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="O seu nome"
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
          <Text style={styles.primaryButtonText}>Registar</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryButtonText}>Voltar</Text>
        </Pressable>
      </View>
    </View>
  );
}