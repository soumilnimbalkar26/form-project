import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SuccessModal from "../components/FormComponents/SuccessModal";

// ----------------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------------

type Gender = "Male" | "Female" | "Other";
type ProfessionType =
  | "Proprietor"
  | "Partnership"
  | "Company"
  | "Student"
  | "Employ"
  | "Unemployed"
  | "Service"
  | "Freelancer"
  | "Other";

type TrainerFormData = {
  fullName: string;
  fatherSpouseName: string;
  dob: Date | null;
  gender: Gender | null;
  mobileNumber: string;
  email: string;

  residentialAddress: string;
  city: string;
  state: string;
  pinCode: string;

  education: string;
  occupation: string;
  businessName: string;
  professionType: ProfessionType | null;
  annualIncome: string;

  reasonToJoin: string;
  skillsInterests: string;
};

// ----------------------------------------------------------------------------------
// Option lists & Defaults
// ----------------------------------------------------------------------------------

const GENDER_OPTIONS: Gender[] = ["Male", "Female", "Other"];

const PROFESSION_TYPE_OPTIONS: ProfessionType[] = [
  "Proprietor",
  "Partnership",
  "Company",
  "Student",
  "Employ",
  "Unemployed",
  "Service",
  "Freelancer",
  "Other",
];

const DEFAULT_VALUES: TrainerFormData = {
  fullName: "",
  fatherSpouseName: "",
  dob: new Date(),
  gender: null,
  mobileNumber: "",
  email: "",

  residentialAddress: "",
  city: "",
  state: "",
  pinCode: "",

  education: "",
  occupation: "",
  businessName: "",
  professionType: null,
  annualIncome: "",

  reasonToJoin: "",
  skillsInterests: "",
};

// ----------------------------------------------------------------------------------
// API call
// ----------------------------------------------------------------------------------

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

