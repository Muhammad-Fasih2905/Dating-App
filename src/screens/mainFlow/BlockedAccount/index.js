import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyStatusBar from "../../../Components/MyStatusBar";
import { useTheme } from "react-native-paper";
import ScreenWrapper from "../../../Components/ScreenWrapper";
import HeaderBottom from "../../../Components/ScreenWrapper/HeaderBottom";
import BottomNavigator from "../../../Components/Navigation/BottomNavigator";
import RoundSideButton from "../../../Components/Buttons/RoundSideButton";
import { ADD_USER, OTP_VERIFY_SUCCESS } from "../../../Redux/types";
import { useDispatch } from "react-redux";
import AVATAR_IMAGE from "../../../assets/Images/profile.png";
import useBlockedAccounts from "./Hooks/useBlockedAccounts";
import {
  ListEmptyComponent,
  ListFooterComponent,
} from "../../../Components/Flatlist/components";

const BlockedAccount = ({ route }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const {
    blockedList,
    userLoadingStatus,
    loadingMore,
    loading,
    getBlockedList,
    unblockUser,
    getMoreBlockedList,
  } = useBlockedAccounts();

  const handleLogout = () => {
    dispatch({ type: ADD_USER, payload: false });
    dispatch({ type: OTP_VERIFY_SUCCESS, payload: { token: null, phone: "" } });
  };

  const keyExtractor = useCallback((item) => `${item.id}`);
  const renderItem = useCallback(
    ({ item }) => {
      const isUserLoading = userLoadingStatus[item.id];
      return (
        <View style={styles.container}>
          <View style={styles.buttonParent}>
            <View style={styles.flexCenter}>
              <Image
                style={styles.profile}
                source={
                  item?.profile_picture
                    ? { uri: item?.profile_picture }
                    : AVATAR_IMAGE
                }
              />
              <Text style={[styles.toggleLableStyle, { color: colors.black }]}>
                {item.name}
              </Text>
            </View>
            <RoundSideButton
              containerStyle={[
                styles.btnContainer,
                { backgroundColor: colors.primary },
              ]}
              text="Unblock"
              textStyle={styles.btnTextStyle}
              onPress={() => unblockUser(item.id)}
              loading={isUserLoading}
            />
          </View>
        </View>
      );
    },
    [blockedList?.data, userLoadingStatus]
  );

  const getMoreData = useCallback(() => {
    getMoreBlockedList();
  });

  return (
    <>
      <SafeAreaProvider>
        <MyStatusBar
          backgroundColor={colors.primary}
          barStyle="light-content"
        />
        <ScreenWrapper
          isMiniLogo={true}
          logoHeight={100}
          isLogo={false}
          isProfileImage
          searchBar={<HeaderBottom title={"Blocked Account"} />}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={blockedList?.data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={() => <View style={{ marginTop: 14 }} />}
            ListHeaderComponent={() => <View style={{ marginTop: 20 }} />}
            ListFooterComponent={() =>
              loadingMore ? (
                <ActivityIndicator
                  style={{ marginVertical: 10 }}
                  size="large"
                  color={colors.primary}
                />
              ) : null
            }
            ListEmptyComponent={
              <ListEmptyComponent message="No Blocked User" />
            }
            ListFooterComponent={<ListFooterComponent loading={loadingMore} />}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={getBlockedList}
                tintColor={colors.primary}
              />
            }
            onEndReached={getMoreData}
            onEndReachedThreshold={0.1}
          />
        </ScreenWrapper>
      </SafeAreaProvider>
      <BottomNavigator />
    </>
  );
};
export default BlockedAccount;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  buttonParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  toggleLableStyle: {
    fontFamily: "OpenSans-Regular",
    marginLeft: 20,
    fontSize: 12,
  },
  btnContainer: {
    paddingHorizontal: 20,
    borderRadius: 10,
    height: 36,
    justifyContent: "center",
  },
  btnTextStyle: {
    fontFamily: "OpenSans-Bold",
    fontSize: 12,
    marginHorizontal: 10,
  },
  flexCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  profile: {
    width: 45,
    height: 45,
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 10,
  },
});
