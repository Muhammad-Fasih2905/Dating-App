import React, { memo } from "react"
import { View, StyleSheet } from "react-native"
import { useTheme } from "react-native-paper"
const THUMB_RADIUS = 13

const Thumb = () => {
  const { colors } = useTheme()
  return <View style={[styles.root, { borderColor: colors.primary }]} />
}

const styles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 3,
    backgroundColor: "#ffffff"
  }
})

export default memo(Thumb)
