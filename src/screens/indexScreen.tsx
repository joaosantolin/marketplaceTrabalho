import { Ionicons } from "@expo/vector-icons";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { AnnouncementCard } from "../components/AnnouncementCard";
import { db } from "../firebaseConfig";
import { getTimestampMillis } from "../services/marketplaceService";
import { styles } from "../styles";

const ALL_USERS = { id: "all", name: "Todos" };

export default function Index() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState("all");

  useEffect(() => {
    const unsubscribeAnnouncements = onSnapshot(collection(db, "announcements"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      list.sort((a, b) => getTimestampMillis(b.createdAt) - getTimestampMillis(a.createdAt));
      setAnnouncements(list);
    });

    const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      list.sort((a, b) => String(a.name ?? "").localeCompare(String(b.name ?? ""), "pt-BR"));
      setUsers(list);
    });

    return () => {
      unsubscribeAnnouncements();
      unsubscribeUsers();
    };
  }, []);

  const filterOptions = useMemo(() => [ALL_USERS, ...users], [users]);

  const filteredAnnouncements = useMemo(() => {
    if (selectedUser === "all") {
      return announcements;
    }

    return announcements.filter((item) => item.userId === selectedUser);
  }, [announcements, selectedUser]);

  return (
    <FlatList
      data={filteredAnnouncements}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        <View style={styles.pageSection}>
          <View style={styles.heroCard}>
            <Text style={styles.heroKicker}>Marketplace de comidas</Text>
            <Text style={styles.heroTitle}>Compre e anuncie refeições com rapidez</Text>
            <Text style={styles.heroDescription}>
              Explore anúncios recentes, filtre por usuário e veja os detalhes de cada oferta.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Filtrar por usuário</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {filterOptions.map((item) => {
              const active = selectedUser === item.id;

              return (
                <Pressable
                  key={item.id}
                  onPress={() => setSelectedUser(item.id)}
                  style={[styles.filterChip, active && styles.filterChipActive]}
                >
                  <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
                    {item.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Anúncios</Text>
            <Text style={styles.sectionSubtitle}>{filteredAnnouncements.length} resultado(s)</Text>
          </View>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={34} color="#9a6d2f" />
          <Text style={styles.emptyTitle}>Nenhum anúncio encontrado</Text>
          <Text style={styles.emptyText}>Tente selecionar outro usuário no filtro acima.</Text>
        </View>
      }
      renderItem={({ item }) => (
        <AnnouncementCard
          announcement={item}
          onBuyPress={() => Alert.alert("Tente novamente mais tarde")}
        />
      )}
    />
  );
}
