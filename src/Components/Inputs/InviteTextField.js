import React from "react"

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput
} from "react-native"

import { useTheme } from "react-native-paper"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
const InviteTextField = props => {
  const { colors } = useTheme()
  return (
    <>
      <View style={[styles.invite]}>
        <Text style={[styles.inviteText, { color: colors.white }]}>
          {props.label || "Message"}
        </Text>
        <View style={[styles.input, { backgroundColor: colors.white }]}>
          <TextInput
            style={styles.inputText}
            placeholder="Text"
            multiline
            numberOfLines={5}
            {...props}
          />
        </View>
      </View>
      {Boolean(props.error?.[0]) && (
        <Text style={[styles.error, { color: colors.white }]}>
          {props.error?.[0]}
        </Text>
      )}
    </>
  )
}

export default InviteTextField

const styles = StyleSheet.create({
  invite: {
    alignItems: "center",
    marginTop: 10
  },
  inviteText: {
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    marginBottom: 7
  },
  input: {
    padding: 12,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    flexDirection: "row"
  },

  inputText: {
    flex: 1,
    fontSize: 16,
    minHeight: 100
    // backgroundColor: "pink"
  },
  icon: {
    marginHorizontal: 10
  },
  error: {
    fontSize: 12,
    fontFamily: "OpenSans-Regular",
    // marginLeft: "5%",

    marginVertical: 5
  }
})
