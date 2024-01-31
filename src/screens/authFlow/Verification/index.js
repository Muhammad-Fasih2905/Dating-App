import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyStatusBar from "../../../Components/MyStatusBar";
import Header from "../../../Components/Header";
import { useTheme, Card } from "react-native-paper";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenWrapper from "../../../Components/ScreenWrapper";
import { useNavigation } from "@react-navigation/native";
import {
  AUTH_PATH,
  CREATE_PROFILE_PATH,
  VERIFICATION_PATH,
} from "../../../Navigation/Routes";
import VerificationInput from "../../../Components/Inputs/VerificationInput";
import { useDispatch } from "react-redux";
import { ADD_USER } from "../../../Redux/types";
import useLogicAuth from "../Hooks/useLogicAuth";
const Verification = ({ route }) => {
  const navigation = useNavigation();
  const type = route?.params?.type;
  const phoneNo = route?.params?.phoneNo;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const { verifyOTP, loading } = useLogicAuth();

  const handleLogin = () => {
    verifyOTP(code, phoneNo, type);
  };

  return (
    <SafeAreaProvider>
      <MyStatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
      >
        <ScreenWrapper
          isMiniLogo={false}
          logoHeight={100}
          title={`Code is sent to ${phoneNo}`}
          onBackPress={() => navigation.navigate(AUTH_PATH)}
        >
          <View style={[styles.textContainer, { marginTop: 12 }]}>
            <Text style={[styles.text, { color: "rgba(0, 0, 0, 0.6)" }]}>
              Didn't receive code?
            </Text>
            <TouchableOpacity>
              <Text
                style={[styles.text, { color: "#800203" }]}
                onPress={navigation.goBack}
              >
                {` Request again`}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <VerificationInput value={code} onChange={setCode} />
          </View>
          <Card elevation={5} style={styles.cardContainer}>
            <View style={styles.card}>
              <View style={styles.flex}>
                <PrimaryButton
                  text={
                    type !== "signup"
                      ? "Verify and Login"
                      : "Verify and Create Account"
                  }
                  height={70}
                  onPress={() => handleLogin()}
                  loading={loading}
                />
              </View>
            </View>
          </Card>
        </ScreenWrapper>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};
export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontFamily: "OpenSans-Bold",
    textAlign: "center",
  },
  card: {
    padding: 10,
    flexDirection: "row",
    paddingVertical: 15,
  },
  cardContainer: {
    marginTop: 35,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,

    elevation: 18,
    marginHorizontal: 5,
  },
  flex: {
    flex: 1,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
