import React from "react"
import { TextInput, useTheme } from "react-native-paper"
import { Text, StyleSheet } from "react-native"
const SimpleInput = props => {
  const { colors } = useTheme()

  return (
    <>
      {props?.title && (
        <Text style={[styles.label, { color: colors.black }]}>
          {props.title}
        </Text>
      )}
      <TextInput
        mode="outlined"
        outlineColor={colors.lightGrey}
        activeOutlineColor={colors.lightGrey}
        theme={{
          colors: { text: "rgba(0, 0, 0, 0.7)", background: colors.white },
          roundness: 12
        }}
        style={[
          {
            fontSize: 16,
            height: props.multiline ? 140 : 54,
            lineHeight: 24
          },
          props.style
        ]}
        {...props}
      />
      {Boolean(props.error?.[0]) && (
        <Text style={[styles.error, { color: colors.error }]}>
          {props.error?.[0]}
        </Text>
      )}
    </>
  )
}

export default SimpleInput

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    marginTop: 12
    // minHeight: 50,
  },
  label: {
    fontSize: 15,
    fontFamily: "OpenSans-Regular",
    marginBottom: 2
  },
  error: {
    fontSize: 12,
    fontFamily: "OpenSans-Regular",
    marginVertical: 5
  }
})
