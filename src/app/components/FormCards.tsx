import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type FormCardProps = {
  title: string;
  subtitle: string;
  route: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  emoji?: string;
};

export default function FormCards({
  title,
  subtitle,
  route,
  iconName,
  emoji,
}: FormCardProps) {
  const handlePress = () => {
    router.push(route as any);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.82}
    >
      <View style={styles.iconBadge}>
        {emoji ? (
          <Text style={styles.emojiText}>{emoji}</Text>
        ) : iconName ? (
          <Ionicons name={iconName} size={22} color="#e5a16d" />
        ) : (
          <Ionicons name="document-text-outline" size={22} color="#e5a16d" />
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#cbbbb0" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "rgba(56, 32, 23, 0.72)",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.07)",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  emojiText: {
    fontSize: 22,
  },
  content: {
    flex: 1,
    marginHorizontal: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 13,
    color: "#cbbbb0",
    marginTop: 3,
    lineHeight: 18,
  },
});
