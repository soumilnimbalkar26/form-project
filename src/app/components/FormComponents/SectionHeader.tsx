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
});
