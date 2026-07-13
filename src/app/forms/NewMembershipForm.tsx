import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NewMembershipForm = () => {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.scrollContent}>
        <Text>MembershipForm</Text>
      </View>

      <View>Form</View>
    </SafeAreaView>
  );
};

export default NewMembershipForm;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7ED",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
});
