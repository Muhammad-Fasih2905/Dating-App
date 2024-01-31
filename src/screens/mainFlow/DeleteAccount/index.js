import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyStatusBar from "../../../Components/MyStatusBar";
import { useTheme } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenWrapper from "../../../Components/ScreenWrapper";
import SimpleInput from "../../../Components/Inputs/SimpleInput";
import SAD_FACE from "../../../assets/Images/sad_face.svg";
import { useNavigation } from "@react-navigation/native";
import { HOME_PATH } from "../../../Navigation/Routes";

const DeleteAccount = () => {
  const { colors } = useTheme();
  const [message, setMessage] = useState("");
  const [thankYou, setThankYou] = useState(false);

  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <MyStatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <ScreenWrapper
          isMiniLogo={false}
          logoHeight={100}
          title="Delete account?"
          onBackPress={() => navigation.navigate(HOME_PATH)}
        >
          <View style={{ padding: 10 }}>
            <View style={styles.infoView}>
              {/* <View style={styles.infoTextView}> */}
              <Text style={[styles.infoText, { color: colors.black60 }]}>
                Information
              </Text>
              <Text style={[styles.infoText2, { color: colors.black60 }]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Consequat viverra bibendum tortor ac.
              </Text>
              {/* </View> */}
            </View>
            <Text style={[styles.feedbackText, { color: colors.black60 }]}>
              Feedback
            </Text>
            <View style={styles.inputContainer}>
              <SimpleInput
                value={message}
                onChangeText={setMessage}
                placeholder={"Text"}
                dense
                title="Reason for deleting account?"
                multiline
              />
            </View>
            <View style={styles.sureView}>
              <SAD_FACE />
              <Text style={[styles.sureText, { color: colors.primary }]}>
                Are you sure?
              </Text>
            </View>
            <View style={[styles.sendContainer, { marginBottom: 25 }]}>
              <TouchableOpacity
                onPress={() => setThankYou(true)}
                style={[styles.payView, { backgroundColor: colors.white }]}
              >
                <Text style={[styles.payBtn, { color: colors.primary }]}>
                  NO
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setThankYou(true)}
                style={[styles.payView, { backgroundColor: colors.white }]}
              >
                <Text style={[styles.payBtn, { color: colors.primary }]}>
                  YES
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScreenWrapper>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};
export default DeleteAccount;

const styles = StyleSheet.create({
  payView: {
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "45%",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  payBtn: {
    padding: 10,
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "OpenSans-Regular",
  },
  inputContainer: {
    marginHorizontal: 10,
    marginVertical: 7,
  },
  sendContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  infoView: {
    flexDirection: "column",
  },
  infoTextView: {
    width: "70%",
    padding: 10,
  },
  infoText: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    fontWeight: "700",
  },
  feedbackText: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    fontWeight: "700",
  },
  infoText2: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 12,
  },
  infoImgView: {
    width: "30%",
  },
  infoImg: {
    resizeMode: "contain",
    marginTop: 2,
  },
  sureView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  sureText: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "OpenSans-Regular",
    marginTop: 30,
  },
});
