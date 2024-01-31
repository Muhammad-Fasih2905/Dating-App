import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Modal from "react-native-modal";
import { useTheme } from "react-native-paper";
import TICK from "../../assets/Images/tick-img.png";
import { useNavigation } from "@react-navigation/native";
import { HOME_PATH } from "../../Navigation/Routes";
function ThankYouModal({ visible, onClose, status }) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <Modal isVisible={visible} onBackdropPress={() => onClose()}>
      <View style={[styles.card, { backgroundColor: colors.white }]}>
        <View
          style={{
            backgroundColor: "#03FC1C",
            padding: 30,
            borderRadius: 50,
            marginBottom: 30,
          }}
        >
          <Image
            source={TICK}
            style={{ width: 32, height: 32, resizeMode: "contain" }}
          />
        </View>
        <View>
          <Text style={[styles.headingText, { color: colors.textLiteBlack }]}>
            Thank you
          </Text>
        </View>
        <View>
          <Text style={[styles.subPeriodTxt, { color: colors.textLiteBlack }]}>
            Your subscription period starts
          </Text>
          <View style={styles.subPeriodView}>
            <Text style={[styles.subPeriodDur]}>
              {status?.days_left} days are left
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ThankYouModal;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 40,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  headingText: {
    fontSize: 22,
    fontFamily: "OpenSans-SemiBold",
    marginBottom: 20,
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: "OpenSans-Regular",
    marginBottom: 20,
    textAlign: "center",
  },
  subPeriodTxt: {
    fontFamily: "OpenSans-Regular",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  subPeriodDur: {
    fontFamily: "OpenSans-Regular",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
    color: "#808080",
  },
  subPeriodView: {
    borderBottomWidth: 1,
    borderBottomColor: "#00000040",
    marginBottom: 10,
  },
});
