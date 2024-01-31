import React from "react"

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform
} from "react-native"

import { useTheme } from "react-native-paper"

import { useNavigation } from "@react-navigation/native"
import APP_LOGO_MINI from "./../../assets/Images/Logo.png"
import MENU_MINI from "./../../assets/Images/HambMenu.png"

const HeaderLogo2 = ({ title, logoHeight = 50, container, isSignup }) => {
  const { colors } = useTheme()
  const textWhiteColor = colors.textWhite
  const navigation = useNavigation()

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      {!isSignup && (
        <TouchableOpacity onPress={navigation.toggleDrawer}>
          <Image
            style={[styles.logo, { width: 50, height: 50 }]}
            source={MENU_MINI}
          />
        </TouchableOpacity>
      )}
      <Image
        style={[styles.logo, { width: logoHeight, height: logoHeight }]}
        source={APP_LOGO_MINI}
      />
    </View>
  )
}

export default HeaderLogo2

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: "center"
  },
  backBtn: {
    padding: 10
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "flex-start"
  },
  logo: {
    resizeMode: "contain"
  },
  title: {
    fontSize: 16,
    fontFamily: "OpenSans-SemiBold",
    marginTop: 30,
    marginBottom: 15
  }
})
