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
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import BACK_ICON_IMAGE from "./../assets/Images/back-icon.png"

const HeaderTitle = ({ onClose = () => {}, onBackPress }) => {
  const { colors } = useTheme()
  const textWhiteColor = colors.textWhite
  const navigation = useNavigation()

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.backBtn} onPress={onBackPress}>
          <Image source={BACK_ICON_IMAGE} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HeaderTitle

const styles = StyleSheet.create({
  container: {
    flexDirection: "column"
  },
  backBtn: {
    padding: 10
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15
  },
  logo: {
    height: 55,
    resizeMode: "contain"
  },
  title: {
    fontSize: 20,
    fontFamily: "OpenSans-Bold",
    marginTop: -5
  },
  titleLong: {
    fontSize: 30,
    fontFamily: "OpenSans-Bold"
  },
  row: {
    flexDirection: "row",
    // flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  description: {
    paddingHorizontal: 22,
    paddingBottom: 15,
    marginTop: 10
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    marginTop: 10,
    lineHeight: 15
  },
  icon: {
    width: 35,
    height: 35
  }
})
