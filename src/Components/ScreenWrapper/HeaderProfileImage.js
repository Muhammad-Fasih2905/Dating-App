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
import APP_LOGO_MINI from "./../../assets/Images/Logo(1).png"
import MENU_MINI from "./../../assets/Images/HambMenu.png"
import AVATAR_IMAGE from "./../../assets/Images/profile.png"
import { useSelector } from "react-redux"
const HeaderProfileImage = ({ title, logoHeight = 70, container }) => {
  const { colors } = useTheme()
  const textWhiteColor = colors.textWhite
  const navigation = useNavigation()
  const user = useSelector(state => state.userReducer.user)
  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <TouchableOpacity onPress={navigation.toggleDrawer}>
        <Image
          style={[styles.logo, { width: 40, height: 40 }]}
          source={MENU_MINI}
        />
      </TouchableOpacity>
      <Image
        style={[styles.avatar, { width: 50, height: 50, borderRadius: 25 }]}
        source={
          user?.profile_picture ? { uri: user.profile_picture } : AVATAR_IMAGE
        }
      />
      <Image
        style={[styles.logo, { width: logoHeight, height: logoHeight }]}
        source={APP_LOGO_MINI}
      />
    </View>
  )
}

export default HeaderProfileImage

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    // paddingTop: 30,
    // paddingBottom: 40,
    alignItems: "center"
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
    fontSize: 16,
    fontFamily: "OpenSans-SemiBold",
    marginTop: 30,
    marginBottom: 15
  },
  avatar: {
    marginRight: -30,
    resizeMode: "cover"
  }
})
