import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ModalHeader from "../Components/ModalHeader";
import { MAIN_ROUTES } from "./Routes";
import LOGOUT_IMAGE from "../assets/Images/Navigation/logout.png";
import { ADD_AUTH_TOKEN, ADD_USER } from "../Redux/types";
import { useDispatch } from "react-redux";
import useOnlineStatusHook from "../GlobalHooks/useOnlineStatus";
const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const {} = useOnlineStatusHook();

  const handleLogout = () => {
    dispatch({ type: ADD_USER, payload: false });
    dispatch({ type: ADD_AUTH_TOKEN, payload: null });
  };

  const pathsToRender = MAIN_ROUTES.filter((route) => route.sidebar);
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <ModalHeader
          backBtn={false}
          onProfilePress={() => navigation.navigate("ViewProfile")}
        />
        <View style={[styles.content, styles.container]}>
          {pathsToRender.map((route) => (
            <TouchableOpacity
              key={route.path}
              onPress={() => {
                navigation.navigate(route.path);
              }}
              style={styles.item}
            >
              <Image source={route.image} style={styles.icon} />
              <Text style={[styles.itemText, { color: colors.black }]}>
                {route?.path}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={[styles.logout, { marginVertical: 20 }]}
          onPress={handleLogout}
        >
          <Text
            style={[styles.itemText, { color: colors.black, fontSize: 20 }]}
          >
            Log Out
          </Text>
          <Image source={LOGOUT_IMAGE} style={styles.icon} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menu: {
    flex: 1,
    paddingVertical: 35,
    // paddingBottom: 60,
  },
  link: {
    paddingVertical: 35,
    // paddingBottom: 60,
  },
  btn: {
    paddingVertical: 20,
  },
  hr: {
    marginHorizontal: 25,

    borderBottomWidth: 1,
  },
  btnContainer: { height: 50, paddingHorizontal: 25, marginTop: 20 },
  content: {
    marginVertical: 30,
    marginBottom: 10,
    marginHorizontal: 25,
    marginRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 20,
    resizeMode: "contain",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 16,
    fontFamily: "OpenSans-Light",
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "flex-end",
    borderTopWidth: 1,
  },
});
