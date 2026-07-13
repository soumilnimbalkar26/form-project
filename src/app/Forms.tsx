import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormCards from "./components/FormCards";

export default function Forms() {
  const formCards = [
    { title: "Membership Form", subtitle: "", route: "/forms/MembershipForm" },
    { title: "Center Form", subtitle: "", route: "/forms/CenterForm" },
    { title: "Trainer Form", subtitle: "", route: "/forms/TrainerForm" },
    { title: "Vendor Form", subtitle: "", route: "/forms/VendorForm" },
    {
      title: "Coordinator Form",
      subtitle: "",
      route: "/forms/CoordinatorForm",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
    backgroundColor: "#FFF7ED",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
});
