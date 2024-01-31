import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"

import { useTheme } from "react-native-paper"
import Header from "./Header"
import MyStatusBar from "./MyStatusBar"
import PROFILE_IMAGE from "./../assets/Images/profile.png"
import { useSelector } from "react-redux"
const ModalHeader = ({ onClose, onProfilePress, backBtn = true }) => {
  const { colors } = useTheme()
  const user = useSelector(state => state.userReducer.user)
  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <MyStatusBar />
      {backBtn && <Header onClose={onClose} onBackPress={onClose} />}
      <View style={[styles.content, { marginTop: backBtn ? 10 : 25 }]}>
        <TouchableOpacity onPress={onProfilePress}>
          <Image
            source={
              user?.profile_picture
                ? { uri: user.profile_picture }
                : PROFILE_IMAGE
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={[styles.name, { color: colors.accent }]}>
          {user?.name}
        </Text>
      </View>
    </View>
  )
}

export default ModalHeader

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  content: {
    alignItems: "center",
    paddingVertical: 20,
    paddingTop: 10
  },
  image: {
    height: 120,
    width: 120,
    resizeMode: "stretch"
  },
  name: {
    fontSize: 24,
    fontFamily: "OpenSans-Bold",
    textAlign: "center",
    marginTop: 10
  },
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    resizeMode: "cover"
  }
})
