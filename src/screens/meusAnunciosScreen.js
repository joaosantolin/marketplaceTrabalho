import { useRouter } from "expo-router";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { AnnouncementCard } from "../src/components/AnnouncementCard";
import { db } from "../src/firebaseConfig";
import { useAuthUser } from "../src/hooks/useAuthUser";
import { getTimestampMillis } from "../src/services/marketplaceService";
import { styles } from "../src/styles";

export default function MyAdsScreen() {
  const router = useRouter();
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
        <Text style={styles.helperText}>Carregando...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.screen}>
        <View style={styles.authCard}>
          <Text style={styles.sectionTitle}>Faça login para continuar</Text>
          <Text style={styles.sectionSubtitle}>
            Acesse seu perfil para ver os anúncios publicados por você.
          </Text>

          <Pressable style={styles.primaryButton} onPress={() => router.push("/profile")}>
            <Text style={styles.primaryButtonText}>Ir para login</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.pageSection}>
        <Text style={styles.sectionTitle}>Meus anúncios</Text>
        <Text style={styles.sectionSubtitle}>
          Mostrando todos os anúncios publicados por {user.email}.
        </Text>
      </View>

      {mine.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Nenhum anúncio encontrado</Text>
          <Text style={styles.emptyText}>
            Você ainda não publicou nenhum item.
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
