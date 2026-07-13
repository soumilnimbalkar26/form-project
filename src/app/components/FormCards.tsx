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
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={styles.button}>
        <Text style={styles.buttonText}>Open Form</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,

    shadowColor: "#431407",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  content: {
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#431407",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    color: "#9A3412",
    lineHeight: 22,
  },

  button: {
    backgroundColor: "#F97316",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
