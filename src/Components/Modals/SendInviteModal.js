import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTheme } from "react-native-paper"
import Modal from "react-native-modal"
import ProfileCard from "../Cards/ProfileCard"
import InviteLocationInput from "../Inputs/InviteLocationInput"
const SendInviteModal = ({ visible, onClose, data }) => {
  const { colors } = useTheme()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return (
    <Modal isVisible={visible}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={[styles.card, { backgroundColor: colors.primary }]}>
          <View style={styles.header}>
            <Text style={[styles.headerText, { color: colors.white }]}>
              Invitation details
            </Text>
          </View>
          <ProfileCard data={data} disabled />
        </View>

        <View style={styles.inputContainer}></View>
      </View>
    </Modal>
  )
}

export default SendInviteModal

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    // alignItems: "center",
    // justifyContent: "center",
    width: "100%"
  },
  header: {
    padding: 12,
    paddingTop: 20,
    paddingBottom: 10,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerText: {
    fontSize: 20,
    fontFamily: "OpenSans-Regular"
  },
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
    marginLeft: 10,
    fontFamily: "OpenSans-Light",
    fontSize: 16
  },
  row: {
    flexDirection: "row"
  },
  btnContainer: {
    paddingVertical: 20
  },
  btnLabel: {
    fontSize: 20,
    fontFamily: "OpenSans-SemiBold",
    textAlign: "center"
  },
  rowItem: {
    flex: 1,
    padding: 10
  }
})
