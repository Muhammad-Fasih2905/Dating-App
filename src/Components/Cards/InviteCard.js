import React, { useState, useEffect } from "react";

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
import MEDAL_IMAGE from "./../../assets/Images/medal.png";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
const InviteCard = ({ onPress = () => {}, status, data }) => {
  const { colors } = useTheme();

  const textPrimaryColor = colors.textPrimary;
  const adventurePref = useSelector(
    (state) => state.configReducer.adventurePref
  );

  const snakType =
    adventurePref?.data?.find(
      (v) => v.id === data?.snak_profile?.adventure_preference
    )?.title || "none";

  // console.log(data)
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.white }]}
      onPress={onPress}
    >
      <LinearGradient
        colors={["#E67A7A", "#E67A7A", colors.primary, colors.primary]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={[styles.imageContainer, { backgroundColor: colors.primary }]}
      >
        <ImageBackground
          imageStyle={{ borderRadius: 20 }}
          // source={PROFILE_IMAGE}
          source={
            data?.profile_picture
              ? { uri: data?.profile_picture }
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
          {data?.name}, {data?.age}
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
          {snakType}
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
      </View>
      {status === "declined" && (
        <View style={[styles.status, { backgroundColor: colors.primary }]}>
          <Text style={[styles.statusText, { color: colors.white }]}>
            Declined
          </Text>
          <Image source={MEDAL_IMAGE} style={[styles.statusImage]} />
        </View>
      )}
      {status === "pending" && (
        <View style={[styles.status, { backgroundColor: colors.lightGrey2 }]}>
          <Text style={[styles.statusText, { color: colors.white }]}>
            Waiting
          </Text>
          <Image source={MEDAL_IMAGE} style={[styles.statusImage]} />
        </View>
      )}
      {status === "accepted" && (
        <View style={[styles.status, { backgroundColor: colors.lightGreen }]}>
          <Text style={[styles.statusText, { color: colors.white }]}>
            Accepted
          </Text>
          <Image source={MEDAL_IMAGE} style={[styles.statusImage]} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default InviteCard;

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
  },
  dot: {
    padding: 2.7,
    backgroundColor: "#03FC1C",
    borderRadius: 3,
    marginBottom: 2,
    maxHeight: 3,
    // marginRight: 3
  },
  distance: {
    alignItems: "center",
    justifyContent: "center",
  },
  status: {
    padding: 2,
    position: "absolute",
    bottom: -13,
    right: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  statusImage: {
    width: 25,
    height: 25,
  },
  statusText: {
    marginRight: 10,
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
});
