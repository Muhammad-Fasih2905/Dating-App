import React from "react"

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from "react-native"

import { useTheme } from "react-native-paper"

const ActionButton = ({
  text = "",
  loading = false,
  onPress = () => {},
  fontSize = 14,
  radius = 0,
  background,
  textColor,
  height = 60,
  image
}) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          borderRadius: radius,
          backgroundColor: background || colors.primary,
          borderBottomColor: colors.white,
          maxHeight: height,
          minHeight: height
        }
      ]}
      disabled={loading}
    >
      {loading && <ActivityIndicator color={textWhiteColor} />}
      <Text
        style={[
          styles.text,
          {
            color: textColor || colors.white,
            fontSize,
            marginLeft: loading ? 5 : 0
          }
        ]}
      >
        {text}
      </Text>
      <Image style={styles.image} source={image} />
    </TouchableOpacity>
  )
}

export default ActionButton

const styles = StyleSheet.create({
  button: {
    // flex: 1,

    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 1.5
  },
  text: {
    fontSize: 22,
    fontFamily: "OpenSans-SemiBold",
    marginBottom: 10
    // fontWeight: '800',
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginBottom: 3,
    marginRight: 30
  }
})
