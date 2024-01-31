import React from "react"
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import MyStatusBar from "../../../Components/MyStatusBar"
import Header from "../../../Components/Header"
import { useTheme } from "react-native-paper"
import PrimaryButton from "../../../Components/Buttons/PrimaryButton"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useNavigation } from "@react-navigation/native"
import {
  AUTH_PATH,
  CONTACT_US_PATH,
  ONBOARDING_PATH
} from "../../../Navigation/Routes"
const Welcome = () => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  return (
    <SafeAreaProvider>
      <MyStatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
      >
        <View style={[styles.container, { backgroundColor: colors.primary }]}>
          <Header onBackPress={() => navigation.navigate(ONBOARDING_PATH)} />
          <View
            style={{
              flex: 2,
              justifyContent: "space-around"
            }}
          >
            <View style={styles.imageContainer}>
              <Image
                style={styles.logoStyle}
                source={require("../../../assets/Images/Logo.png")}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.title, { color: colors.secondaryText }]}>
                Welcome
              </Text>
              <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
                BUILD YOUR SOCIAL CIRCLE TODAY
              </Text>
              <Text style={[styles.text, { color: colors.secondaryText }]}>
                PROFESSIONAL - SPORT - FRIENDLY - ROMANTIC
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.8,
              justifyContent: "flex-end"
            }}
          >
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <PrimaryButton
                  text="LOGIN"
                  height={70}
                  onPress={() =>
                    navigation.navigate(AUTH_PATH, { type: "login" })
                  }
                />
              </View>
              <View style={styles.button}>
                <PrimaryButton
                  text="SIGNUP"
                  height={70}
                  onPress={() =>
                    navigation.navigate(AUTH_PATH, { type: "signup" })
                  }
                />
              </View>
            </View>
            <View
              style={[
                styles.buttonContainer,
                { marginTop: 40, marginBottom: 40 }
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(CONTACT_US_PATH, {
                    isFromWelcomeScreen: true
                  })
                }}
                style={styles.link}
              >
                <Text style={[styles.linkText, { color: colors.white }]}>
                  CONTACT US
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  )
}
export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logoStyle: {
    resizeMode: "contain",
    width: 140,
    height: 140,
    marginTop: 20,
    marginBottom: 50
  },
  imageContainer: {
    alignItems: "center"
    // marginTop: -30
  },
  title: {
    fontFamily: "OpenSans-Bold",
    textAlign: "center",
    fontSize: 32,
    fontWeight: "600"
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "OpenSans-Regular",
    textAlign: "center",
    marginTop: 30
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    fontFamily: "OpenSans-SemiBold",
    textAlign: "center",
    width: "80%",
    alignSelf: "center",
    marginTop: 30
  },
  buttonContainer: {
    flexDirection: "column",
    marginHorizontal: 10
    // marginTop: 30,
  },
  button: {
    marginTop: 15
  },
  linkText: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "OpenSans-Bold",
    textDecorationLine: "underline"
  }
})
