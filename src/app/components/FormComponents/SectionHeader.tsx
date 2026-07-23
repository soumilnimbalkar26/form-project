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
});

