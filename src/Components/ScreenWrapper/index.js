import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import HeaderLogo from "./HeaderLogo";
import HeaderLogo2 from "./HeaderLogo2";
import Header from "./../Header";
import ComponentWrapper from "./ComponentWrapper";
import HeaderProfileImage from "./HeaderProfileImage";
import Ionicons from "react-native-vector-icons/Ionicons";

const ScreenWrapper = ({
  children,
  title,
  componentTitle,
  isLogo = true,
  titleLong,
  logoHeight,
  componentIcon,
  hasBottomBar,
  logo2 = false,
  isProfileImage = false,
  searchBar,
  containerStyle,
  bgColor,
  viewAsButton,
  onBackPress,
  isSignup,
}) => {
  const { colors } = useTheme();

  const primaryColor = colors.primary;
  return (
    <View style={[styles.container, { backgroundColor: primaryColor }]}>
      {isLogo ? (
        !logo2 ? (
          <>
            <Header onBackPress={onBackPress} />
            <HeaderLogo title={title} logoHeight={logoHeight} />
          </>
        ) : (
          <>
            <HeaderLogo2
              isSignup={isSignup}
              title={title}
              logoHeight={logoHeight}
            />

            {viewAsButton && (
              <View
                style={{
                  paddingHorizontal: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={{ color: "#FFF", fontSize: 17, marginRight: 10 }}>
                  View as
                </Text>
                <Ionicons
                  name="eye-outline"
                  style={{ color: "#FFF", fontSize: 22 }}
                />
              </View>
            )}
          </>
        )
      ) : isProfileImage ? (
        <>
          <HeaderProfileImage />
          {Boolean(searchBar) && searchBar}
        </>
      ) : (
        <>
          <Header title={title} />
        </>
      )}

      <ComponentWrapper
        componentTitle={componentTitle}
        hasBottomBar={hasBottomBar}
        componentIcon={componentIcon}
        radius={!Boolean(titleLong)}
        containerStyle={containerStyle}
      >
        {children}
      </ComponentWrapper>
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
