import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import MyStatusBar from "../../../Components/MyStatusBar";
import { useTheme } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenWrapper from "../../../Components/ScreenWrapper";
import HeaderBottom from "../../../Components/ScreenWrapper/HeaderBottom";
import ThankYouModal from "../../../Components/Modals/ThankYouModal";
import { SUBSCRIPTION_PATH } from "../../../Navigation/Routes";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import {
  useStripe,
  CardField,
  createToken,
  createPaymentMethod,
} from "@stripe/stripe-react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { GET_MY_PROFILE } from "../../../Constant";
import { ADD_USER } from "../../../Redux/types";

const Payment = ({ route }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [cardNumber, setCardNumber] = useState("");
  const [expiryData, setExpiryData] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [thankYouModal, setThankYou] = useState(false);
  const [responseStatus, setResponseStatus] = useState("");

  const user = useSelector((state) => state.userReducer.user);
  const auhToken = useSelector((state) => state.userReducer.accessToken);

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const dispatch = useDispatch();

  const handlePayment = async () => {
    console.log("handlePayment");
    try {
      setLoading(true);

      const source = await stripe.createSource({
        type: "card",
        card: {
          number: cardNumber,
          exp_month: parseInt(expiryData.split("/")[0]),
          exp_year: parseInt(expiryData.split("/")[1]),
          cvc: cvv,
        },
      });

      if (source.error) {
        // Handle error
        console.error("Error creating source:", source.error);
      } else {
        // At this point, you can send the `source.id` to your server for processing
        console.log("Source ID:", source);

        // Set 'thankYouModal' to true or navigate to a success page
        setThankYou(true);
      }

      // const { paymentMethod, error } = await stripe.createPaymentMethod({
      //   type: "Card",
      //   card: {
      //     number: cardNumber,
      //     expMonth: parseInt(expiryData.split("/")[0]),
      //     expYear: parseInt(expiryData.split("/")[1]),
      //     cvc: cvv,
      //   },
      // });

      // if (error) {
      //   // Handle error
      //   console.error("Error creating Payment Method:", error);
      // } else {
      //   // At this point, you can send the `paymentMethod.id` to your server for processing
      //   console.log("Payment Method ID:", paymentMethod);

      //   // Set 'thankYouModal' to true or navigate to a success page
      //   setThankYou(true);
      // }

      // Create a payment method
      // const paymentMethod = await createPaymentMethod({
      //   // type: "Card",
      //   // card: {
      //   //   number: cardNumber,
      //   //   expMonth: parseInt(expiryData.split("/")[0]),
      //   //   expYear: parseInt(expiryData.split("/")[1]),
      //   //   cvc: cvv,
      //   //   paymentMethodType: "card",
      //   // },

      //   type: "card",
      //   card: {
      //     number: cardNumber,
      //     expMonth: parseInt(expiryData.split("/")[0]),
      //     expYear: parseInt(expiryData.split("/")[1]),
      //     cvc: cvv,
      //     payment_method_types: ["card"],
      //     paymentMethodType: ["card"],
      //   },
      // });

      // console.log("Payment token:", paymentMethod);
      // Create a payment token
      // const token = await stripe.createToken({
      //   type: "card",
      //   card: paymentMethod.paymentMethod.id,
      // });

      // Now you can send the token to your server for further processing
      // console.log("Payment token:", token);

      // Set state or navigate to a thank you screen
      // setThankYou(true);
    } catch (error) {
      // Handle errors
      console.error("Error creating payment method:", error);
      console.log("Stripe error response:", error.response);
      // Alert.alert("Error", "An error occurred while processing the payment.");
    } finally {
      setLoading(false);
    }

    // try {
    // setLoading(true);
    //   const data = await confirmPayment({
    //     type: "Card",
    //     card: {
    //       number: cardNumber,
    //       expMonth: parseInt(expiryData.split("/")[0]),
    //       expYear: parseInt(expiryData.split("/")[1]),
    //       cvc: cvv,
    //     },
    //   });

    //   if (data.paymentIntent) {
    //     const paymentIntentId = data.paymentIntent.id;
    //     console.log("Payment Intent ID:", paymentIntentId);
    //     // You can now use the paymentIntentId for further processing
    //   } else {
    //     console.log("Payment Confirmation Data:", data);
    //   }
    // } catch (error) {
    //   console.error("Error confirming payment:", error);
    //   // Handle error cases here
    // } finally {
    //   setLoading(false);
    // }

    // const cardDetails = {
    //   number: cardNumber,
    //   expMonth: parseInt(expiry.split("/")[0]),
    //   expYear: parseInt(expiry.split("/")[1]),
    //   cvc,
    // };

    // try {
    //   const { clientSecret } = await createPaymentIntent(); // Your server-side function to create a payment intent
    //   const result = await confirmPayment(clientSecret, {
    //     type: "Card",
    //     billingDetails: {
    //       address: {
    //         line1: "123 Main St",
    //         city: "City",
    //         postalCode: "12345",
    //         state: "State",
    //         country: "Country",
    //       },
    //     },
    //     paymentMethodDetails: {
    //       type: "Card",
    //       card: cardDetails,
    //     },
    //   });

    //   // Handle payment success or failure
    //   if (result.error) {
    //     console.error(result.error.message);
    //   } else {
    //     console.log("Payment successful:", result);
    //   }
    // } catch (error) {
    //   console.error("Error processing payment:", error);
    // }
  };

  // Test Stripe Card Field
  const [params, setParams] = useState({});
  const _onChange = (formData) => {
    if (formData.complete) {
      setParams(formData);
    } else {
      setParams({});
    }
  };

  const onSave = async () => {
    setLoading(true);
    try {
      const token = await createToken({
        ...params,
        type: "Card",
      });

      if (token && token.token.id) {
        // create customer
        let data = {
          fullname: user?.name,
          cust_email: user?.email,
        };

        const customerResponse = await axios.post(
          "https://snaksnak-new-35878.botics.co/api/payments/api/create-customer/",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auhToken,
            },
          }
        );

        let paymentData = {
          stripeToken: token?.token?.id,
          name: "dev",
          last4: "4242",
          exp_month: 12,
          exp_year: 25,
          subscription_plan:
            route.params.package === "Starter Month" ? "starter" : "advance",
          subscription_period:
            route.params.package === "Starter Month" ? "monthly" : "yearly",
        };
        if (customerResponse?.data) {
          const paymentResponse = await axios.post(
            "https://snaksnak-new-35878.botics.co/api/payments/api/attach-card-and-pay/",
            paymentData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + auhToken,
              },
            }
          );

          let test = {
            ...user,
            subscription_info: paymentResponse?.data?.subscription_info || {},
          };

          // dispatch({ type: ADD_USER, payload: test });
          console.log("Succuess Payment ==> ", test);
          // if (paymentResponse?.data) {
          //   getMyProfile();
          // }
          setResponseStatus(paymentResponse?.data);
        }
      }
      setLoading(false);
      setThankYou(true);
    } catch (e) {
      console.log("save credit card", e);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Select Package!",
      });
      setLoading(false);
    }
  };

  const onCloseThanks = () => {
    setThankYou(false);
    navigation.navigate(SUBSCRIPTION_PATH);
  };

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
            searchBar={
              <HeaderBottom title={"Payment"} back={SUBSCRIPTION_PATH} />
            }
          >
            <View style={styles.container}>
              {/* Subscription Plan Text */}
              <View>
                <Text
                  style={[styles.headingText, { color: colors.textLiteBlack }]}
                >
                  Select payment method
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

              {/* CARD Details Box */}
              <View
                style={[styles.inviteView, { backgroundColor: colors.primary }]}
              >
                {/* Heading */}
                {/* <View style={styles.headingView}>
                  <Text style={[styles.inviteBtn, { color: colors.white }]}>
                    Credit/debit card
                  </Text>
                </View> */}

                {/* Card Number */}
                {/* <ImageInput
                  placeholder={"Card Number"}
                  onChangeText={setCardNumber}
                  value={cardNumber}
                  style={{
                    fontSize: 16,
                    // height: "100%",
                    marginBottom: 5,
                    width: "90%",
                  }}
                  underlineColorAndroid="transparent"
                  theme={{
                    colors: {
                      text: "rgba(0, 0, 0, 0.7)",
                      background: colors.white,
                    },
                    roundness: 12,
                  }}
                  outlineColor={colors.white}
                  activeOutlineColor={colors.white}
                  mode="outlined"
                  imageStyle={{ width: 20, height: 20, resizeMode: "contain" }}
                  imagePath={MASTERCARD}
                /> */}

                {/* Expiry & CVV Number */}
                {/* <View style={styles.inputView}>
                  <View style={styles.inputContainer}>
                    <SimpleInput
                      value={expiryData}
                      onChangeText={setExpiryData}
                      placeholder={"Expiry Date"}
                      dense
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <SimpleInput
                      value={cvv}
                      onChangeText={setCvv}
                      placeholder={"CVV"}
                      dense
                    />
                  </View>
                </View> */}

                {/* Card Holder */}
                {/* <View style={styles.inputView}>
                  <View style={styles.inputContainerFull}>
                    <SimpleInput
                      value={cardHolder}
                      onChangeText={setCardHolder}
                      placeholder={"Card Holder"}
                      dense
                    />
                  </View>
                </View> */}

                {/* Country */}
                {/* <View style={styles.countryPickerView}>
                  <CountryPicker
                    {...{
                      countryCode,
                      onSelect,
                      withFilter: true,
                      withFlag: true,
                      withCountryNameButton: true,
                      withAlphaFilter: true,
                      withCallingCode: true,
                      withEmoji: true,
                    }}
                    theme={{
                      onBackgroundTextColor: colors.primaryLite,
                    }}
                    visible={country}
                    containerButtonStyle={{ color: "white" }}
                  />
                  <View style={styles.planIcon}>
                    <MaterialIcons
                      name="keyboard-arrow-down"
                      size={20}
                      color="#FF5757"
                    />
                  </View>
                </View> */}
              </View>

              <CardField
                postalCodeEnabled={false}
                placeholders={{
                  number: "4242 4242 4242 4242",
                }}
                cardStyle={{
                  backgroundColor: "#FFFFFF",
                  textColor: "#000000",
                }}
                style={{
                  width: "100%",
                  height: 50,
                  marginVertical: 30,
                }}
                onCardChange={(cardDetails) => {
                  // console.log("cardDetails", cardDetails);
                  _onChange(cardDetails);
                }}
                onFocus={(focusedField) => {
                  // console.log("focusField", focusedField);
                }}
                zip
              />

              {/* Pay and Cancel Button */}
              <View style={styles.bottomBtn}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(SUBSCRIPTION_PATH)}
                  style={[styles.cancelView, { backgroundColor: colors.white }]}
                >
                  <Text
                    style={[
                      styles.cancelBtn,
                      styles.fontFamilyOpenSans,
                      { color: colors.textLiteBlack },
                    ]}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onSave}
                  style={[styles.payView, { backgroundColor: colors.primary }]}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text
                      style={[
                        styles.payBtn,
                        styles.fontFamilyOpenSans,
                        { color: colors.white },
                      ]}
                    >
                      Pay
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </ScreenWrapper>
        </KeyboardAwareScrollView>
      </SafeAreaProvider>
      <ThankYouModal
        visible={thankYouModal}
        status={responseStatus}
        onClose={onCloseThanks}
      />
    </>
  );
};
export default Payment;
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
  inviteView: {
    borderRadius: 12,
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: 15,
    padding: 7,
    marginBottom: 20,
  },
  inviteBtn: {
    // padding:15,
    fontSize: 16,
    fontWeight: "600",
  },
  cancelBtn: {
    padding: 10,
    fontSize: 16,
    fontWeight: "700",
  },
  payBtn: {
    padding: 10,
    fontSize: 16,
    fontWeight: "700",
  },
  cancelView: {
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
  fontFamilyOpenSans: {
    fontFamily: "Open Sans",
  },
  headingView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  planIcon: {
    backgroundColor: "#FF575726",
    height: 20,
    width: 20,
  },
  inputContainer: {
    width: "49%",
  },
  inputContainerFull: {
    width: "100%",
  },
  inputView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  countryPickerView: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    height: 60,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  bottomBtn: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
