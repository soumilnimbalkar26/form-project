import DateTimePicker from "@react-native-community/datetimepicker";
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
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
            style={[style.radioOption, isSelected && style.radioOptionSelected]}
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
            <Text style={[style.radioLabel, isSelected && style.radioLabelSelected]}>{option}</Text>
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
      Alert.alert("Success", "Trainer application submitted successfully.");
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
    <SafeAreaView style={style.container}>
      <ScrollView
        style={style.scrollContent}
        contentContainerStyle={style.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={style.orgTitle}>MISSION UDYOJAK FOUNDATION</Text>
        <Text style={style.title}>Trainer Application Form</Text>

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
              placeholderTextColor="#4A4A62"
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
              placeholderTextColor="#4A4A62"
            />
          )}
        />

        <FieldLabel label="Date of Birth" />
        <Pressable
          style={style.dateInput}
          onPress={() => setShowDobPicker(true)}
        >
          <Text style={dob ? style.dateText : style.placeholder}>
            {dob ? `📅  ${dob.toLocaleDateString("en-GB")}` : "📅  Select Date of Birth"}
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
              placeholderTextColor="#4A4A62"
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
              placeholderTextColor="#4A4A62"
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
              placeholderTextColor="#4A4A62"
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
                  placeholderTextColor="#4A4A62"
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
                  placeholderTextColor="#4A4A62"
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
              placeholderTextColor="#4A4A62"
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
              placeholderTextColor="#4A4A62"
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
              placeholderTextColor="#4A4A62"
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
              placeholderTextColor="#4A4A62"
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
              placeholderTextColor="#4A4A62"
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
              placeholderTextColor="#4A4A62"
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
              placeholderTextColor="#4A4A62"
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
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={style.submitButtonText}>Submit Application</Text>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrainerForm;

// ----------------------------------------------------------------------------------
// Styles
// ----------------------------------------------------------------------------------

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F13",
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 20,
    paddingBottom: 48,
  },
  orgTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6C63FF",
    marginBottom: 4,
    textAlign: "center",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 0.3,
  },
  sectionHeaderWrapper: {
    marginTop: 28,
    marginBottom: 14,
    borderLeftWidth: 3,
    borderLeftColor: "#6C63FF",
    paddingLeft: 12,
    paddingVertical: 4,
  },
  sectionHeaderText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#A0A0B8",
    marginTop: 16,
    marginBottom: 6,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  errorText: {
    fontSize: 12,
    color: "#FF6B6B",
    marginTop: 4,
  },
  input: {
    backgroundColor: "#16161F",
    borderWidth: 1,
    borderColor: "#2A2A3A",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: "#FFFFFF",
  },
  dateInput: {
    backgroundColor: "#16161F",
    borderWidth: 1,
    borderColor: "#2A2A3A",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  dateText: {
    fontSize: 15,
    color: "#FFFFFF",
  },
  placeholder: {
    fontSize: 15,
    color: "#4A4A62",
  },
  textArea: {
    minHeight: 100,
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
    gap: 10,
    marginTop: 4,
  },
  radioGroupWrap: {
    gap: 8,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "transparent",
    marginBottom: 4,
  },
  radioOptionSelected: {
    backgroundColor: "#1A1A2E",
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#4A4A62",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioCircleSelected: {
    borderColor: "#6C63FF",
  },
  radioInnerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#6C63FF",
  },
  radioLabel: {
    fontSize: 14,
    color: "#A0A0B8",
  },
  radioLabelSelected: {
    color: "#E0E0EE",
  },
  submitButton: {
    backgroundColor: "#6C63FF",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 32,
    shadowColor: "#6C63FF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
