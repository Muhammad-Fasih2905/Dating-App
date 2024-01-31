import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MyStatusBar from "../../../Components/MyStatusBar";
import { Card, useTheme, Checkbox } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenWrapper from "../../../Components/ScreenWrapper";
import HeaderBottom from "../../../Components/ScreenWrapper/HeaderBottom";
import ToggleLabelButton from "../../../Components/Buttons/ToggleLabelButton";
import { PAYMENT_PATH } from "../../../Navigation/Routes";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import Modal from "react-native-modal";

const Subscription = ({ route }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const user = useSelector((state) => state.userReducer.user);
  const screenHeight = Dimensions.get("window").height;
  const [yearChecked, setYearChecked] = useState(false);
  const [monthChecked, setMonthChecked] = useState(false);

  const [advanceYearChecked, setAdvanceYearChecked] = useState(false);
  const [advanceMonthChecked, setAdvanceMonthChecked] = useState(false);

  const [showStarterModal, setShowStarterModal] = useState(false);
  const [showAdvanceModal, setShowAdvanceModal] = useState(false);

  const [billType, setBillType] = useState(false);
  const handleYearCheckbox = () => {
    setYearChecked(!yearChecked);
    setMonthChecked(false);

    setAdvanceYearChecked(false);
    setAdvanceMonthChecked(false);

    setShowStarterModal(!showStarterModal);

    setBillType(true);
  };
  const handleMonthCheckbox = () => {
    setMonthChecked(!monthChecked);
    setYearChecked(false);

    setAdvanceYearChecked(false);
    setAdvanceMonthChecked(false);

    setShowStarterModal(!showStarterModal);

    setBillType(false);
  };

  const handleAdvanceYearCheckbox = () => {
    setYearChecked(false);
    setMonthChecked(false);

    setAdvanceYearChecked(!advanceYearChecked);
    setAdvanceMonthChecked(false);

    setShowAdvanceModal(!showAdvanceModal);

    setBillType(true);
  };
  const handleAdvanceMonthCheckbox = () => {
    setMonthChecked(false);
    setYearChecked(false);

    setAdvanceYearChecked(false);
    setAdvanceMonthChecked(!advanceMonthChecked);
    setShowAdvanceModal(!showAdvanceModal);

    setBillType(false);
  };

  const getCheckedState = () => {
    if (yearChecked) {
      return "Starter Year";
    } else if (monthChecked) {
      return "Starter Month";
    } else if (advanceYearChecked) {
      return "Advance Year";
    } else if (advanceMonthChecked) {
      return "Advance Month";
    } else {
      return "None";
    }
  };
  const handleChoose = () => {
    if (user?.subscription_info?.subscription_status === "active") {
      Toast.show({
        type: "success",
        text1: "Already Subscribe!",
        text2: "You already purchase a subscription",
      });
      return;
    }

    let result = getCheckedState();
    if (result === "None") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Select Package!",
      });
    } else {
      navigation.navigate(PAYMENT_PATH, { package: result });
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setYearChecked(false);
        setMonthChecked(false);
        setAdvanceYearChecked(false);
        setAdvanceMonthChecked(false);
        setShowStarterModal(false);
        setShowAdvanceModal(false);
      };
    }, [])
  );

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
            searchBar={<HeaderBottom title={"Subscription"} />}
          >
            <View style={styles.container}>
              {/* Subscription Plan Text */}
              <View>
                <Text
                  style={[styles.headingText, { color: colors.textLiteBlack }]}
                >
                  Select subscription plan
                </Text>
                <Text
                  style={[
                    styles.descriptionText,
                    { color: colors.textLiteBlack },
                  ]}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu
                  facilisis pellentesque odio sem accumsan, eu erat. Nunc turpis
                  morbi suspendisse dictum id tortor rhoncus mollis.
                </Text>
              </View>
              {/* Billing Toggle */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 15,
                }}
              >
                <Text
                  style={[
                    styles.fontFamilyOpenSans,
                    styles.billingTypeText,
                    { color: colors.textLiteBlack },
                  ]}
                >
                  Bill Monthly
                </Text>
                <ToggleLabelButton
                  containerStyle={styles.toggleContainer}
                  // text="Bill Monthly"
                  isOn={billType}
                  onColor={colors.primary}
                  offColor={colors.primary}
                />
                <Text
                  style={[
                    styles.fontFamilyOpenSans,
                    styles.billingTypeText,
                    { color: colors.textLiteBlack },
                  ]}
                >
                  Bill Yearly
                </Text>
              </View>

              {/* Starter Box */}
              <TouchableOpacity
                onPress={() => {
                  setShowStarterModal(true);
                }}
                style={styles.planBox}
              >
                <Text
                  style={[
                    styles.fontFamilyOpenSans,
                    styles.planText,
                    { color: colors.textLiteBlack },
                  ]}
                >
                  {}
                  Starter
                  {"\n"}
                  {monthChecked ? (
                    <Text style={{ fontSize: 14, fontWeight: "normal" }}>
                      monthly $25
                    </Text>
                  ) : yearChecked ? (
                    <Text style={{ fontSize: 14, fontWeight: "normal" }}>
                      yearly $300
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 14, fontWeight: "normal" }}>
                      select
                    </Text>
                  )}
                </Text>

                <View style={styles.planIcon}>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={20}
                    color="#FF5757"
                  />
                </View>
              </TouchableOpacity>

              {/* Advance Box */}
              <TouchableOpacity
                style={styles.planBox}
                onPress={() => {
                  setShowAdvanceModal(true);
                }}
              >
                <Text
                  style={[
                    styles.fontFamilyOpenSans,
                    styles.planText,
                    { color: colors.textLiteBlack },
                  ]}
                >
                  Advance
                  {"\n"}
                  {advanceMonthChecked ? (
                    <Text style={{ fontSize: 14, fontWeight: "normal" }}>
                      monthly $50
                    </Text>
                  ) : advanceYearChecked ? (
                    <Text style={{ fontSize: 14, fontWeight: "normal" }}>
                      yearly $600
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 14, fontWeight: "normal" }}>
                      select
                    </Text>
                  )}
                </Text>
                <View style={styles.planIcon}>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={20}
                    color="#FF5757"
                  />
                </View>
              </TouchableOpacity>

              {/* VIP Box */}
              <View
                style={[styles.inviteView, { backgroundColor: colors.primary }]}
              >
                <View style={styles.headingView}>
                  <Text style={[styles.inviteBtn, { color: colors.white }]}>
                    VIP
                  </Text>
                  <View
                    style={[styles.saveView, { backgroundColor: colors.white }]}
                  >
                    {user?.subscription_info?.subscription_status ===
                    "active" ? (
                      <Text style={[styles.saveBtn, { color: colors.primary }]}>
                        Already purchased
                      </Text>
                    ) : (
                      <Text style={[styles.saveBtn, { color: colors.primary }]}>
                        Save $35
                      </Text>
                    )}
                  </View>
                </View>
                <View>
                  <Text
                    style={[styles.vipDescriptionText, { color: colors.white }]}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Ullamcorper ut cursus sollicitudin rhoncus malesuada viverra
                    purus.
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={[
                        styles.chatBtnView,
                        { backgroundColor: colors.primary, width: "48%" },
                      ]}
                    >
                      <Text
                        style={[
                          styles.priceText,
                          styles.fontFamilyOpenSans,
                          { color: colors.white },
                        ]}
                      >
                        $150 /month
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={handleChoose}
                      style={[
                        styles.cancelView,
                        { backgroundColor: colors.white, width: "48%" },
                      ]}
                    >
                      <Text
                        style={[
                          styles.cancelBtn,
                          styles.fontFamilyOpenSans,
                          { color: colors.primary },
                        ]}
                      >
                        Choose
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScreenWrapper>
        </KeyboardAwareScrollView>

        {/* Starter Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showStarterModal}
          onBackdropPress={() => setShowStarterModal(false)}
        >
          <Card
            style={{
              backgroundColor: "#800203",
              paddingHorizontal: 10,
              borderRadius: 8,
              width: "100%",
            }}
          >
            <View>
              <View
                style={{
                  paddingVertical: 30,
                }}
              >
                <Card.Title
                  title="Monthly"
                  titleStyle={{ color: "#fff", fontWeight: "bold" }}
                  subtitle="25$"
                  subtitleStyle={{ fontSize: 16, color: "#fff" }}
                  left={(props) => (
                    <Checkbox.Android
                      color="#fff" // Set the color explicitly
                      name="same"
                      status={monthChecked ? "checked" : "unchecked"}
                      onPress={handleMonthCheckbox}
                    />
                  )}
                />
                <Card.Title
                  title="Yearly"
                  titleStyle={{ color: "#fff" }}
                  subtitle="300$"
                  subtitleStyle={{ fontSize: 16, color: "#fff" }}
                  left={(props) => (
                    <Checkbox.Android
                      display="displayLarge"
                      color="#fff" // Set the color explicitly
                      status={yearChecked ? "checked" : "unchecked"}
                      onPress={handleYearCheckbox}
                    />
                  )}
                />
              </View>
            </View>
          </Card>
        </Modal>

        {/* Advance modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showAdvanceModal}
          onBackdropPress={() => setShowAdvanceModal(false)}
        >
          <Card
            style={{
              backgroundColor: "#800203",
              paddingHorizontal: 10,
              borderRadius: 8,
              width: "100%",
            }}
          >
            {/* <View
                style={{
                  paddingTop: 20,
                  paddingHorizontal: 20,
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <AntDesign
                  name="close"
                  size={30}
                  onPress={() => {
                    setShowAdvanceModal(!showAdvanceModal);
                  }}
                />
              </View> */}
            <View style={{ paddingVertical: 30 }}>
              <Card.Title
                title="Monthly"
                titleStyle={{ color: "#fff", fontWeight: "bold" }}
                subtitle="50$"
                subtitleStyle={{ fontSize: 16, color: "#fff" }}
                left={(props) => (
                  <Checkbox.Android
                    color="#fff" // Set the color explicitly
                    status={advanceMonthChecked ? "checked" : "unchecked"}
                    onPress={handleAdvanceMonthCheckbox}
                  />
                )}
              />
              <Card.Title
                title="Yearly"
                titleStyle={{ color: "#fff", fontWeight: "bold" }}
                subtitle="600$"
                subtitleStyle={{ fontSize: 16, color: "#fff" }}
                left={(props) => (
                  <Checkbox.Android
                    display="displayLarge"
                    color="#fff" // Set the color explicitly
                    status={advanceYearChecked ? "checked" : "unchecked"}
                    onPress={handleAdvanceYearCheckbox}
                  />
                )}
              />
            </View>
          </Card>
        </Modal>
      </SafeAreaProvider>
    </>
  );
};
export default Subscription;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
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
  vipDescriptionText: {
    fontSize: 10,
    fontFamily: "OpenSans-Regular",
    marginBottom: 20,
    textAlign: "left",
  },
  toggle: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  buttonParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  toggleLableStyle: {
    fontFamily: "OpenSans-Regular",
    marginHorizontal: 0,
  },
  inviteView: {
    borderRadius: 12,
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    marginBottom: 20,
  },
  inviteBtn: {
    // padding:15,
    fontSize: 20,
    fontWeight: "600",
    marginRight: 10,
  },
  priceText: {
    // padding:15,
    fontSize: 12,
    fontWeight: "600",
  },
  saveView: {
    borderRadius: 8,
    flexDirection: "row",
  },
  saveBtn: {
    padding: 5,
    fontSize: 14,
    fontWeight: "600",
  },
  cancelBtn: {
    padding: 10,
    fontSize: 16,
    fontWeight: "700",
  },
  cancelView: {
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "49%",
  },
  chatBtnView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  fontFamilyOpenSans: {
    fontFamily: "Open Sans",
  },
  headingView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  planBox: {
    borderColor: "#DADADA",
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  planText: {
    fontSize: 20,
    fontWeight: "700",
  },
  planIcon: {
    backgroundColor: "#FF575726",
    height: 20,
    width: 20,
  },
  billingTypeText: {
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
