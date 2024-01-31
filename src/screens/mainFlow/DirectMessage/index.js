import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyStatusBar from "../../../Components/MyStatusBar";
import { useTheme } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenWrapper from "../../../Components/ScreenWrapper";
import HeaderBottom from "../../../Components/ScreenWrapper/HeaderBottom";
import ChatHeaderCard from "../../../Components/Cards/ChatHeaderCard";
import ChatMessageCard from "../../../Components/Cards/ChatMessageCard";
import ChatTextInput from "../../../Components/Inputs/ChatTextInput";
import { View } from "react-native";

const DirectMessage = ({ route }) => {
  const { colors } = useTheme();
  onPress = () => {
    console.log("This is onPress");
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
            searchBar={<HeaderBottom title={"Messages"} />}
          >
            {/* Chat Header */}
            <ChatHeaderCard />
            <View style={{ flex: 1 }}>
              {/* Chat Message */}
              <ChatMessageCard owner={true} message="Hey Zack.." time="17:44" />
              <ChatMessageCard
                owner={true}
                message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet duis eget massa scelerisque tincidunt scelerisque sit egestas."
                time="17:44"
              />
              <ChatMessageCard
                owner={false}
                message="Hey Sandra.."
                time="17:45"
              />
              <ChatMessageCard
                owner={false}
                message="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                time="17:46"
              />
              <ChatMessageCard
                owner={false}
                message="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                time="17:47"
              />
              <ChatMessageCard
                owner={false}
                message="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                time="17:47"
              />
            </View>

            {/* Chat Input */}
            <ChatTextInput />
          </ScreenWrapper>
        </KeyboardAwareScrollView>
      </SafeAreaProvider>
    </>
  );
};
export default DirectMessage;
