import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyStatusBar from "../../../Components/MyStatusBar";
import { useTheme } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenWrapper from "../../../Components/ScreenWrapper";
import ArrowPrevious from "../../../assets/Images/ArrowPrevious.png";
import { HOME_PATH, TERMS_CONDITION_PATH } from "../../../Navigation/Routes";
import { useNavigation } from "@react-navigation/native";

const PrivacyPolicy = ({ route }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const TextNormal = ({ txt, mrginBtm }) => {
    const textStyle = [styles.text, { color: colors.black80 }];

    if (mrginBtm == 0) {
      textStyle.push({ marginBottom: mrginBtm });
    }

    return <Text style={textStyle}>{txt}</Text>;
  };

  const TextBold = ({ txt, mrginBtm }) => {
    const textStyle = [
      styles.text,
      { color: colors.black80, fontWeight: "bold" },
    ];

    if (mrginBtm == 0) {
      textStyle.push({ marginBottom: mrginBtm });
    }

    return <Text style={textStyle}>{txt}</Text>;
  };

  const TextBullet = ({ txt, mrginBtm }) => {
    const textStyle = [styles.text, { color: colors.black80 }];

    if (mrginBtm == 0) {
      textStyle.push({ marginBottom: mrginBtm });
    }

    return (
      <View style={styles.row}>
        <View style={styles.bullet} />
        <Text style={textStyle}>{txt}</Text>
      </View>
    );
  };

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
          title="Privacy policy"
          onBackPress={() => navigation.navigate(HOME_PATH)}
        >
          <View
            style={{
              padding: 10,
              paddingHorizontal: 16,
              flex: 1,
              justifyContent: "space-between",
              backgroundColor: "#fff",
            }}
          >
            <View>
              <TextNormal
                txt="Protecting your private information is our priority. This
              Statement of Privacy applies to Snak Snak, and Snak-Snak Inc and
              governs data collection and usage. For the purposes of this
              Privacy Policy, unless otherwise noted, all references to
              Snak-Snak Inc include Snak Snak and snaksnakapp.com. The Snak
              Snak application is a Social networking application that allows
              users to connect based on time and availability application. By
              using the Snak Snak application, you consent to the data
              practices described in this statement."
              />

              <TextBold
                txt="Collection of your Personal Information"
                mrginBtm={0}
              />
              <TextNormal
                txt="In order to better provide you with products and services
                offered, Snak Snak may collect personally identifiable
                information, such as your:"
              />
              <TextNormal txt="- First and Last Name" mrginBtm={0} />
              <TextNormal txt="- E-mail Address" mrginBtm={0} />
              <TextNormal txt="- Phone Number" mrginBtm={0} />
              <TextNormal txt="- Job Title" mrginBtm={0} />
              <TextNormal txt="- Age, Gender" />

              <TextNormal
                txt="If you purchase Snak Snak's products and services, we collect
                billing and credit card information."
                mrginBtm={0}
              />
              <TextNormal txt="This information is used to complete the purchase transaction." />

              <TextNormal
                txt="Snak Snak may also collect anonymous demographic information,
                which is not unique to you, such as your:"
              />

              <TextNormal txt="- Age" mrginBtm={0} />
              <TextNormal txt="- Gender" />

              <TextNormal
                txt="We do not collect any personal information about you unless you
                voluntarily provide it to us. However, you may be required to
                provide certain personal information to us when you elect to use
                certain products or services. These may include: (a) registering
                for an account; (b) entering a sweepstakes or contest sponsored
                by us or one of our partners; (c) signing up for special offers
                from selected third parties; (d) sending us an email message;
                (e) submitting your credit card or other payment information
                when ordering and purchasing products and services. To wit, we
                will use your information for, but not limited to, communicating
                with you in relation to services and/or products you have
                requested from us. We also may gather additional personal or
                non-personal information in the future."
              />

              <TextBold txt="Use of your Personal Information" mrginBtm={0} />
              <TextNormal
                txt="Snak Snak collects and uses your personal information to operate
                and deliver the services you have requested."
              />

              <TextNormal
                txt="Snak Snak may also use your personally identifiable information
                to inform you of other products or services available from Snak
                Snak and its affiliates."
              />

              <TextBold
                txt="haring Information with Third Parties"
                mrginBtm={0}
              />
              <TextNormal
                txt="Snak Snak does not sell, rent or lease its customer lists to
                third parties."
              />
              <TextNormal
                txt="Snak Snak may share data with trusted partners to help perform
                statistical analysis, send you email or postal mail, provide
                customer support, or arrange for deliveries. All such third
                parties are prohibited from using your personal information
                except to provide these services to Snak Snak, and they are
                required to maintain the confidentiality of your information."
              />
              <TextNormal
                txt="Snak Snak may disclose your personal information, without
                notice, if required to do so by law or in the good faith belief
                that such action is necessary to: (a) conform to the edicts of
                the law or comply with legal process served on Snak Snak or the
                site; (b) protect and defend the rights or property of Snak
                Snak; and/or (c) act under exigent circumstances to protect the
                personal safety of users of Snak Snak, or the public."
              />

              <TextBold txt="Right to Deletion" mrginBtm={0} />
              <TextNormal
                txt="Subject to certain exceptions set out below, on receipt of a
                verifiable request from you, we will:"
              />

              <TextBullet
                txt="Delete your personal information from our records; and"
                mrginBtm={0}
              />
              <TextBullet txt="Direct any service providers to delete your personal information from their records." />

              <TextNormal
                txt="Please note that we may not be able to comply with requests to delete your personal information if it is necessary to:"
                mrginBtm={0}
              />
              <TextBullet
                txt="Complete the transaction for which the personal information was collected, fulfill the terms of a written warranty or product recall conducted in accordance with federal law, provide a good or service requested by you, or reasonably anticipated within the context of our ongoing business relationship with you, or otherwise perform a contract between you and us;"
                mrginBtm={0}
              />
              <TextBullet
                txt="Detect security incidents, protect against malicious, deceptive,fraudulent, or illegal activity; or prosecute those responsible for that activity;"
                mrginBtm={0}
              />
              <TextBullet
                txt="Debug to identify and repair errors that impair existing intended functionality;"
                mrginBtm={0}
              />
              <TextBullet
                txt="Exercise free speech, ensure the right of another consumer to exercise his or her right of free speech, or exercise another right provided for by law;"
                mrginBtm={0}
              />
              <TextBullet
                txt="Comply with the California Electronic Communications Privacy Act;"
                mrginBtm={0}
              />
              <TextBullet
                txt="Engage in public or peer-reviewed scientific, historical, or statistical research in the public interest that adheres to all other applicable ethics and privacy laws, when our deletion of the information is likely to render impossible or seriously impair the achievement of such research, provided we have obtained your informed consent;"
                mrginBtm={0}
              />
              <TextBullet
                txt="Enable solely internal uses that are reasonably aligned with your expectations based on your relationship with us;"
                mrginBtm={0}
              />
              <TextBullet
                txt="Comply with an existing legal obligation; or"
                mrginBtm={0}
              />
              <TextBullet txt="Otherwise use your personal information, internally, in a lawful manner that is compatible with the context in which you provided the information." />

              <TextBold txt="Children Under Thirteen" mrginBtm={0} />
              <TextNormal txt="Snak Snak does not knowingly collect personally identifiable information from children under the age of thirteen. If you are under the age of thirteen, you must ask your parent or guardian for permission to use this application." />

              <TextBold txt="E-mail Communications" mrginBtm={0} />
              <TextNormal
                txt="From time to time, Snak Snak may contact you via email for the purpose of providing announcements, promotional offers, alerts, confirmations, surveys, and/or other general communication. In order to improve our Services, we may receive a notification when you open an 
                email from Snak Snak or click on a link therein."
              />
              <TextNormal txt="If you would like to stop receiving marketing or promotional communications via email from Snak Snak, you may opt out of such communications by _________________." />

              <TextBold txt="Changes to this Statement" mrginBtm={0} />
              <TextNormal txt="Snak Snak reserves the right to change this Privacy Policy from time to time. We will notify you about significant changes in the way we treat personal information by sending a notice to the primary email address specified in your account, by placing a prominent notice on our application, and/or by updating any privacy information. Your continued use of the application and/or Services available after such modifications will constitute your: (a) acknowledgment of the modified Privacy Policy; and (b) agreement to abide and be bound by that Policy." />

              <TextBold txt="Contact Information" mrginBtm={0} />
              <TextNormal txt="Snak Snak welcomes your questions or comments regarding this Statement of Privacy. If you believe that Snak Snak has not adhered to this Statement, please contact Snak Snak at:" />

              <TextNormal
                txt={`Snak-Snak Inc\n273 E 3rd st apt 8w\nNEW YORK, New York 10009\n\n\nEmail Address:\nmatzollsd@gmail.com\n\nTelephone number:\n7753549223\n\nEffective as of July 11, 2022 `}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(TERMS_CONDITION_PATH)}
            >
              <View style={styles.privacyPolicy}>
                <Image
                  source={ArrowPrevious}
                  style={{
                    resizeMode: "contain",
                    marginTop: 2,
                    width: 15,
                    height: 15,
                  }}
                />
                <Text
                  style={[
                    styles.privacyPolicyText,
                    { color: "#800203", fontWeight: "700" },
                  ]}
                >
                  Terms and Condition
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScreenWrapper>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};
export default PrivacyPolicy;

const styles = StyleSheet.create({
  text: {
    // textAlign: "center",
    fontSize: 13,
    fontFamily: "OpenSans-Regular",
    fontWeight: "400",
    marginBottom: 15,
  },
  privacyPolicy: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  privacyPolicyText: {
    paddingLeft: 7,
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bullet: {
    height: 6,
    width: 6,
    borderRadius: 5,
    backgroundColor: "black",
    marginTop: 6,
    marginRight: 10,
  },
});
