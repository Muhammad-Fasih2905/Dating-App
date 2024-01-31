import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyStatusBar from "../../../Components/MyStatusBar";
import { useTheme } from "react-native-paper";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenWrapper from "../../../Components/ScreenWrapper";
import SearchInput from "../../../Components/Inputs/SearchInput";
import REFRESH_IMAGE from "./../../../assets/Images/refresh.png";
import InviteCard from "../../../Components/Cards/InviteCard";
import BottomNavigator from "../../../Components/Navigation/BottomNavigator";
import InviteModal from "../../../Components/Modals/InviteModal";
import TabButton from "../../../Components/Buttons/TabButton";
import SearchModal from "../../../Components/Modals/SearchModal";
import FeedbackModal from "../../../Components/Modals/FeedbackModal";
import { useSelector } from "react-redux";
import useManageInvite from "./Hooks/useManageInvite";
import {
  ListEmptyComponent,
  ListFooterComponent,
  ListHeaderComponent,
} from "../../../Components/Flatlist/components";
import useDebounce from "../../../GlobalHooks/useDebounce";

const InviteManagement = ({ route }) => {
  const { colors } = useTheme();

  const type = route?.params?.type;

  const [feedbackModal, setFeedbackModal] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [inviteModal, setInviteModal] = useState(false);
  const [tab, setTab] = useState("Sent Invites");
  const { loading, snaks, handleGetSnaks, getSnakProfile } = useManageInvite();

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <InviteCard
          data={tab === "Sent Invites" ? item?.to_user : item?.from_user}
          onPress={() => setInviteModal(item)}
          type={item?.invites_received ? "received" : "sent"}
        />
      );
    },
    [snaks, tab]
  );

  const debounceSearchValue = useDebounce(searchText);

  useEffect(() => {
    if (type) {
      setTab(
        type == "send"
          ? "Sent Invites"
          : type == "receive"
          ? "Received Invites"
          : "Sent Invites"
      );
    }

    return () => {
      setTab("Sent Invites");
    };
  }, [type]);

  // useEffect(() => {
  //   if (inviteModal) {
  //     console.log(Object.keys(inviteModal), "invites_received");
  //     getSnakProfile(inviteModal?.id);
  //   }
  // }, [inviteModal]);

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
              <SearchInput
                placeholder="Search"
                onChangeText={(text) => setSearchText(text)}
                value={searchText}
              />
            }
          >
            <View
              style={[
                styles.headerContainer,
                {
                  marginTop: 10,
                  alignItems: "center",
                },
              ]}
            >
              <View style={[styles.availableContainer]}>
                <TabButton onPress={setTab} selected={tab} />
              </View>
              <TouchableOpacity
                style={[styles.refreshBtn]}
                onPress={handleGetSnaks}
              >
                <Text
                  style={[styles.refreshText, { color: colors.lightGreyLite }]}
                >
                  Refresh
                </Text>
                <Image source={REFRESH_IMAGE} />
              </TouchableOpacity>
            </View>

            <View style={[styles.inputContainer, { flex: 1, paddingTop: 10 }]}>
              <FlatList
                data={
                  tab === "Sent Invites"
                    ? snaks?.invites_sent.filter((item) =>
                        item?.to_user?.name
                          .toLowerCase()
                          .includes(debounceSearchValue.toLowerCase())
                      )
                    : snaks?.invites_received.filter((item) =>
                        item?.from_user?.name
                          .toLowerCase()
                          .includes(debounceSearchValue.toLowerCase())
                      )
                }
                keyExtractor={(item) => item?.id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                bounces={false}
                ListEmptyComponent={
                  <ListEmptyComponent message="No snaks found" />
                }
                ListHeaderComponent={<ListHeaderComponent loading={loading} />}
              />
            </View>
          </ScreenWrapper>
        </KeyboardAwareScrollView>
      </SafeAreaProvider>
      <BottomNavigator />
      <InviteModal
        data={inviteModal}
        visible={Boolean(inviteModal)}
        onClose={() => setInviteModal(false)}
      />
      {/* <FeedbackModal
        visible={feedbackModal}
        onClose={() => setFeedbackModal(false)}
      /> */}
    </>
  );
};
export default InviteManagement;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 20,
    marginVertical: 25,
    marginBottom: 7,
  },
  headerContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "pink"
  },
  availableText: {
    fontSize: 20,
    fontFamily: "OpenSans-SemiBold",
    letterSpacing: 0.5,
  },
  refreshBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  refreshText: {
    fontSize: 14,
    fontFamily: "OpenSans-Regular",
    marginRight: 5,
  },
  activeText: {
    fontSize: 10,
    fontFamily: "OpenSans-Regular",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  dot: {
    padding: 2.7,
    backgroundColor: "#03FC1C",
    borderRadius: 3,
    marginBottom: 2.7,
    maxHeight: 3,
    // marginRight: 3
  },
  active: {
    paddingVertical: 5,
    marginBottom: 10,
    borderBottomWidth: 2,
    paddingLeft: 5,
  },
});
