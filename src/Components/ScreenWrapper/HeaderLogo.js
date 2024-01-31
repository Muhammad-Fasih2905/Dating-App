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
import APP_LOGO_MINI from "./../../assets/Images/Logo(2).png"

const Header = ({ title, logoHeight = 180, container }) => {
  const { colors } = useTheme()
  const textWhiteColor = colors.textWhite
  const navigation = useNavigation()

  return (
    <>
      <View style={[styles.container, { backgroundColor: colors.primary }]}>
        <View style={styles.titleContainer}>
          <Image
            style={[styles.logo, { width: logoHeight, height: logoHeight }]}
            source={APP_LOGO_MINI}
          />
          {Boolean(title) && (
            <Text
              style={[styles.title, { color: "white", textAlign: "center" }]}
            >
              {title}
            </Text>
          )}
        </View>
      </View>
    </>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center"
    // paddingTop: 30,
    // paddingBottom: 40,
    // alignItems: 'center',
  },
  backBtn: {
    padding: 10
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "flex-start"
    // paddingTop: 15,
  },
  logo: {
    resizeMode: "contain"
  },
  title: {
    fontSize: 18,
    fontFamily: "OpenSans-SemiBold",
    marginTop: 30,
    marginBottom: 15
  }
})
