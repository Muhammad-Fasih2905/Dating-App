import React from "react";

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

import { useTheme } from "react-native-paper";
import PROFILE_IMAGE from "./../../assets/Images/profile.png";
import WALKING_IMAGE from "./../../assets/Images/walking.png";
import LinearGradient from "react-native-linear-gradient";
import { OTHERS_PROFILE_PATH } from "../../Navigation/Routes";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const ProfileCard = ({ data, disabled = false }) => {
  // console.log("DAta ===> ", data);

  const { colors } = useTheme();
  const navigation = useNavigation();
  const textPrimaryColor = colors.textPrimary;
  const adventurePref = useSelector(
    (state) => state.configReducer.adventurePref
  );

  // const snakType =
  //   adventurePref?.data?.find(
  //     v => v.id === data?.snak_profile?.adventure_preference
  //   )?.title || "none"

  // console.log("snakType is ==>> ", snakType)

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.card, { backgroundColor: colors.white }]}
      onPress={() => navigation.navigate(OTHERS_PROFILE_PATH, { data: data })}
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
            data?.user?.profile_picture
              ? { uri: data?.user?.profile_picture }
              : PROFILE_IMAGE
          }
          style={styles.image}
        >
          <View style={styles.imageLabel}>
            <Text style={styles.imageText}>View Profile</Text>
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
          {data?.user?.name}, {data?.user?.age ? data?.user?.age : data?.age}
        </Text>
        <Text
          style={[
            styles.text,
            {
              color: colors.lightGreyLite,
            },
          ]}
          numberOfLines={1}
        >
          {data?.job_field?.title}
        </Text>

        <Text
          style={[
            styles.text,
            {
              color: colors.lightGreyLite,
            },
          ]}
        >
          {data?.adventure_preference?.title}
          {/* {snakType} */}
        </Text>
      </View>
      <View style={styles.distance}>
        <Image source={WALKING_IMAGE} style={styles.walking} />
        <Text
          style={[
            styles.activeText,
            { color: colors.lightGreyLite, textAlign: "center" },
          ]}
        >
          20 miles{"\n"} from you
        </Text>
        <View flexDirection="row" alignItems="center">
          <View
            style={[
              styles.dot,
              !data?.is_online ? { backgroundColor: colors.primary } : {},
            ]}
          />
          <Text
            style={[
              styles.activeText,
              { color: colors.lightGreyLite, marginTop: 5 },
            ]}
          >
            {data?.is_online ? "Active now" : "Offline"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileCard;

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
    justifyContent: "space-between",
  },
  activeText: {
    fontSize: 10,
    fontFamily: "OpenSans-Regular",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    lineHeight: 12,
  },
  dot: {
    backgroundColor: "#03FC1C",
    marginTop: 3,
    height: 6,
    width: 6,
    borderRadius: 6 / 2,
    marginHorizontal: 3,
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
    backgroundColor: "rgba(265,265,225,0.8)",
  },
  imageText: {
    fontSize: 10,
    fontFamily: "OpenSans-Regular",
  },
});