async function submitTrainerApplication(payload: TrainerFormData) {
  const response = await fetch(`${API_BASE_URL}/api/trainerform`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      dob: payload.dob?.toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

// ----------------------------------------------------------------------------------
// Small reusable pieces
// ----------------------------------------------------------------------------------

const SectionHeader = ({ title }: { title: string }) => (
  <View style={style.sectionHeaderWrapper}>
    <Text style={style.sectionHeaderText}>{title}</Text>
  </View>
);

const FieldLabel = ({ label }: { label: string }) => (
  <Text style={style.fieldLabel}>{label}</Text>
);

const ErrorText = ({ message }: { message?: string }) =>
  message ? <Text style={style.errorText}>{message}</Text> : null;

function RadioGroupField<T extends string>({
  options,
  value,
  onChange,
  wrap = false,
}: {
  options: T[];
  value: T | null;
  onChange: (val: T) => void;
  wrap?: boolean;
}) {
  return (
    <View style={[style.radioGroup, wrap && style.radioGroupWrap]}>
      {options.map((option) => {
        const isSelected = value === option;
        return (
          <Pressable
            key={option}
            style={style.radioOption}
            onPress={() => onChange(option)}
          >
            <View
              style={[
                style.radioCircle,
                isSelected && style.radioCircleSelected,
              ]}
            >
              {isSelected && <View style={style.radioInnerDot} />}
            </View>
            <Text style={style.radioLabel}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

// ----------------------------------------------------------------------------------
// Main component
// ----------------------------------------------------------------------------------

const TrainerForm = () => {
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TrainerFormData>({
    defaultValues: DEFAULT_VALUES,
    mode: "onSubmit",
  });

  const dob = watch("dob");

  const onSubmit = async (data: TrainerFormData) => {
    setIsSubmitting(true);
    try {
      const result = await submitTrainerApplication(data);
      console.log("Trainer Form Submitted:", data, "API response:", result);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Trainer form submission failed:", error);
      Alert.alert(
        "Submission Failed",
        "Something went wrong while submitting your application. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LinearGradient
      colors={["#1b0c06", "#3e1607", "#8d340e", "#b84714"]}
      locations={[0, 0.35, 0.75, 1.0]}
      style={style.container}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <SuccessModal
        visible={showSuccessModal}
        formTitle="trainer"
        onClose={() => setShowSuccessModal(false)}
      />

      <SafeAreaView style={style.safeArea}>
        <ScrollView
          style={style.scrollContent}
          contentContainerStyle={style.scrollContentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Header Navigation */}
          <View style={style.headerNav}>
            <TouchableOpacity
              style={style.backButton}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={style.orgTitle}>MISSION UDYOJAK FOUNDATION</Text>
            <Text style={style.title}>Trainer Application Form</Text>
          </View>

          {/* 1. Personal Details */}
          <SectionHeader title="1. Personal Details" />

          <FieldLabel label="Full Name" />
          <Controller
            control={control}
            name="fullName"
            rules={{ required: "Full name is required" }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={style.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter full name"
                placeholderTextColor="#a8998d"
              />
            )}
          />
          <ErrorText message={errors.fullName?.message} />

          <FieldLabel label="Father's / Spouse Name" />
          <Controller
            control={control}
            name="fatherSpouseName"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={style.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter father's / spouse name"
                placeholderTextColor="#a8998d"
              />
            )}
          />

          <FieldLabel label="Date of Birth" />
          <Pressable
            style={style.dateInput}
            onPress={() => setShowDobPicker(true)}
          >
            <Text style={dob ? style.dateText : style.placeholder}>
              {dob ? dob.toLocaleDateString("en-GB") : "Select Date of Birth"}
            </Text>
          </Pressable>

          {showDobPicker && (
            <Controller
              control={control}
              name="dob"
              render={({ field: { value, onChange } }) => (
                <DateTimePicker
                  value={value || new Date()}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  maximumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    setShowDobPicker(Platform.OS === "ios");
                    if (event.type === "set" && selectedDate) {
                      onChange(selectedDate);
                    }
                    if (Platform.OS !== "ios") {
                      setShowDobPicker(false);
                    }
                  }}
                />
              )}
            />
          )}

          <FieldLabel label="Gender" />
          <Controller
            control={control}
            name="gender"
            rules={{ required: "Please select a gender" }}
            render={({ field: { value, onChange } }) => (
              <RadioGroupField
                options={GENDER_OPTIONS}
                value={value}
                onChange={onChange}
              />
            )}
          />
          <ErrorText message={errors.gender?.message} />

          <FieldLabel label="Mobile Number" />
          <Controller
            control={control}
            name="mobileNumber"
            rules={{
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit mobile number",
              },
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={style.input}
                value={value}
                onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ""))}
                onBlur={onBlur}
                placeholder="Enter mobile number"
                placeholderTextColor="#a8998d"
                keyboardType="phone-pad"
                maxLength={10}
              />
            )}
          />
          <ErrorText message={errors.mobileNumber?.message} />

          <FieldLabel label="Email ID" />
          <Controller
            control={control}
            name="email"
            rules={{
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={style.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter email address"
                placeholderTextColor="#a8998d"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          <ErrorText message={errors.email?.message} />

          {/* 2. Address Details */}
          <SectionHeader title="2. Address Details" />

          <FieldLabel label="Residential Address" />
          <Controller
            control={control}
            name="residentialAddress"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={[style.input, style.textArea]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter residential address"
                placeholderTextColor="#a8998d"
                multiline
                numberOfLines={3}
              />
            )}
          />

          <View style={style.row}>
            <View style={style.rowItem}>
              <FieldLabel label="City" />
              <Controller
                control={control}
                name="city"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    style={style.input}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="City"
                    placeholderTextColor="#a8998d"
                  />
                )}
              />
            </View>
            <View style={style.rowItem}>
              <FieldLabel label="State" />
              <Controller
                control={control}
                name="state"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    style={style.input}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="State"
                    placeholderTextColor="#a8998d"
                  />
                )}
              />
            </View>
          </View>

          <FieldLabel label="PIN Code" />
          <Controller
            control={control}
            name="pinCode"
            rules={{
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Enter a valid 6-digit PIN code",
              },
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={style.input}
                value={value}
                onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ""))}
                onBlur={onBlur}
                placeholder="Enter PIN code"
                placeholderTextColor="#a8998d"
                keyboardType="number-pad"
                maxLength={6}
              />
            )}
          />
          <ErrorText message={errors.pinCode?.message} />

          {/* 3. Professional Details */}
          <SectionHeader title="3. Professional Details" />

          <FieldLabel label="Education" />
          <Controller
            control={control}
            name="education"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={style.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter education"
                placeholderTextColor="#a8998d"
              />
            )}
          />

          <FieldLabel label="Occupation" />
          <Controller
            control={control}
            name="occupation"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={style.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter occupation"
                placeholderTextColor="#a8998d"
              />
            )}
          />

          <FieldLabel label="Business Name (if any)" />
          <Controller
            control={control}
            name="businessName"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={style.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter business name"
                placeholderTextColor="#a8998d"
              />
            )}
          />

          <FieldLabel label="Type" />
          <Controller
            control={control}
            name="professionType"
            render={({ field: { value, onChange } }) => (
              <RadioGroupField
                options={PROFESSION_TYPE_OPTIONS}
                value={value}
                onChange={onChange}
                wrap
              />
            )}
          />

          <FieldLabel label="Annual Income (Approx)" />
          <Controller
            control={control}
            name="annualIncome"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={style.input}
                value={value}
                onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ""))}
                onBlur={onBlur}
                placeholder="Enter approx annual income"
                placeholderTextColor="#a8998d"
                keyboardType="numeric"
              />
            )}
          />

          {/* 5. Reason to join */}
          <SectionHeader title="5. Why do you want to join Mission Udyojak Foundation?" />
          <Controller
            control={control}
            name="reasonToJoin"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={[style.input, style.textArea]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Share your reason"
                placeholderTextColor="#a8998d"
                multiline
                numberOfLines={4}
              />
            )}
          />

          {/* 6. Skills / Interests */}
          <SectionHeader title="6. Skills / Interests" />
          <Controller
            control={control}
            name="skillsInterests"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={[style.input, style.textArea]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="List your skills / interests"
                placeholderTextColor="#a8998d"
                multiline
                numberOfLines={3}
              />
            )}
          />

          <Pressable
            style={[
              style.submitButton,
              isSubmitting && style.submitButtonDisabled,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#1a0e08" />
            ) : (
              <Text style={style.submitButtonText}>Submit Application</Text>
            )}
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default TrainerForm;

// ----------------------------------------------------------------------------------
// Styles
// ----------------------------------------------------------------------------------

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  headerNav: {
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  orgTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#ef833b",
    marginBottom: 2,
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  sectionHeaderWrapper: {
    marginTop: 24,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(249, 115, 22, 0.35)",
    paddingBottom: 6,
  },
  sectionHeaderText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#f97316",
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#e2d5cd",
    marginTop: 12,
    marginBottom: 6,
  },
  errorText: {
    fontSize: 12,
    color: "#f87171",
    marginTop: 4,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#FFFFFF",
  },
  dateInput: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dateText: {
    fontSize: 15,
    color: "#FFFFFF",
  },
  placeholder: {
    fontSize: 15,
    color: "#a8998d",
  },
  textArea: {
    minHeight: 85,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  rowItem: {
    flex: 1,
  },
  radioGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 6,
  },
  radioGroupWrap: {
    gap: 12,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#f97316",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioCircleSelected: {
    borderColor: "#f97316",
  },
  radioInnerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#f97316",
  },
  radioLabel: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  submitButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 28,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: "#1a0e08",
    fontSize: 17,
    fontWeight: "bold",
  },
});

