import React, { useCallback, useEffect } from "react";

import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";

import { useTheme } from "react-native-paper";
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LOGO_IMAGE from "./../../assets/Images/Logo(2).png";
import { useNavigation } from "@react-navigation/native";
import {
  CREATE_PROFILE_PATH,
  HOME_PATH,
  MESSAGE_PATH,
  NOTIFICATIONS_PATH,
} from "../../Navigation/Routes";
import firestore from "@react-native-firebase/firestore";
import { UPDATE_COUNT_NOTIFICATION } from "../../Redux/types";
import { useSelector, useDispatch } from "react-redux";
import useNotificationHook from "../../GlobalHooks/handleNotificationCount";

const BottomNavigator = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { getNotificationsCount } = useNotificationHook();

  const { user, notificationCount } = useSelector((state) => state.userReducer);

  // Get My Notification Count
  useEffect(() => {
    getNotificationsCount(user?.id);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={styles.button}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: colors.white }]}
          onPress={() => navigation.navigate(HOME_PATH)}
        >
          <Foundation name="home" size={30} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: colors.white }]}
          onPress={() => navigation.navigate(CREATE_PROFILE_PATH)}
        >
          <Ionicons name="md-person-sharp" size={30} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image
          style={[styles.avatar, { width: 65, height: 65 }]}
          source={LOGO_IMAGE}
        />
      </View>

      <View style={styles.button}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: colors.white }]}
          onPress={() => navigation.navigate(NOTIFICATIONS_PATH)}
        >
          {notificationCount ? (
            <View style={[styles.noti, { backgroundColor: colors.primary }]}>
              <Text style={styles.notiText}>{notificationCount}</Text>
            </View>
          ) : null}
          <MaterialCommunityIcons
            name="bell"
            size={30}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: colors.white }]}
          onPress={() => navigation.navigate(MESSAGE_PATH)}
        >
          <MaterialCommunityIcons
            name="android-messages"
            size={30}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    paddingTop: 10,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 45,
    height: 45,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },

  noti: {
    position: "absolute",
    top: -5,
    right: -5,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
  },
  notiText: {
    color: "white", // or any color you want for the text
    fontSize: 12,
  },
});
