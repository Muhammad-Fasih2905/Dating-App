import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyStatusBar from "../../../Components/MyStatusBar";
import { useTheme } from "react-native-paper";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import ScreenWrapper from "../../../Components/ScreenWrapper";
import SearchInput from "../../../Components/Inputs/SearchInput";
import REFRESH_IMAGE from "./../../../assets/Images/refresh.png";
import FILTER_IMAGE from "./../../../assets/Images/filter_icon_black.png";
import ProfileCard from "../../../Components/Cards/ProfileCard";
import BottomNavigator from "../../../Components/Navigation/BottomNavigator";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useNotifications from "./Hooks/useNotifications";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderBottom from "../../../Components/ScreenWrapper/HeaderBottom";
import moment from "moment";
import {
  ListEmptyComponent,
  ListFooterComponent,
  ListHeaderComponent,
} from "../../../Components/Flatlist/components";
import { INVITE_MANAGEMENT_PATH } from "../../../Navigation/Routes";

const Notifications = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    loading,
    loadingMore,
    allNotifications,
    notificationPreferences,
    getNotifications,
    getMoreNotifications,
  } = useNotifications();

  const [activeTab, setActiveTab] = useState("");

  const handleSelectPreference = (preference) => {
    if (preference == activeTab) {
      setActiveTab("");
      return;
    }

    setActiveTab(preference);
  };

  const preferenceKey = useCallback((item) => `${item.id}`);
  const renderPreference = useCallback(
    ({ item }) => {
      let preference = item?.type
        .split("_")
        ?.map((e) => e.charAt(0).toUpperCase() + e.slice(1))
        .join(" ");

      return (
        <TouchableOpacity
          onPress={() => handleSelectPreference(item?.type)}
          style={[
            styles.preferenceBtn,
            { borderWidth: 1, borderColor: colors.primary },
            activeTab == item?.type && { backgroundColor: colors.primary },
          ]}
        >
          <Text
            style={[
              { color: colors.primary },
              activeTab == item?.type && { color: "#fff" },
            ]}
          >
            {preference}
          </Text>
        </TouchableOpacity>
      );
    },
    [activeTab]
  );

  const notificationKey = useCallback((item) => `${item.id}`);
  const rendenNotification = useCallback(
    ({ item }) => {
      const notificationDate = moment(item?.created_at);
      let formattedDate = "";

      if (notificationDate.isSame(moment(), "day")) {
        formattedDate = `Today, ${notificationDate.format("h:mm A")}`;
      } else if (notificationDate.isSame(moment().subtract(1, "days"), "day")) {
        formattedDate = `Yesterday, ${notificationDate.format("h:mm A")}`;
      } else if (notificationDate.isSame(moment(), "year")) {
        formattedDate = notificationDate.format("MMMM D, h:mm A");
      } else {
        formattedDate = notificationDate.format("MMMM D, YYYY, h:mm A");
      }

      return (
        <TouchableOpacity
          style={[styles.notification]}
          onPress={() => handleNavigate(item?.type)}
          //   {/* !item?.read && { backgroundColor: colors.backdrop },
        >
          <View
            style={[
              styles.notiMark,
              { borderColor: colors.primary },
              !item?.read && { backgroundColor: colors.primary },
            ]}
          />
          <View style={{ flex: 1 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={[styles.notiTitle, { color: colors.primary }]}>
                {item?.title}
              </Text>
              <Text style={styles.notiTime}>{formattedDate}</Text>
            </View>
            <Text
              style={[styles.notiDesc, !item?.read && { fontWeight: "bold" }]}
            >
              {item?.description}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [activeTab]
  );
  const getMoreData = useCallback(() => {
    getMoreNotifications();
  });

  useFocusEffect(
    useCallback(() => {
      return () => setActiveTab("");
    }, [])
  );

  const handleNavigate = (type) => {
    if (type == "snak_invite_accepted") {
      navigation.navigate(INVITE_MANAGEMENT_PATH, { type: "send" });
    } else if (type == "snak_invite_rejected") {
      navigation.navigate(INVITE_MANAGEMENT_PATH, { type: "send" });
    } else if (type == "snak_invite") {
      navigation.navigate(INVITE_MANAGEMENT_PATH, { type: "receive" });
    }
  };

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
        >
          {/* Notification Preferences */}
          <View style={styles.preferenceContainer}>
            {/* <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={notificationPreferences?.data}
              renderItem={renderPreference}
              keyExtractor={preferenceKey}
              ItemSeparatorComponent={() => (
                <View style={{ marginHorizontal: 4 }} />
              )}
              ListHeaderComponent={() => (
                <View style={{ marginHorizontal: 10 }} />
              )}
              ListFooterComponent={() => (
                <View style={{ marginHorizontal: 10 }} />
              )}
            /> */}
          </View>

          {/* Notifications */}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={allNotifications?.data}
            renderItem={rendenNotification}
            keyExtractor={notificationKey}
            ItemSeparatorComponent={() => <View style={{ marginTop: 14 }} />}
            ListEmptyComponent={
              <ListEmptyComponent message="No Notification Available" />
            }
            ListFooterComponent={<ListFooterComponent loading={loadingMore} />}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={getNotifications}
                tintColor={colors.primary}
              />
            }
            onEndReached={getMoreData}
            onEndReachedThreshold={0.1}
          />
        </ScreenWrapper>
        <BottomNavigator />
      </SafeAreaProvider>
    </>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  // Preference Button Bar
  preferenceContainer: {
    paddingVertical: 10,
  },
  preferenceBtn: {
    height: 38,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  // Notifications
  notification: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  notiMark: {
    marginTop: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    marginRight: 8,
  },
  notiTitle: {
    fontWeight: "bold",
  },
  notiTime: {
    fontSize: 14,
  },
  notiDesc: {},
});
