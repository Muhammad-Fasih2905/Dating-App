import React from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import MyStatusBar from "../../../Components/MyStatusBar"
import { useTheme } from "react-native-paper"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import ScreenWrapper from "../../../Components/ScreenWrapper"
import HeaderBottom from "../../../Components/ScreenWrapper/HeaderBottom"
import BottomNavigator from "../../../Components/Navigation/BottomNavigator"
import ToggleLabelButton from "../../../Components/Buttons/ToggleLabelButton"
import RoundSideButton from "../../../Components/Buttons/RoundSideButton"
import LOGOUT_IMAGE from "../../../assets/Images/Navigation/logout.png"
import { ADD_USER, OTP_VERIFY_SUCCESS } from "../../../Redux/types"
import { useDispatch } from "react-redux"
import {
  BLOCKED_ACCOUNT_PATH,
  TERMS_CONDITION_PATH,
  PRIVACY_POLICY_PATH,
  DELETE_ACCOUNT_PATH
} from "../../../Navigation/Routes"
import { useNavigation } from "@react-navigation/native"
import useSettings from "./Hooks/useSettings"

const Settings = ({ route }) => {
  const { settingsObj, setSettingsObj } = useSettings()
  const { colors } = useTheme()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch({ type: ADD_USER, payload: false })
    dispatch({ type: OTP_VERIFY_SUCCESS, payload: { token: null, phone: "" } })
  }
  return (
    <>
      <SafeAreaProvider>
        <MyStatusBar
          backgroundColor={colors.primary}
          barStyle="light-content"
        />
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <ScreenWrapper
            isMiniLogo={true}
            logoHeight={100}
            isLogo={false}
            isProfileImage
            searchBar={<HeaderBottom title={"Settings"} />}
          >
            {/* Notifications */}
            <View style={styles.container}>
              <Text style={styles.headingText}>Notifications</Text>
              <View style={styles.toggle}>
                <ToggleLabelButton
                  containerStyle={styles.toggleContainer}
                  text="Receive notification of snak invites"
                  isOn={settingsObj.snak_invite_notification}
                  onColor={colors.primary}
                  offColor={colors.lightGrey3}
                  lableStyle={[
                    styles.toggleLableStyle,
                    { color: colors.black }
                  ]}
                  // loading
                  toggleFunc={() =>
                    setSettingsObj({
                      ...settingsObj,
                      snak_invite_notification:
                        !settingsObj.snak_invite_notification
                    })
                  }
                />
              </View>
              <View style={styles.toggle}>
                <ToggleLabelButton
                  containerStyle={styles.toggleContainer}
                  text="Receive notification of meeting reminder"
                  isOn={settingsObj.meeting_reminder_notification}
                  onColor={colors.primary}
                  offColor={colors.lightGrey3}
                  lableStyle={[
                    styles.toggleLableStyle,
                    { color: colors.black }
                  ]}
                  // loading
                  toggleFunc={() =>
                    setSettingsObj({
                      ...settingsObj,
                      meeting_reminder_notification:
                        !settingsObj.meeting_reminder_notification
                    })
                  }
                />
              </View>
              <View style={styles.toggle}>
                <ToggleLabelButton
                  containerStyle={styles.toggleContainer}
                  text="Receive notification of canceled meeting"
                  isOn={settingsObj.meeting_canceled_notification}
                  onColor={colors.primary}
                  offColor={colors.lightGrey3}
                  lableStyle={[
                    styles.toggleLableStyle,
                    { color: colors.black }
                  ]}
                  // loading
                  toggleFunc={() =>
                    setSettingsObj({
                      ...settingsObj,
                      meeting_canceled_notification:
                        !settingsObj.meeting_canceled_notification
                    })
                  }
                />
              </View>
              <View style={styles.toggle}>
                <ToggleLabelButton
                  containerStyle={styles.toggleContainer}
                  text="Receive notification of deleted meeting"
                  isOn={settingsObj.meeting_deleted_notification}
                  onColor={colors.primary}
                  offColor={colors.lightGrey3}
                  lableStyle={[
                    styles.toggleLableStyle,
                    { color: colors.black }
                  ]}
                  // loading
                  toggleFunc={() =>
                    setSettingsObj({
                      ...settingsObj,
                      meeting_deleted_notification:
                        !settingsObj.meeting_deleted_notification
                    })
                  }
                />
              </View>
              <View style={styles.toggle}>
                <ToggleLabelButton
                  containerStyle={styles.toggleContainer}
                  text="Receive notification of meeting update"
                  isOn={settingsObj.meeting_updated_notification}
                  onColor={colors.primary}
                  offColor={colors.lightGrey3}
                  lableStyle={[
                    styles.toggleLableStyle,
                    { color: colors.black }
                  ]}
                  // loading
                  toggleFunc={() =>
                    setSettingsObj({
                      ...settingsObj,
                      meeting_updated_notification:
                        !settingsObj.meeting_updated_notification
                    })
                  }
                />
              </View>
            </View>
            <View style={styles.horizontalRule} />
            {/* Connections */}
            <View style={styles.container}>
              <Text style={styles.headingText}>Connections</Text>
              <View style={styles.toggle}>
                <ToggleLabelButton
                  containerStyle={styles.toggleContainer}
                  text="Hide your profile"
                  isOn={settingsObj.hide_profile}
                  onColor={colors.primary}
                  offColor={colors.lightGrey3}
                  lableStyle={[
                    styles.toggleLableStyle,
                    { color: colors.black }
                  ]}
                  // loading
                  toggleFunc={() =>
                    setSettingsObj({
                      ...settingsObj,
                      hide_profile: !settingsObj.hide_profile
                    })
                  }
                />
              </View>
              <View style={styles.buttonParent}>
                <Text
                  style={[styles.toggleLableStyle, { color: colors.black }]}
                >
                  Blocked Accounts
                </Text>
                <RoundSideButton
                  containerStyle={styles.btnContainer}
                  text="View"
                  textStyle={styles.btnTextStyle}
                  onPress={() => navigation.navigate(BLOCKED_ACCOUNT_PATH)}
                  // loading
                />
              </View>
            </View>
            <View style={styles.horizontalRule} />
            {/* Subscription */}
            <View style={styles.container}>
              <Text style={styles.headingText}>Subscription</Text>
              <View style={styles.buttonParent}>
                <Text
                  style={[styles.toggleLableStyle, { color: colors.black }]}
                >
                  Current subscription details
                </Text>
                <RoundSideButton
                  containerStyle={styles.btnContainer}
                  text="View"
                  textStyle={styles.btnTextStyle}
                  onPress={() => console.log("View")}
                  // loading
                />
              </View>
              <View style={styles.buttonParent}>
                <Text
                  style={[styles.toggleLableStyle, { color: colors.black }]}
                >
                  Manage subscription
                </Text>
                <Text style={[styles.VIPTextStyle, { color: colors.primary }]}>
                  VIP{" "}
                  <Text style={{ color: colors.primaryText, fontSize: 12 }}>
                    $150 /month
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.horizontalRule} />
            {/* Privacy */}
            <View style={styles.container}>
              <Text style={styles.headingText}>Privacy</Text>
              <View style={styles.buttonParent}>
                <Text
                  style={[styles.toggleLableStyle, { color: colors.black }]}
                >
                  Privacy policy
                </Text>
                <RoundSideButton
                  containerStyle={styles.btnContainer}
                  text="View"
                  textStyle={styles.btnTextStyle}
                  onPress={() => navigation.navigate(PRIVACY_POLICY_PATH)}
                  // loading
                />
              </View>
              <View style={styles.buttonParent}>
                <Text
                  style={[styles.toggleLableStyle, { color: colors.black }]}
                >
                  Terms and condition
                </Text>
                <RoundSideButton
                  containerStyle={styles.btnContainer}
                  text="View"
                  textStyle={styles.btnTextStyle}
                  onPress={() => navigation.navigate(TERMS_CONDITION_PATH)}
                  // loading
                />
              </View>
              <View style={styles.buttonParent}>
                <Text
                  style={[styles.toggleLableStyle, { color: colors.black }]}
                >
                  Delete account
                </Text>
                <RoundSideButton
                  containerStyle={styles.btnContainer}
                  text="View"
                  textStyle={styles.btnTextStyle}
                  onPress={() => navigation.navigate(DELETE_ACCOUNT_PATH)}
                  // loading
                />
              </View>
            </View>
            <View style={styles.horizontalRule} />
            <TouchableOpacity style={styles.logout} onPress={handleLogout}>
              <Text style={[styles.itemText, { color: colors.black }]}>
                Log Out
              </Text>
              <Image source={LOGOUT_IMAGE} style={styles.icon} />
            </TouchableOpacity>
          </ScreenWrapper>
        </KeyboardAwareScrollView>
      </SafeAreaProvider>
      <BottomNavigator />
    </>
  )
}
export default Settings
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  headingText: {
    fontSize: 14,
    fontFamily: "OpenSans-SemiBold",
    marginBottom: 20
  },
  toggle: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 20
  },
  buttonParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  toggleLableStyle: {
    fontFamily: "OpenSans-Regular",
    marginHorizontal: 0
  },
  VIPTextStyle: {
    fontFamily: "OpenSans-Bold",
    marginHorizontal: 0,
    fontSize: 20
  },
  horizontalRule: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: 10
  },
  btnContainer: {
    backgroundColor: "#800203",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50
  },
  btnTextStyle: {
    fontWeight: "700",
    fontFamily: "OpenSans-Regular",
    fontSize: 12,
    marginHorizontal: 10
  },
  icon: {
    width: 40,
    height: 40
  },
  itemText: {
    fontSize: 20,
    fontFamily: "OpenSans-Light"
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "flex-end"
  }
})
