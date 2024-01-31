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
  height = 50,
  hasShadow = true,
  disabled = false,
  left
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
        },
        hasShadow && styles.shadow
      ]}
      disabled={loading || disabled}
    >
      {loading && <ActivityIndicator color={textColor || colors.primaryText} />}
      {left && left}
      <Text
        style={[
          styles.text,
          {
            color: textColor || colors.primaryText,
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
    // flex: 1,

    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  text: {
    fontSize: 22,
    fontFamily: "OpenSans-SemiBold"
    // fontWeight: '800',
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.4,
    shadowRadius: 2.5,

    elevation: 5
  }
})
