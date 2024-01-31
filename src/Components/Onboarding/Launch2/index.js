import React, { Component } from "react"
import { Text, View, Image, TouchableOpacity } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import CircleWhite from "../../../assets/svgs/Images/circle-white.svg"
import CircleFilled from "../../../assets/svgs/Images/circle-fill.svg"
import { styles } from "./styles"
import MyStatusBar from "../../../Components/MyStatusBar"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import PrimaryButton from "../../Buttons/PrimaryButton"
import { useTheme } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { WELCOME_PATH } from "../../../Navigation/Routes"
const Onboarding = ({ isActive, onIndicatorPress }) => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  return (
    <SafeAreaProvider>
      <MyStatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
      >
        <View style={[styles.container, { backgroundColor: colors.primary }]}>
          {/* <Onboarding2 height={'100%'} style={{position:'absolute', bottom:0, backgroundColor:'blue'}} /> */}
          <Image
            style={styles.logoStyle}
            source={require("../../../assets/Images/Logo.png")}
          />
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={styles.title}>
              PROFFESSIONAL | SPORT | FRIENDLY | ROMANTIC
            </Text>
            <Text style={styles.subTitle}>
              Begin by selecting Professional, Sport, Friendly or Romantic and
              your desired time frame to see who is available in your area for a
              SNAk. Whatever you feel like doing today, from a midday tennis
              match to drinks after work with professionals in your industry,
              SNAk SNAk will connect you with individuals that have the same
              idea in mind.
            </Text>
          </View>

          <View style={styles.bottomView}>
            <View style={styles.btnContainer}>
              <PrimaryButton
                text="Get Started"
                onPress={() => navigation.navigate(WELCOME_PATH)}
              />
            </View>
            <View style={styles.indicatorView}>
              <TouchableOpacity
                onPress={() => onIndicatorPress(0)}
                style={styles.shadow}
              >
                <CircleWhite />
              </TouchableOpacity>
              <View style={styles.spaceBetween} />
              <View style={styles.shadow}>
                <CircleFilled />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  )
}
export default Onboarding
