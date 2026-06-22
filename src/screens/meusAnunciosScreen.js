import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { AnnouncementCard } from "../components/AnnouncementCard";
import { db } from "../firebaseConfig";
import { useAuthUser } from "../hooks/useAuthUser";
import { getTimestampMillis } from "../services/marketplaceService";
import { styles } from "../styles";

export default function MyAdsScreen() {
  const navigation = useNavigation();
  const { user, loading } = useAuthUser();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "announcements"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      list.sort((a, b) => getTimestampMillis(b.createdAt) - getTimestampMillis(a.createdAt));
      setAnnouncements(list);
    });

    return () => unsubscribe();
  }, []);

  const mine = user ? announcements.filter((item) => item.userId === user.uid) : [];

  if (loading) {
    return (
      <View style={styles.screen}>
        <Text style={styles.helperText}>A carregar...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.screen}>
        <View style={styles.authCard}>
          <Text style={styles.sectionTitle}>Faça login para continuar</Text>
          <Text style={styles.sectionSubtitle}>
            Aceda ao seu perfil para ver os anúncios publicados por si.
          </Text>

          <Pressable style={styles.primaryButton} onPress={() => navigation.navigate("Perfil")}>
            <Text style={styles.primaryButtonText}>Ir para login</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.pageSection}>
        <Text style={styles.sectionTitle}>Os meus anúncios</Text>
        <Text style={styles.sectionSubtitle}>
          A mostrar todos os anúncios publicados por {user.email}.
        </Text>
      </View>

      {mine.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Nenhum anúncio encontrado</Text>
          <Text style={styles.emptyText}>
            Ainda não publicou nenhum item.
          </Text>
        </View>
      ) : (
        mine.map((item) => (
          <AnnouncementCard
            key={item.id}
            announcement={item}
            onBuyPress={() => Alert.alert("Tente novamente mais tarde")}
          />
        ))
      )}
    </View>
  );
}