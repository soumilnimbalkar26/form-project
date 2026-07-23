import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormCards from "./components/FormCards";

export default function Forms() {
  const formCards = [
    {
      title: "Membership Form",
      subtitle: "Join as a member and get started.",
      route: "/forms/NewMembershipForm",
      emoji: "🪪",
      iconName: "card-outline" as const,
    },
    {
      title: "Center Form",
      subtitle: "Apply to open or register a center.",
      route: "/forms/CenterForm",
      emoji: "🏢",
      iconName: "business-outline" as const,
    },
    {
      title: "Trainer Form",
      subtitle: "Apply to become a certified trainer.",
      route: "/forms/TrainerForm",
      emoji: "🎓",
      iconName: "school-outline" as const,
    },
    {
      title: "Vendor Form",
      subtitle: "Register as a vendor partner.",
      route: "/forms/VendorForm",
      emoji: "🤝",
      iconName: "people-outline" as const,
    },
    {
      title: "Coordinator Form",
      subtitle: "Apply for a coordinator role.",
      route: "/forms/CoordinatorForm",
      emoji: "🧭",
      iconName: "compass-outline" as const,
    },
  ];

  return (
    <LinearGradient
      colors={["#1b0c06", "#3e1607", "#8d340e", "#b84714"]}
      locations={[0, 0.35, 0.75, 1.0]}
      style={styles.container}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Header Navigation */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Page Title & Subtitle */}
          <View style={styles.headerSection}>
            <View style={styles.titleRow}>
              <Text style={styles.pageTitle}>Application Forms</Text>
              <Text style={styles.headerEmoji}>📋</Text>
            </View>
            <Text style={styles.pageSubtitle}>
              Choose a form to get started
            </Text>
          </View>

          {/* Form Cards Stack */}
          <View style={styles.cardsContainer}>
            {formCards.map((form, index) => (
              <FormCards
                key={index}
                title={form.title}
                subtitle={form.subtitle}
                route={form.route}
                emoji={form.emoji}
                iconName={form.iconName}
              />
            ))}
          </View>

          {/* About Mission Udyojak Foundation Section */}
          <View style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>
              About Mission Udyojak Foundation
            </Text>
            <Text style={styles.aboutText}>
              We're committed to empowering individuals through
              entrepreneurship, skill development, and innovation. Every
              application you submit helps us connect ambitious minds with the
              right opportunities and support.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  headerSection: {
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  headerEmoji: {
    fontSize: 26,
  },
  pageSubtitle: {
    fontSize: 15,
    color: "#e2d5cd",
    marginTop: 4,
  },
  cardsContainer: {
    marginBottom: 18,
  },
  aboutCard: {
    backgroundColor: "rgba(50, 28, 20, 0.65)",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    marginTop: 8,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 14,
    color: "#d6c8be",
    lineHeight: 21,
  },
});
