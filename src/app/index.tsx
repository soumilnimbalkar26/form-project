import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Decorative accent dot */}
        <View style={styles.accentDot} />

        <Text style={styles.badge}>MISSION UDYOJAK</Text>

        <Text style={styles.title}>Welcome to{"\n"}MyApp</Text>

        <Text style={styles.subtitle}>
          Discover amazing features and connect with people around the world.
        </Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/Login")}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => router.push("/Signup")}
          >
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.formsButton}
            onPress={() => router.push("/Forms")}
          >
            <Text style={styles.formsButtonIcon}>📋</Text>
            <Text style={styles.formsButtonText}>View Forms</Text>
            <Text style={styles.formsButtonArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.footerLine} />
        <Text style={styles.footer}>
          Powered by Mission Udyojak Foundation
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F13",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  accentDot: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#6C63FF",
    opacity: 0.12,
    marginBottom: 24,
  },
  badge: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6C63FF",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 16,
    textAlign: "center",
    lineHeight: 46,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#A0A0B8",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 48,
    paddingHorizontal: 8,
  },
  buttonGroup: {
    width: "100%",
    gap: 14,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#6C63FF",
    paddingVertical: 17,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#6C63FF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  signupButton: {
    width: "100%",
    backgroundColor: "transparent",
    paddingVertical: 17,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#6C63FF",
  },
  signupButtonText: {
    color: "#6C63FF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  formsButton: {
    width: "100%",
    backgroundColor: "#1A1A24",
    paddingVertical: 17,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A2A3A",
  },
  formsButtonIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  formsButtonText: {
    color: "#E0E0EE",
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  formsButtonArrow: {
    color: "#6C63FF",
    fontSize: 20,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#6C63FF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  footerContainer: {
    position: "absolute",
    bottom: 32,
    alignItems: "center",
    width: "100%",
  },
  footerLine: {
    width: 40,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#2A2A3A",
    marginBottom: 12,
  },
  footer: {
    color: "#4A4A62",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
