import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

const CenterForm = () => {
  // 1. Personal Details
  const [fullName, setFullName] = useState("");
  const [fatherSpouseName, setFatherSpouseName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<Gender | null>(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");

  // 2. Address Details
  const [residentialAddress, setResidentialAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");

  // 3. Professional Details
  const [education, setEducation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [professionType, setProfessionType] = useState<ProfessionType | null>(
    null,
  );
  const [annualIncome, setAnnualIncome] = useState("");

  // 5. Reason for joining
  const [reasonToJoin, setReasonToJoin] = useState("");

  // 6. Skills / Interests
  const [skillsInterests, setSkillsInterests] = useState("");

  const handleSubmit = () => {
    if (!fullName || !mobileNumber || !gender) {
      Alert.alert(
        "Missing Details",
        "Please fill in at least Full Name, Gender, and Mobile Number.",
      );
      return;
    }

    const formData = {
      fullName,
      fatherSpouseName,
      dob,
      gender,
      mobileNumber,
      email,
      residentialAddress,
      city,
      state,
      pinCode,
      education,
      occupation,
      businessName,
      professionType,
      annualIncome,
      reasonToJoin,
      skillsInterests,
    };

    console.log("Center Form Submitted:", formData);
    Alert.alert("Success", "Center application submitted successfully.");
  };

  return (
    <SafeAreaView style={style.container}>
      <ScrollView
        style={style.scrollContent}
        contentContainerStyle={style.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={style.orgTitle}>MISSION UDYOJAK FOUNDATION</Text>
        <Text style={style.title}>Center Application Form</Text>

        {/* 1. Personal Details */}
        <SectionHeader title="1. Personal Details" />

        <FieldLabel label="Full Name" />
        <TextInput
          style={style.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter full name"
          placeholderTextColor="#B0A69A"
        />

        <FieldLabel label="Father's / Spouse Name" />
        <TextInput
          style={style.input}
          value={fatherSpouseName}
          onChangeText={setFatherSpouseName}
          placeholder="Enter father's / spouse name"
          placeholderTextColor="#B0A69A"
        />

        <FieldLabel label="Date of Birth" />
        <TextInput
          style={style.input}
          value={dob}
          onChangeText={setDob}
          placeholder="DD/MM/YYYY"
          placeholderTextColor="#B0A69A"
        />

        <FieldLabel label="Gender" />
        <RadioGroup
          options={GENDER_OPTIONS}
          selected={gender}
          onSelect={setGender}
        />

        <FieldLabel label="Mobile Number" />
        <TextInput
          style={style.input}
          value={mobileNumber}
          onChangeText={setMobileNumber}
          placeholder="Enter mobile number"
          placeholderTextColor="#B0A69A"
          keyboardType="phone-pad"
          maxLength={10}
        />

        <FieldLabel label="Email ID" />
        <TextInput
          style={style.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email address"
          placeholderTextColor="#B0A69A"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* 2. Address Details */}
        <SectionHeader title="2. Address Details" />

        <FieldLabel label="Residential Address" />
        <TextInput
          style={[style.input, style.textArea]}
          value={residentialAddress}
          onChangeText={setResidentialAddress}
          placeholder="Enter residential address"
          placeholderTextColor="#B0A69A"
          multiline
          numberOfLines={3}
        />

        <View style={style.row}>
          <View style={style.rowItem}>
            <FieldLabel label="City" />
            <TextInput
              style={style.input}
              value={city}
              onChangeText={setCity}
              placeholder="City"
              placeholderTextColor="#B0A69A"
            />
          </View>
          <View style={style.rowItem}>
            <FieldLabel label="State" />
            <TextInput
              style={style.input}
              value={state}
              onChangeText={setState}
              placeholder="State"
              placeholderTextColor="#B0A69A"
            />
          </View>
        </View>

        <FieldLabel label="PIN Code" />
        <TextInput
          style={style.input}
          value={pinCode}
          onChangeText={setPinCode}
          placeholder="Enter PIN code"
          placeholderTextColor="#B0A69A"
          keyboardType="number-pad"
          maxLength={6}
        />

        {/* 3. Professional Details */}
        <SectionHeader title="3. Professional Details" />

        <FieldLabel label="Education" />
        <TextInput
          style={style.input}
          value={education}
          onChangeText={setEducation}
          placeholder="Enter education"
          placeholderTextColor="#B0A69A"
        />

        <FieldLabel label="Occupation" />
        <TextInput
          style={style.input}
          value={occupation}
          onChangeText={setOccupation}
          placeholder="Enter occupation"
          placeholderTextColor="#B0A69A"
        />

        <FieldLabel label="Business Name (if any)" />
        <TextInput
          style={style.input}
          value={businessName}
          onChangeText={setBusinessName}
          placeholder="Enter business name"
          placeholderTextColor="#B0A69A"
        />

        <FieldLabel label="Type" />
        <RadioGroup
          options={PROFESSION_TYPE_OPTIONS}
          selected={professionType}
          onSelect={setProfessionType}
          wrap
        />

        <FieldLabel label="Annual Income (Approx)" />
        <TextInput
          style={style.input}
          value={annualIncome}
          onChangeText={setAnnualIncome}
          placeholder="Enter approx annual income"
          placeholderTextColor="#B0A69A"
          keyboardType="numeric"
        />

        {/* 5. Reason to join */}
        <SectionHeader title="5. Why do you want to join Mission Udyojak Foundation?" />
        <TextInput
          style={[style.input, style.textArea]}
          value={reasonToJoin}
          onChangeText={setReasonToJoin}
          placeholder="Share your reason"
          placeholderTextColor="#B0A69A"
          multiline
          numberOfLines={4}
        />

        {/* 6. Skills / Interests */}
        <SectionHeader title="6. Skills / Interests" />
        <TextInput
          style={[style.input, style.textArea]}
          value={skillsInterests}
          onChangeText={setSkillsInterests}
          placeholder="List your skills / interests"
          placeholderTextColor="#B0A69A"
          multiline
          numberOfLines={3}
        />

        <Pressable style={style.submitButton} onPress={handleSubmit}>
          <Text style={style.submitButtonText}>Submit Application</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <View style={style.sectionHeaderWrapper}>
    <Text style={style.sectionHeaderText}>{title}</Text>
  </View>
);

const FieldLabel = ({ label }: { label: string }) => (
  <Text style={style.fieldLabel}>{label}</Text>
);

const RadioGroup = <T extends string>({
  options,
  selected,
  onSelect,
  wrap = false,
}: {
  options: T[];
  selected: T | null;
  onSelect: (value: T) => void;
  wrap?: boolean;
}) => {
  return (
    <View style={[style.radioGroup, wrap && style.radioGroupWrap]}>
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <Pressable
            key={option}
            style={style.radioOption}
            onPress={() => onSelect(option)}
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
};

export default CenterForm;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7ED",
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  orgTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#7C2D12",
    marginBottom: 2,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#7C2D12",
    marginBottom: 12,
    textAlign: "center",
  },
  sectionHeaderWrapper: {
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FDBA74",
    paddingBottom: 6,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#9A3412",
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#78716C",
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FED7AA",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#1C1917",
  },
  textArea: {
    minHeight: 80,
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
    marginTop: 4,
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
    borderColor: "#FB923C",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  radioCircleSelected: {
    borderColor: "#EA580C",
  },
  radioInnerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EA580C",
  },
  radioLabel: {
    fontSize: 14,
    color: "#292524",
  },
  submitButton: {
    backgroundColor: "#EA580C",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
