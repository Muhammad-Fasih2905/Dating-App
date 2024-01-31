import React from "react"

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Platform
} from "react-native"

import { useTheme } from "react-native-paper"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
const InviteLocationInput = props => {
  const { colors } = useTheme()
  return (
    <>
      <View style={[styles.invite]}>
        <Text style={[styles.inviteText, { color: colors.white }]}>Place</Text>
        <View style={[styles.input, { backgroundColor: colors.white }]}>
          <MaterialIcons
            name="location-on"
            size={26}
            color={colors.primary}
            style={styles.icon}
          />
          <TextInput style={styles.inputText} placeholder="Place" {...props} />
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

export default InviteLocationInput

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
    padding: Platform?.OS === "ios" ? 12 : 0,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    flexDirection: "row"
  },

  inputText: {
    flex: 1,
    fontSize: 16
    // backgroundColor: "pink"
  },
  icon: {
    marginHorizontal: 10
  },
  error: {
    fontSize: 12,
    fontFamily: "OpenSans-Regular",
    textAlign: "center",
    marginVertical: 5
  }
})
