import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormCards from "./components/FormCards";

export default function Forms() {
  const formCards = [
    {
      title: "Membership Form",
      subtitle: "Apply for Basic, Premium, or Lifetime membership",
      route: "/forms/NewMembershipForm",
    },
    { title: "Center Form", subtitle: "Register a new center application", route: "/forms/CenterForm" },
    { title: "Trainer Form", subtitle: "Submit your trainer application", route: "/forms/TrainerForm" },
    { title: "Vendor Form", subtitle: "Register as an approved vendor", route: "/forms/VendorForm" },
    {
      title: "Coordinator Form",
      subtitle: "Apply for coordinator position",
      route: "/forms/CoordinatorForm",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerBadge}>FORMS</Text>
          <Text style={styles.headerTitle}>Application Forms</Text>
          <Text style={styles.headerSubtitle}>
            Select a form below to get started with your application
          </Text>
        </View>

        {formCards.map((form, index) => (
          <FormCards
            key={index}
            title={form.title}
            subtitle={form.subtitle}
            route={form.route}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F13",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 28,
    alignItems: "center",
  },
  headerBadge: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6C63FF",
    letterSpacing: 3,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#A0A0B8",
    textAlign: "center",
    lineHeight: 20,
  },
});
