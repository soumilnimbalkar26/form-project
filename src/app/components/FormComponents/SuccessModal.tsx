import { router } from "expo-router";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SuccessModalProps = {
  visible: boolean;
  formTitle: string;
  onClose?: () => void;
};

export default function SuccessModal({
  visible,
  formTitle,
  onClose,
}: SuccessModalProps) {
  const handleBackToForms = () => {
    if (onClose) onClose();
    router.push("/Forms");
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.partyIcon}>🎉</Text>
          <Text style={styles.title}>Thank You!</Text>
          <Text style={styles.message}>
            Your {formTitle.toLowerCase()} application has been submitted
            successfully. We'll get back to you soon.
          </Text>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={handleBackToForms}
          >
            <Text style={styles.buttonText}>Back to Forms</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modalCard: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  partyIcon: {
    fontSize: 42,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1a0e08",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    color: "#57534e",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  button: {
    width: "100%",
    backgroundColor: "#d94e07",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
