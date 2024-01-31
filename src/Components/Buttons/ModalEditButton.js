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
  radius = 12,
  background,
  textColor
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
          backgroundColor: background || colors.white
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
    flexDirection: "row",
    padding: 5,
    paddingHorizontal: 10
  },
  text: {
    fontSize: 18,
    fontFamily: "OpenSans-SemiBold"
  }
})
