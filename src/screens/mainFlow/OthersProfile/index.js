import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyStatusBar from "../../../Components/MyStatusBar";
import { useTheme } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenWrapper from "../../../Components/ScreenWrapper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ImageAction from "./../../../Components/ActionPopups/ImageAction";
import BACK_ICON from "./../../../assets/Images/ep_back_red.png";
import SINGLE_USER from "./../../../assets/Images/single_user.png";
import CAKE from "./../../../assets/Images/cake_red.png";
import USERS from "./../../../assets/Images/users.png";
import CHAT from "./../../../assets/Images/Chat.png";
import BLOCK_ICON from "./../../../assets/Images/icons_block_red.png";
import PROFILE_IMAGE from "./../../../assets/Images/profile.png";

import { useSelector } from "react-redux";
import InviteModal from "../../../Components/Modals/InviteModal";
import useOtherProfile from "./Hooks/useOtherProfile";
import { CHAT_PATH } from "../../../Navigation/Routes";
import { ScrollView } from "react-native-gesture-handler";

const OtherProfile = ({ route }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { data } = route.params;
  const { getOtherProfile, createSnak, blockUser, unblockUser, cancelSnak } =
    useOtherProfile();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [inviteModal, setInviteModal] = useState(false);
  const snak = useSelector((state) =>
    state.snakReducer.recommendedSnaks?.data?.find(
      (v) => v.id === data?.user?.id
    )
  );
  const user = useSelector((state) => state.userReducer.user);
  const isUserBlocked = useSelector((state) =>
    state.userReducer.blockedList?.data?.some((v) => v.id === data?.user?.id)
  );

  const sent_snaks = useSelector((state) =>
    state?.snakReducer?.snaks?.invites_sent?.find(
      (v) => v?.to_user?.id === data.user.id
    )
  );

  const receive_snaks = useSelector((state) =>
    state?.snakReducer?.snaks?.invites_received?.find(
      (v) => v?.from_user?.id === data.user.id
    )
  );

  const handleChatNavigate = () => {
    let sendData = {
      reciever_id: {
        id: data?.user?.id,
        name: data?.user?.name,
        profile_picture: data?.user.profile_picture,
        fcmToken: data?.user?.fcmToken,
      },
      sender_id: {
        id: user?.id,
      },
      chatroom_id: sent_snaks?.chatroom_id || receive_snaks?.chatroom_id,
    };

    navigation.navigate(CHAT_PATH, { data: sendData });
  };

  useFocusEffect(
    useCallback(() => {
      const fetchProfileData = async () => {
        setLoading(true);
        try {
          let profileData = await getOtherProfile(data?.id);
          setProfile(profileData);
        } catch (error) {
          setLoading(false);
          console.error("Error fetching profile data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProfileData();

      return () => {
        setProfile({});
      };
    }, [])
  );

  // console.log("Snak 2 ===> ", snak2);
  // console.log("Other Profile", profile);

  // console.log("USer Profile", user);
  // console.log("Send Invite", sent_snaks);
  // console.log("Receive Invite", receive_snaks);
  // console.log(sent_snaks, "sent_snaks?.to_user?.id", user?.id)
  // console.log(data, "DATATATATTA");

  return (
    <SafeAreaProvider>
      <MyStatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <ScreenWrapper
          containerStyle={{ flex: 1, paddingHorizontal: 0 }}
          isMiniLogo={true}
          logoHeight={100}
          logo2
        >
          {/* Images */}
          {profile?.images?.length ? (
            <View style={styles.cardContainer}>
              <ScrollView
                horizontal
                contentContainerStyle={styles.imageContainer}
              >
                {profile?.images?.map((e, index) => (
                  <View key={e.id} style={styles.imageWrapper}>
                    <Image
                      source={{ uri: e.image }}
                      style={styles.cardIcon}
                      resizeMode="cover"
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
          ) : null}

          <View
            style={[
              styles.nameProfessionView,
              !profile?.images?.length
                ? { marginTop: 50, alignItems: "flex-start" }
                : null,
            ]}
          >
            <TouchableOpacity
              style={{ padding: 4 }}
              onPress={navigation.goBack}
            >
              <Image source={BACK_ICON} style={styles.backIcon} />
            </TouchableOpacity>
            <View flex={1}>
              <Text style={[styles.nameText, styles.fontFamilyOpenSans]}>
                {profile?.name || data?.user?.name}
              </Text>
              {profile?.job_field?.title || data?.job_field?.title ? (
                <Text
                  style={[styles.ProfessionText, styles.fontFamilyOpenSans]}
                >
                  {`Works in\n${
                    profile?.job_field?.title || data?.job_field?.title
                  }`}
                </Text>
              ) : null}
              {/* {snak?.job_field?.title && (
                <Text
                  style={[styles.ProfessionText, styles.fontFamilyOpenSans]}
                >
                  {snak?.job_field?.title}
                </Text>
              )} */}
            </View>
            <View style={{ width: 20 }} />
          </View>

          <View
            style={[
              styles.horizontalRule,
              { borderBottomColor: colors.primary },
            ]}
          />

          {/* Bio/Block User */}
          <View style={styles.bioView}>
            <View style={styles.bioHeader}>
              <Text style={[styles.bioHeaderText, styles.fontFamilyOpenSans]}>
                Bio
              </Text>
              <TouchableOpacity
                style={{ justifyContent: "center", alignItems: "center" }}
                onPress={() =>
                  isUserBlocked
                    ? unblockUser(data?.user?.id)
                    : blockUser(data?.user?.id)
                }
              >
                <Image
                  source={BLOCK_ICON}
                  style={[styles.blockIcon, { tintColor: colors.primary }]}
                />
                <Text style={[styles.bioHeaderText, styles.fontFamilyOpenSans]}>
                  {isUserBlocked ? "Unblock user" : "Block user"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bioDetails}>
              <Text style={[styles.bioDetailsText, styles.fontFamilyOpenSans]}>
                {data?.user?.bio}
                {snak?.bio}
              </Text>
            </View>
          </View>

          {/* Snak Count Card */}
          <View style={[styles.snaks, { backgroundColor: colors.primary }]}>
            <View style={styles.snakChild}>
              <Image source={USERS} style={styles.usersIcon} />
              <View style={styles.margin5}>
                <Text
                  style={[
                    styles.snaksText,
                    { fontWeight: "700" },
                    styles.fontFamilyOpenSans,
                  ]}
                >
                  Snaks
                </Text>
                <Text style={[styles.snaksText, styles.fontFamilyOpenSans]}>
                  {profile?.snak_profile?.total_snaks || data?.total_snaks}
                </Text>
              </View>
            </View>
            <View style={styles.snakChild}>
              <Image source={SINGLE_USER} style={styles.usersIcon} />
              <View style={styles.margin5}>
                <Text
                  style={[
                    styles.snaksText,
                    styles.fontFamilyOpenSans,
                    { fontWeight: "700" },
                  ]}
                >
                  Successful snaks
                </Text>
                <Text style={[styles.snaksText, styles.fontFamilyOpenSans]}>
                  {profile?.snak_profile?.successfull_snaks ||
                    data?.successfull_snaks}
                </Text>
              </View>
            </View>
          </View>

          {/* Basic Info and occupation */}
          <View style={styles.infoView}>
            <View style={styles.basicInfo}>
              <Text style={styles.fontFamilyOpenSans}>Basic info</Text>
              <View style={styles.snakChild}>
                <Image source={CAKE} style={styles.usersIcon} />
                <View style={styles.margin5}>
                  {snak?.age && (
                    <Text
                      style={[
                        styles.infoText,
                        styles.fontFamilyOpenSans,
                        { fontWeight: "500" },
                      ]}
                    >
                      {/* 17 June 1995 */}
                      {snak?.age}
                    </Text>
                  )}
                  <Text style={[styles.infoText, styles.fontFamilyOpenSans]}>
                    {/* Date of birth */}
                    {`${profile?.age || user?.age} years old`}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.basicInfo}>
              <Text style={styles.fontFamilyOpenSans}>Occupation</Text>
              {profile?.occupation ? (
                <View
                  style={[
                    styles.tagView,
                    styles.fontFamilyOpenSans,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <Text style={[styles.tags, styles.fontFamilyOpenSans]}>
                    {profile?.occupation}
                  </Text>
                </View>
              ) : (
                <Text>No Occupation</Text>
              )}
            </View>
            {/* <View style={styles.basicInfo}>
              <Text style={styles.fontFamilyOpenSans}>Occupation</Text>
              {Boolean(snak?.job_field?.title) ? (
                <View
                  style={[
                    styles.tagView,
                    styles.fontFamilyOpenSans,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <Text style={[styles.tags, styles.fontFamilyOpenSans]}>
                    {snak?.job_field?.title}
                  </Text>
                </View>
              ) : (
                <Text>No Occupation</Text>
              )}
            </View> */}
          </View>
        </ScreenWrapper>

        {/* Buttons */}
        <View style={{ marginVertical: 24 }}>
          {Boolean(sent_snaks) ? (
            <>
              <TouchableOpacity
                style={[styles.inviteView, { backgroundColor: colors.white }]}
                onPress={() => setInviteModal(true)}
              >
                <Text style={[styles.inviteBtn, { color: colors.primary }]}>
                  Edit Invite details
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  paddingHorizontal: 15,
                }}
              >
                <TouchableOpacity
                  onPress={() => cancelSnak(sent_snaks?.id)}
                  style={[
                    styles.cancelView,
                    { backgroundColor: colors.white, width: "48%" },
                  ]}
                >
                  <Text style={[styles.cancelBtn, { color: colors.primary }]}>
                    Cancel Snaksnak
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleChatNavigate}
                  style={[
                    styles.chatBtnView,
                    { backgroundColor: colors.primary, width: "48%" },
                  ]}
                >
                  <Image source={CHAT} style={styles.chatIcon} />
                  <Text style={[styles.inviteBtn, { color: colors.white }]}>
                    Chat
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : Boolean(receive_snaks) ? (
            <>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  paddingHorizontal: 15,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={handleChatNavigate}
                  style={[
                    styles.chatBtnView,
                    { backgroundColor: colors.primary, width: "48%" },
                  ]}
                >
                  <Image source={CHAT} style={styles.chatIcon} />
                  <Text style={[styles.inviteBtn, { color: colors.white }]}>
                    Chat
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <TouchableOpacity
              style={[styles.inviteView, { backgroundColor: colors.white }]}
              onPress={() => setInviteModal(true)}
            >
              <Text style={[styles.inviteBtn, { color: colors.primary }]}>
                Send Invite
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <ImageBackground
          style={[styles.avatar]}
          imageStyle={{
            borderRadius: 60,
            backgroundColor: colors.white,
            borderColor: "#fff",
            borderWidth: 2,
          }}
          source={
            profile?.profile_picture || data?.user?.profile_picture
              ? { uri: profile?.profile_picture || data?.user?.profile_picture }
              : PROFILE_IMAGE
          }
        ></ImageBackground>
      </KeyboardAwareScrollView>
      {inviteModal && (
        <InviteModal
          visible={inviteModal}
          onClose={() => setInviteModal(false)}
          data={Boolean(sent_snaks) ? sent_snaks : profile}
          sendInvite={!Boolean(sent_snaks)}
          handleInvite={(e) => createSnak(e)}
          isOwner={user?.id !== sent_snaks?.to_user?.id}
        />
      )}
    </SafeAreaProvider>
  );
};
export default OtherProfile;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 5,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginHorizontal: 5,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#fff", // Add a background color for the gap
    paddingVertical: 10, // Add vertical padding for the gap
  },
  imageContainer: {
    alignItems: "center",
  },
  imageWrapper: {
    marginHorizontal: 5,
  },
  cardIcon: {
    width: 140, // Adjust the width of the images
    height: 140,
    borderRadius: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    alignSelf: "center",
    position: "absolute",
    top: 35,
    resizeMode: "contain",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,

    elevation: 18,
    marginHorizontal: 5,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  nameProfessionView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 24,
    paddingHorizontal: 15,
  },
  nameText: {
    fontSize: 18,
    textAlign: "center",
    color: "#454545",
    lineHeight: 22,
  },
  ProfessionText: {
    fontSize: 14,
    textAlign: "center",
    color: "#000",
  },
  backIcon: {
    width: 25,
    height: 20,
  },
  blockIcon: {
    // width: 30,
    // height: 20,
    resizeMode: "contain",
  },
  usersIcon: {
    width: 20,
    height: 20,
  },
  chatIcon: {
    // width: '100%',
    // height: '100%',
    resizeMode: "contain",
  },
  horizontalRule: {
    borderBottomWidth: 2,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  bioView: {
    paddingHorizontal: 15,
  },
  infoView: {
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bioHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  bioDetailsText: {
    lineHeight: 28,
    fontSize: 12,
  },
  snaks: {
    marginHorizontal: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  tagView: {
    marginHorizontal: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
  inviteView: {
    marginHorizontal: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-evenly",
    // paddingVertical: 15,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  chatBtnView: {
    marginHorizontal: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // paddingVertical: 15,
    marginBottom: 20,
    width: "49%",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cancelView: {
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-evenly",
    // paddingVertical: 15,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  snaksText: {
    color: "#fff",
  },
  tags: {
    color: "#fff",
    padding: 5,
    width: 200,
    textAlign: "center",
  },
  inviteBtn: {
    padding: 15,
    fontSize: 18,
    fontWeight: "600",
  },
  cancelBtn: {
    padding: 15,
    fontSize: 15,
    fontWeight: "600",
  },
  snakChild: {
    flexDirection: "row",
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  margin5: {
    marginLeft: 5,
  },
  fontFamilyOpenSans: {
    fontFamily: "Open Sans",
  },
});
