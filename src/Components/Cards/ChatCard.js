import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import moment from "moment";
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

import PROFILE_IMAGE from "./../../assets/Images/profile.png";
import { CHAT_PATH } from "../../Navigation/Routes";

const ChatCard = ({ data, isNew }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const user = useSelector((state) => state.userReducer.user);

  const { sender_id, reciever_id } = data;

  let isMe = user.id === sender_id?.id ? true : false;

  // console.log("isMe ==> ", isMe)
  // console.log("sender_id ==> ", sender_id)
  // console.log("reciever_id ==> ", reciever_id)
  // console.log("user ==> ", user?.id)
  // console.log("user ==> ", data)

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(CHAT_PATH, { data })}
      style={[styles.card, { backgroundColor: colors.white }]}
    >
      <LinearGradient
        colors={["#E67A7A", "#E67A7A", colors.primary, colors.primary]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={[styles.imageContainer, { backgroundColor: colors.primary }]}
      >
        <ImageBackground
          imageStyle={{ borderRadius: 20 }}
          source={
            sender_id?.id === user?.id && reciever_id?.profile_picture
              ? { uri: reciever_id?.profile_picture }
              : sender_id?.profile_picture
              ? { uri: sender_id?.profile_picture }
              : PROFILE_IMAGE
          }
          style={styles.image}
        >
          <View style={styles.imageLabel}>
            <Text style={styles.imageText}>View invite</Text>
          </View>
        </ImageBackground>
      </LinearGradient>
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: colors.lightGreyLite,
            },
          ]}
        >
          {isMe ? reciever_id?.name : sender_id?.name}
          {/* {"Zack West , 28"} */}
        </Text>
        <Text
          style={[
            styles.text,
            {
              color: isNew ? colors.textLiteBlack : colors.lightGrey2,
            },
          ]}
          numberOfLines={1}
        >
          {data?.last_message_update || ""}
        </Text>
      </View>
      <View style={styles.distance}>
        {isNew && (
          <View
            style={[
              styles.unReadMsgCount,
              { backgroundColor: colors.primaryLite },
            ]}
          >
            <Text style={{ color: colors.white }}>1</Text>
          </View>
        )}
        <Text
          style={[
            styles.activeText,
            { color: colors.lightGreyLite, marginTop: 5 },
          ]}
        >
          {moment(data?.send_time).format("HH:mm")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  card: {
    // flex: 1,
    borderRadius: 20,
    marginBottom: 20,
    // alignItems: "center",
    padding: 7,
    // justifyContent: "center",
    flexDirection: "row",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.5,

    elevation: 5,
  },
  title: {
    fontSize: 17,
    fontFamily: "OpenSans-SemiBold",
    // fontWeight: '800',
  },
  text: {
    fontSize: 13,
    marginTop: 10,
  },
  image: {
    width: 85,
    height: 85,
    resizeMode: "stretch",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  walking: {
    width: 40,
    height: 40,
    resizeMode: "stretch",
  },
  imageContainer: {
    padding: 5,
    borderRadius: 25,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.5,

    elevation: 5,
  },
  content: {
    flex: 1,
    marginVertical: 12,
    justifyContent: "flex-start",
  },
  activeText: {
    fontSize: 10,
    fontFamily: "OpenSans-Regular",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  distance: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageLabel: {
    padding: 2,
    marginBottom: 3,
    paddingHorizontal: 8,
    borderRadius: 20,
    backgroundColor: "rgba(265,265,265,0.8)",
  },
  imageText: {
    fontSize: 10,
    fontFamily: "OpenSans-Regular",
  },
  unReadMsgCount: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
});
