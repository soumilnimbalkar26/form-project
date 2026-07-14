import { StyleSheet, Text, View } from "react-native";

const SectionHeader = ({ title }: { title: string }) => {
  return (
    <View style={style.sectionHeaderWrapper}>
      <Text style={style.sectionHeaderText}>{title}</Text>
    </View>
  );
};

export default SectionHeader;

const style = StyleSheet.create({
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
});
