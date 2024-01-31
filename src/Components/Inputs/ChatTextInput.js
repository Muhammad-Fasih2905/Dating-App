import React from "react"
import { TextInput, useTheme } from "react-native-paper"
import { Text, StyleSheet } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

const ChatTextInput = props => {
  const { colors } = useTheme()
  return (
    <>
      <TextInput
        mode="outlined"
        outlineColor={colors.primaryLite}
        activeOutlineColor={colors.primaryLite}
        theme={{
          colors: {
            text: colors.lightGrey3,
            placeholder: colors.lightGrey3,
            background: "rgba(255, 255, 255, 0.75)"
          },
          fonts: {
            fontFamily: "OpenSans-Regular"
          },
          roundness: 12
        }}
        style={styles.inputText}
        {...props}
        right={
          <TextInput.Icon
            name={() => (
              <Ionicons
                name={"send"}
                style={styles.icon}
                color={colors.primaryLite}
                size={28}
              />
            )}
            color={colors.primaryText}
            size={30}
            onPress={props.onPress}
          />
        }
      />
      {Boolean(props.error?.[0]) && (
        <Text style={[styles.error, { color: colors.error }]}>
          {props.error?.[0]}
        </Text>
      )}
    </>
  )
}

export default ChatTextInput

const styles = StyleSheet.create({
  inputText: {
    fontSize: 16,
    height: 60,
    margin: 20,
    marginVertical: 10,
    marginTop: 0
  },
  error: {
    fontSize: 12,
    fontFamily: "OpenSans-Regular",
    marginVertical: 5
  },
  icon: {
    marginBottom: -6,
    marginLeft: -5
  }
})
