import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { useAuthUser } from "../hooks/useAuthUser";
import { createAnnouncement } from "../services/marketplaceService";
import { styles } from "../styles";

export default function NewAdScreen() {
  const navigation = useNavigation();
  const { user, loading } = useAuthUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  async function handleCreate() {
    if (!user) {
      Alert.alert("Faça login para anunciar um item.");
      navigation.navigate("Perfil");
      return;
    }

    if (!title.trim() || !description.trim() || !price.trim()) {
      Alert.alert("Preencha o título, a descrição e o preço.");
      return;
    }

    try {
      await createAnnouncement({
        title,
        description,
        price,
        user,
      });

      Alert.alert("Anúncio publicado com sucesso.");
      navigation.replace("Home");
    } catch (error) {
      Alert.alert("Erro ao publicar", error.message);
    }
  }

  if (loading) {
    return (
      <View style={styles.screen}>
        <Text style={styles.helperText}>A carregar...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.authCard}>
        <Text style={styles.sectionTitle}>Anunciar novo item</Text>
        <Text style={styles.sectionSubtitle}>
          Informe o título, a descrição detalhada e o preço do alimento ou refeição.
        </Text>

        <Text style={styles.fieldLabel}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: Marmita executiva"
          placeholderTextColor="#9ca3af"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.fieldLabel}>Descrição detalhada</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Descreva ingredientes, tamanho, acompanhamento e observações"
          placeholderTextColor="#9ca3af"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />

        <Text style={styles.fieldLabel}>Preço</Text>
        <TextInput
          style={styles.input}
          placeholder="25,00"
          placeholderTextColor="#9ca3af"
          value={price}
          onChangeText={setPrice}
          keyboardType="decimal-pad"
        />

        <Pressable style={styles.primaryButton} onPress={handleCreate}>
          <Text style={styles.primaryButtonText}>Publicar anúncio</Text>
        </Pressable>
      </View>
    </View>
  );
}