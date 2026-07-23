import { LinearGradient } from "expo-linear-gradient";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface IndexProps {
  logoSource?: ImageSourcePropType;
}

export default function Index({ logoSource }: IndexProps) {
  return (
    <LinearGradient
      colors={["#1b0c06", "#3e1607", "#8d340e", "#b84714"]}
      locations={[0, 0.35, 0.75, 1.0]}
      style={styles.container}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Top Logo Container / Image Placeholder */}
          <View style={styles.logoSection}>
            <View style={styles.logoCircle}>
              {logoSource ? (
                <Image
                  source={logoSource}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              ) : (
                /* Styled Image Placeholder representing Mission Udyojak Foundation */
                <View style={styles.logoPlaceholder}>
                  {/* Top Emblem Graphic */}
                  <View style={styles.emblemContainer}>
                    <Text style={styles.starIcon}>✦</Text>
                    <View style={styles.archOuter}>
                      <View style={styles.emblemBody}>
                        <View style={styles.emblemLeftWing} />
                        <View style={styles.emblemCenterDot} />
                        <View style={styles.emblemRightWing} />
                      </View>
                    </View>
                  </View>

                  {/* Logo Text Section */}
                  <View style={styles.logoTextWrapper}>
                    <View style={styles.missionLineContainer}>
                      <View style={styles.dashLine} />
                      <Text style={styles.missionText}>MISSION</Text>
                      <View style={styles.dashLine} />
                    </View>
                    <Text style={styles.udyojakText}>UDYOJAK</Text>
                    <Text style={styles.foundationText}>FOUNDATION</Text>

                    <View style={styles.subDivider} />
                    <Text style={styles.taglineText}>
                      EMPOWER · INSPIRE · SUCCEED
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Middle Content */}
          <View style={styles.textSection}>
            <Text style={styles.welcomeLabel}>WELCOME TO</Text>
            <Text style={styles.title}>Mission Udyojak</Text>
            <Text style={styles.title}>Foundation</Text>
            <Text style={styles.subtitle}>
              Empowering entrepreneurs and communities to build a better future,
              one opportunity at a time.
            </Text>
          </View>

          {/* Bottom Button */}
          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={styles.getStartedButton}
              activeOpacity={0.85}
              onPress={() => router.push("/Forms")}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 16,
    justifyContent: "space-between",
  },
  logoSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  logoCircle: {
    width: 270,
    height: 270,
    borderRadius: 135,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
    padding: 16,
  },
  logoImage: {
    width: 220,
    height: 220,
  },
  logoPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  emblemContainer: {
    alignItems: "center",
    marginBottom: 6,
  },
  starIcon: {
    fontSize: 16,
    color: "#ca6a1b",
    marginBottom: -4,
  },
  archOuter: {
    width: 90,
    height: 60,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    borderWidth: 2.5,
    borderColor: "#c46d27",
    borderBottomWidth: 0,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 4,
  },
  emblemBody: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },
  emblemLeftWing: {
    width: 14,
    height: 32,
    backgroundColor: "#4a220b",
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  emblemCenterDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ca6a1b",
    marginBottom: 16,
  },
  emblemRightWing: {
    width: 14,
    height: 32,
    backgroundColor: "#4a220b",
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  logoTextWrapper: {
    alignItems: "center",
    marginTop: 4,
    width: "100%",
  },
  missionLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 2,
  },
  dashLine: {
    height: 1.5,
    width: 24,
    backgroundColor: "#ca6a1b",
  },
  missionText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#ca6a1b",
    letterSpacing: 2,
  },
  udyojakText: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1c0d06",
    letterSpacing: 0.5,
    lineHeight: 30,
    marginTop: 1,
  },
  foundationText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#8c481d",
    letterSpacing: 4,
    marginTop: 1,
  },
  subDivider: {
    height: 1,
    width: "80%",
    backgroundColor: "#d4a478",
    marginVertical: 6,
  },
  taglineText: {
    fontSize: 7.5,
    fontWeight: "bold",
    color: "#4a220b",
    letterSpacing: 0.8,
  },

  textSection: {
    marginBottom: 36,
  },
  welcomeLabel: {
    color: "#ef833b",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 10,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 42,
  },
  subtitle: {
    color: "#e4d5cc",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
    fontWeight: "400",
  },

  buttonSection: {
    marginBottom: 24,
  },
  getStartedButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#1a0e08",
    fontSize: 18,
    fontWeight: "bold",
  },
});
