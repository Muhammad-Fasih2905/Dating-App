import React from "react"

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native"

import { useTheme } from "react-native-paper"

const PrimaryButton = ({
  text = "",
  loading = false,
  onPress = () => {},
  fontSize = 20,
  radius = 12,
  background,
  textColor,
  height = 50
}) => {
  const { colors } = useTheme()

  const textPrimaryColor = colors.textPrimary

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          borderRadius: radius,
          backgroundColor: background || colors.white,
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
            color: textColor || "rgba(60, 60, 67, 0.8)",
            fontSize,
            marginLeft: loading ? 5 : 0
          }
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  text: {
    fontSize: 22,
    fontFamily: "OpenSans-Regular"
  }
})
