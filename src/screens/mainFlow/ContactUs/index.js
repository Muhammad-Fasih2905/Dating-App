import React, { useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyStatusBar from "../../../Components/MyStatusBar";
import { useTheme } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenWrapper from "../../../Components/ScreenWrapper";
import SimpleInput from "../../../Components/Inputs/SimpleInput";
import ContactUs from "../../../assets/Images/ContactUs.png";
import { useNavigation } from "@react-navigation/native";
import { HOME_PATH, WELCOME_PATH } from "../../../Navigation/Routes";

const ContactScreen = ({ route }) => {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const routeParams = route?.params;

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
          title="CONTACT US"
          onBackPress={() =>
            !routeParams
              ? navigation.navigate(HOME_PATH)
              : navigation.navigate(WELCOME_PATH)
          }
        >
          <View style={{ padding: 10 }}>
            <View style={styles.infoView}>
              <View style={styles.infoTextView}>
                <Text style={[styles.infoText, { color: colors.black60 }]}>
                  Please fill out the form
                </Text>
                <Text style={[styles.infoText2, { color: colors.black60 }]}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Consequat viverra bibendum tortor ac.
                </Text>
              </View>
              <View style={styles.infoImgView}>
                <Image source={ContactUs} style={styles.infoImg} />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <SimpleInput
                value={name}
                onChangeText={setName}
                placeholder={"Name"}
                dense
                title="Name"
              />
            </View>
            <View style={styles.inputContainer}>
              <SimpleInput
                value={message}
                onChangeText={setMessage}
                placeholder={"Text"}
                dense
                title="Message"
                multiline
              />
            </View>
            <View style={[styles.sendContainer, { marginBottom: 25 }]}>
              <TouchableOpacity
                // onPress={() => setThankYou(true)}
                onPress={() =>
                  !routeParams
                    ? navigation.navigate(HOME_PATH)
                    : navigation.navigate(WELCOME_PATH)
                }
                style={[styles.payView, { backgroundColor: colors.primary }]}
              >
                <Text style={[styles.payBtn, { color: colors.white }]}>
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScreenWrapper>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};
export default ContactScreen;

const styles = StyleSheet.create({
  payView: {
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "35%",

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
    justifyContent: "flex-end",
  },
  infoView: {
    flexDirection: "row",
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
});
