import React, { Component } from "react"
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import CircleWhite from "../../../assets/svgs/Images/circle-white.svg"
import CircleFilled from "../../../assets/svgs/Images/circle-fill.svg"
import { styles } from "./styles"
import { Button } from "react-native-paper"
import MyStatusBar from "../../../Components/MyStatusBar"
// import ELLIPSE_IMAGE from "./../../../assets/Images/Ellipse.png"
import ELLIPSE_IMAGE from "./../../../assets/Images/onboarding-slide-1-img.png"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useTheme } from "react-native-paper"
const Onboarding = ({ isActive, onIndicatorPress }) => {
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
          <View
            flex={2}
            style={{
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            <Image
              style={styles.logoStyle}
              source={require("../../../assets/Images/Logo.png")}
            />
            <View style={styles.imageContainer}>
              <Image source={ELLIPSE_IMAGE} style={[styles.imageSlide1]} />
            </View>
            <View style={{ paddingHorizontal: 20, marginTop: -20 }}>
              <Text style={styles.title}>WELCOME TO SNAk SNAk</Text>
              <Text style={styles.subTitle}>
                Created to grow your social circle by curating in person
                connections with individuals that have similar interests based
                on activities and availability.
              </Text>
            </View>
          </View>
          <View flex={1} style={{ justifyContent: "center" }}>
            <View style={styles.indicatorView}>
              <View style={styles.shadow}>
                <CircleFilled />
              </View>
              <View style={styles.spaceBetween} />
              <TouchableOpacity
                onPress={() => onIndicatorPress(1)}
                style={styles.shadow}
              >
                <CircleWhite />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  )
}
export default Onboarding
