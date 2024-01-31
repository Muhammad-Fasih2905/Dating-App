import React from "react"

import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"

import { useTheme } from "react-native-paper"

import { useNavigation } from "@react-navigation/native"
import BACK_BTN from "../../assets/Images/back-icon.png"

const HeaderBottom = ({ title, backIcon, back }) => {
  const { colors } = useTheme()
  const navigation = useNavigation()

  return (
    <>
      <View style={[styles.container, { backgroundColor: colors.primary }]}>
        <TouchableOpacity
          onPress={() => {
            back ? navigation.navigate(back) : navigation.goBack()
          }}
        >
          <Image
            style={[styles.logo, { width: 30, height: 30 }]}
            source={BACK_BTN}
          />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.secondaryText }]}>
          {title}
        </Text>
        <View style={{ width: 30, height: 30 }} />
      </View>
    </>
  )
}

export default HeaderBottom

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 8
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
    fontSize: 22,
    fontFamily: "OpenSans-SemiBold"
  }
})
