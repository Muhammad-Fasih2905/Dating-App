import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import firestore from "@react-native-firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import handleSendNotification from "../../../Helper/sendNotification";

import ScreenWrapper from "../../../Components/ScreenWrapper";
import MyStatusBar from "../../../Components/MyStatusBar";
import HeaderBottom from "../../../Components/ScreenWrapper/HeaderBottom";
import { MESSAGE_PATH } from "../../../Navigation/Routes";
import PROFILE_IMAGE from "../../../assets/Images/profile.png";
import { Image } from "react-native";
import axios from "axios";
import { ListEmptyComponent } from "../../../Components/Flatlist/components";

const { width, height } = Dimensions.get("window");

const Chat = ({ route }) => {
  const { colors } = useTheme();

  const { user, accessToken } = useSelector((state) => state.userReducer);

  const scrollViewRef = useRef(null);
  const inputRef = useRef(null);

  const [chatInfo, setChatInfo] = useState({});

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState([]);
  const [docsData, setDocsData] = useState({});
  const [messages, setMessages] = useState([]);
  // const [chatRef, setChatRef] = useState(null);

  // const chatRedId =
  //   chatInfo?.chat_id || firestore().collection("chatRoom").doc().id

  let senderId = chatInfo?.sender_id?.id;
  let receiverId = chatInfo?.reciever_id?.id;
  const chatRedId = chatInfo?.chat_id
    ? chatInfo?.chat_id
    : chatInfo.chatroom_id;

  const chatRef = firestore().collection("chatRoom").doc(chatRedId);

  // for local api's
  const createChat = async () => {
    console.log("createChat");

    let data = {
      chat_id: chatRedId,
      sender_id: senderId,
      reciever_id: receiverId,
      last_message_update: input,
    };

    try {
      const response = await axios.post(
        "https://snaksnak-new-35878.botics.co/api/chatschats/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log("createChat Error ==>", error);
    }
  };
  const updateChat = async () => {
    console.log("updateChat");
    let data = {
      last_message_update: input,
    };

    try {
      const response = await axios.patch(
        `https://snaksnak-new-35878.botics.co/api/chatschats/${chatInfo?.id}/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log("updateChat Error ==>", error);
    }
  };
  // /for local api's

  let notificationData = {
    to:
      user?.id == chatInfo?.sender_id?.id
        ? chatInfo?.reciever_id?.fcmToken
        : chatInfo?.sender_id?.fcmToken,
    notification: {
      title: "New Message",
      body:
        user?.id == chatInfo?.sender_id?.id
          ? chatInfo?.reciever_id?.name + " send you a message."
          : chatInfo?.sender_id?.name + " send you a message.",
      mutable_content: true,
      sound: "Tri-tone",
      redirect_to: "Message",
    },
    // data": {
    //   url: "https://www.w3schools.com/w3images/avatar2.png",
    //   dl: "<deeplink action on tap of notification>"
    // }
  };

  const sendMessage = useCallback(async () => {
    try {
      const timestamp = firestore.FieldValue.serverTimestamp(); // Get the server timestamp

      chatRef.set({
        lastMessage: input,
        lastMessageTime: timestamp,
        lastMessageBy: user?.name,
        // unreadCount: docsData?.unreadCount + 1 || 1,
        isRead: false,
        userName: user?.name,
        userId: user?.id,
      });
      chatRef.collection("messages").add({
        message: input,
        userId: user?.id,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

      handleSendNotification(notificationData);
      if (chatInfo?.chat_id) {
        updateChat();
      } else {
        let res = await createChat();
        setChatInfo(res);
      }

      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          message: input,
          userId: user?.id,
          timestamp: timestamp,
        },
      ]);
      setInput("");
      inputRef.current.blur();
      setTimeout(() => {
        scrollViewRef?.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.log("Error ==> ", error);
    }
  }, [chatRef, input]);

  const getDoc = useCallback(() => {
    setLoading(true);
    try {
      chatRef.onSnapshot((querySnapshot) => {
        const data = querySnapshot?.data();
        setDocsData(data);
        setLoading(false);
      });
    } catch (error) {
      console.log("Getting error while fetch chat!", error);
      setLoading(false);
    }
  }, [chatRef]);

  const getMessages = useCallback(async () => {
    setLoading(true);
    try {
      chatRef
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot?.docs?.map((doc) => ({
            id: doc?.id,
            ...doc?.data(),
          }));

          setMessages(data);
          setLoading(false);

          setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({ animated: true });
          }, 1000);
        });
    } catch (error) {
      console.log("Getting error while fetch chat!", error);
      setLoading(false);
    }
  }, [chatRef]);

  const isToday = (date) => {
    const today = moment().startOf("day");
    const targetDate = moment(date).startOf("day");
    return today.isSame(targetDate);
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     if (route.params?.data) {
  //       setChatInfo(route.params.data);
  //       getDoc();
  //       getMessages();
  //     }

  //     return () => {
  //       setLoading(false);
  //       setMessages([]);
  //       setChatInfo({});
  //     };
  //   }, [route.params?.data])
  // );

  useEffect(() => {
    if (route.params?.data) {
      setChatInfo(route.params.data);
    }
    getDoc();
    getMessages();

    return () => {
      setLoading(false);
      setMessages([]);
      setChatInfo({});
      setDocsData({});
    };
  }, [route.params?.data, chatInfo]);

  // useEffect(() => {
  //   if (messages?.length) {
  //     scrollViewRef?.current?.scrollToEnd({ animated: true });
  //   }
  // }, [messages]);

  const renderItem = useCallback(
    ({ item }) => {
      return <ChatCard message={item} />;
    },
    [messages]
  );

  // console.log("chatroom_id ", chatInfo);
  // console.log("Messages ", messages);

  return (
    <SafeAreaProvider>
      <MyStatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScreenWrapper
          isMiniLogo={true}
          logoHeight={100}
          isLogo={false}
          isProfileImage
          searchBar={<HeaderBottom title="Messages" back={MESSAGE_PATH} />}
        >
          {/* Chat Header */}
          <View
            style={[styles.chatHeader, { borderBottomColor: colors.accent }]}
          >
            <LinearGradient
              colors={["#E67A7A", "#E67A7A", colors.primary, colors.primary]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.imageContainer,
                { backgroundColor: colors.primary },
              ]}
            >
              <View style={styles.isActive} />
              <ImageBackground
                imageStyle={{ borderRadius: 20 }}
                source={
                  chatInfo?.sender_id?.id === user?.id &&
                  chatInfo?.reciever_id?.profile_picture
                    ? { uri: chatInfo?.reciever_id?.profile_picture }
                    : chatInfo?.sender_id?.profile_picture
                    ? { uri: chatInfo?.sender_id?.profile_picture }
                    : PROFILE_IMAGE
                }
                style={styles.image}
              />
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
                {user?.id === chatInfo?.sender_id?.id
                  ? chatInfo?.reciever_id?.name
                  : chatInfo?.sender_id?.name}
              </Text>
              <Text style={[styles.activeTxt, { color: colors.backdrop }]}>
                Active now
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              paddingTop: 20,
              paddingHorizontal: 10,
            }}
          >
            <FlatList
              data={messages}
              key={(item) => item.id}
              renderItem={renderItem}
              ref={scrollViewRef}
              bounces={false}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <ListEmptyComponent loading={loading} message="No Message" />
              }
            />
          </View>
          <View
            style={[
              styles.input,
              {
                backgroundColor: colors.accent,
                borderColor: colors.primary,
                height: 50,
              },
            ]}
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              ref={inputRef}
              style={[styles.txtInput, { borderColor: colors.primary }]}
              placeholder="Enter Message..."
              placeholderTextColor={colors.backdrop}
            />
            <TouchableOpacity
              style={styles.sendBtnContainer}
              onPress={sendMessage}
              disabled={!input.length}
            >
              <Image
                source={require("../../../assets/Images/send.png")}
                style={[styles.sendBtn, { tintColor: colors.primary }]}
              />
            </TouchableOpacity>
          </View>
        </ScreenWrapper>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

const ChatCard = ({ message }) => {
  const { colors } = useTheme();
  const user = useSelector((state) => state.userReducer.user);

  let isMe = message?.userId == user?.id ? true : false;

  let timeIn24HoursFormat = "";
  if (message?.timestamp && message.timestamp.seconds) {
    const momentObject = moment.unix(message.timestamp.seconds);
    momentObject.add(message.timestamp.nanoseconds / 1e6, "milliseconds");
    timeIn24HoursFormat = momentObject.format("HH:mm");
  }

  return (
    <View
      style={[
        styles.messageContainer,
        !isMe
          ? { backgroundColor: colors.accent, alignSelf: "flex-start" }
          : { backgroundColor: colors.primary },
      ]}
    >
      <Text style={[styles.msg, !isMe ? { color: colors.backdrop } : {}]}>
        {message?.message}
      </Text>
      <Text style={[styles.msgTime, !isMe ? { color: colors.backdrop } : {}]}>
        {timeIn24HoursFormat}
      </Text>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 20,
    marginVertical: 7,
    marginTop: 14,
  },

  // Input
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 16,
  },
  txtInput: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
  },
  sendBtnContainer: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 50,
  },
  sendBtn: {
    width: 20,
    height: 20,
  },

  // Message
  dateHeadingText: {
    textAlign: "center",
    marginBottom: 14,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 2,
  },

  messageContainer: {
    alignSelf: "flex-end",
    backgroundColor: "red",
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 10,
    width: width - 100,
    marginBottom: 16,
    borderRadius: 10,
  },
  msg: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
  },
  msgTime: {
    color: "#fff",
    alignSelf: "flex-end",
    fontWeight: "600",
  },

  // Chat Header
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 16,
    borderBottomWidth: 2,
    paddingHorizontal: -2,
    paddingBottom: 8,
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
  image: {
    width: 65,
    height: 65,
    resizeMode: "stretch",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "flex-end",
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
  content: {
    flex: 1,
    marginVertical: 12,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 17,
    fontFamily: "OpenSans-SemiBold",
  },
  activeTxt: {
    fontSize: 13,
  },
  isActive: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#03FC1C",
    position: "absolute",
    right: 0,
    bottom: 14,
    zIndex: 1,
  },
});
