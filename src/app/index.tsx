import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to MyApp</Text>

        <Text style={styles.subtitle}>
          Discover amazing features and connect with people around the world.
        </Text>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/Login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => router.push("/Signup")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Dummy application for learning React Native with Expo.
        </Text>

        <Button
          title="Preview form cards"
          color="#EA580C"
          onPress={() => router.push("/Forms")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#431407",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#9A3412",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 50,
  },

  button: {
    backgroundColor: "#F97316",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#F97316",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  signupButton: {
    width: "100%",
    backgroundColor: "#D97706",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  footer: {
    marginTop: 40,
    color: "#C2410C",
    fontSize: 13,
    textAlign: "center",
  },
});
