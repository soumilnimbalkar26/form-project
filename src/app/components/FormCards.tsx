import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

type FormCardProps = {
  title: string;
  subtitle: string;
  route: string;
};

export default function FormCards({ title, subtitle, route }: FormCardProps) {
  const handlePress = () => {
    router.push(route as any);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.accentStripe} />
      <View style={styles.cardBody}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>📄</Text>
          </View>
          <View style={styles.textContent}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle || "Tap to open this form"}</Text>
          </View>
        </View>

        <View style={styles.button}>
          <Text style={styles.buttonText}>Open Form</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#1A1A24",
    borderRadius: 18,
    marginBottom: 16,
    flexDirection: "row",
    overflow: "hidden",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,

    borderWidth: 1,
    borderColor: "#2A2A3A",
  },

  accentStripe: {
    width: 4,
    backgroundColor: "#6C63FF",
  },

  cardBody: {
    flex: 1,
    padding: 20,
  },

  content: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#22222E",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  icon: {
    fontSize: 20,
  },

  textContent: {
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
    letterSpacing: 0.2,
  },

  subtitle: {
    fontSize: 13,
    color: "#A0A0B8",
    lineHeight: 18,
  },

  button: {
    backgroundColor: "#22222E",
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#6C63FF",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  buttonArrow: {
    color: "#6C63FF",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
});
