import React from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { useTheme } from "react-native-paper"

const TabButton = ({ onPress, selected }) => {
  const { colors } = useTheme()

  return (
    <View
      onPress={onPress}
      style={[styles.tabButton, { backgroundColor: colors.accent2 }]}
    >
      <TouchableOpacity
        onPress={() => onPress("Sent Invites")}
        style={[
          styles.root,
          {
            backgroundColor:
              selected === "Sent Invites" ? colors.primary : colors.accent2
          }
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              color: selected === "Sent Invites" ? colors.white : colors.primary
            }
          ]}
        >
          Sent Invites
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPress("Received Invites")}
        style={[
          styles.root,
          {
            backgroundColor:
              selected === "Received Invites" ? colors.primary : colors.accent2
          }
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              color:
                selected === "Received Invites" ? colors.white : colors.primary
            }
          ]}
        >
          Received Invites
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default TabButton

const styles = StyleSheet.create({
  root: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 7,
    borderRadius: 25,
    paddingHorizontal: 20
  },
  text: {
    fontSize: 14,
    fontFamily: "OpenSans-Regular"
  },
  tabButton: {
    flexDirection: "row",
    borderRadius: 25,
    flex: 1
  }
})
