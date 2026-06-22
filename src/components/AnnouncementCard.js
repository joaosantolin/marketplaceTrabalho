import { Pressable, Text, View } from "react-native";
import { formatDateTime, formatPrice } from "../services/marketplaceService";
import { styles } from "../styles";

export function AnnouncementCard({ announcement, onBuyPress }) {
  const publisherName = announcement.userName || announcement.userEmail || "Usuário";

  return (
    <View style={styles.announcementCard}>
      <View style={styles.announcementHeader}>
        <Text style={styles.announcementTitle}>{announcement.title}</Text>
        <Text style={styles.announcementPrice}>{formatPrice(announcement.price)}</Text>
      </View>

      <Text style={styles.announcementMeta}>Publicado por {publisherName}</Text>
      <Text style={styles.announcementMeta}>{formatDateTime(announcement.createdAt)}</Text>

      <Text style={styles.announcementDescription} numberOfLines={3}>
        {announcement.description}
      </Text>

      <Pressable style={styles.buyButton} onPress={onBuyPress}>
        <Text style={styles.buyButtonText}>Comprar</Text>
      </Pressable>
    </View>
  );
}
