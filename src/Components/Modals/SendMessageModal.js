import React from "react"
import { Text, View, StyleSheet } from "react-native"
import Modal from "react-native-modal"
import { useTheme } from "react-native-paper"
import PrimaryButton from "../Buttons/PrimaryButton"
import InviteTextField from "../Inputs/InviteTextField"
function SendMessageModal({ visible, onClose }) {
  const { colors } = useTheme()
  return (
    <Modal isVisible={visible} onBackdropPress={() => onClose()}>
      <View style={[styles.card, { backgroundColor: colors.primary }]}>
        <View>
          <InviteTextField label="Message Eva?" placeholder="Optional" />
        </View>
        <Text style={[styles.headingText, { color: colors.white }]}>
          Are you sure?
        </Text>
        <View style={styles.btnContainer}>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <PrimaryButton text="NO" hasShadow={false} onPress={onClose} />
            </View>
            <View style={styles.rowItem}>
              <PrimaryButton text="YES" hasShadow={false} onPress={onClose} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default SendMessageModal

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 20,
    width: "100%"
  },
  headingText: {
    fontSize: 18,
    fontFamily: "OpenSans-SemiBold",
    marginVertical: 5,
    marginTop: 20,
    textAlign: "center",
    fontWeight: "600"
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: "OpenSans-Regular",
    fontWeight: "400",
    marginBottom: 5,
    textAlign: "center"
  },
  nameBold: {
    fontWeight: "700"
  },
  thankText: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: "OpenSans-Regular",
    fontWeight: "600"
  },
  imgView: {
    justifyContent: "center",
    alignItems: "center"
  },
  row: {
    flexDirection: "row"
  },
  btnContainer: {
    paddingTop: 10
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
