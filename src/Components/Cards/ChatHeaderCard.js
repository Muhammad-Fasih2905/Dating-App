import React from "react"

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground
} from "react-native"

import { useTheme } from "react-native-paper"
import PROFILE_IMAGE from "./../../assets/Images/profile.png"
import LinearGradient from "react-native-linear-gradient"
const ChatHeaderCard = ({ data, isNew }) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.inputContainer, { marginBottom: 25 }]}>
      <LinearGradient
        colors={["#E67A7A", "#E67A7A", colors.primary, colors.primary]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={[styles.imageContainer, { backgroundColor: colors.primary }]}
      >
        <ImageBackground
          imageStyle={{ borderRadius: 20 }}
          source={PROFILE_IMAGE}
          style={styles.image}
        ></ImageBackground>
      </LinearGradient>
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: colors.black
            }
          ]}
        >
          {"Zack West , 28"}
        </Text>
        <Text
          style={[
            styles.text,
            {
              color: colors.lightGrey3
            }
          ]}
          numberOfLines={1}
        >
          Active now
        </Text>
      </View>
      <View
        style={[
          styles.cancelView,
          { backgroundColor: colors.primaryLite, width: "35%" }
        ]}
      >
        <Text
          style={[
            styles.cancelBtn,
            styles.fontFamilyOpenSans,
            { color: colors.white }
          ]}
        >
          Event details
        </Text>
      </View>
    </View>
  )
}

export default ChatHeaderCard

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 20,
    marginVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#00000040",
    borderBottomWidth: 1,
    paddingBottom: 10
  },

  imageContainer: {
    padding: 5,
    borderRadius: 25,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.5,

    elevation: 5
  },
  image: {
    width: 55,
    height: 55,
    resizeMode: "stretch",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  imageLabel: {
    padding: 2,
    marginBottom: 3,
    paddingHorizontal: 8,
    borderRadius: 20,
    backgroundColor: "rgba(265,265,265,0.8)"
  },
  imageText: {
    fontSize: 10,
    fontFamily: "OpenSans-Regular"
  },
  title: {
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    fontWeight: "600"
  },
  content: {
    flex: 1,
    marginVertical: 12,
    justifyContent: "flex-start"
  },
  text: {
    fontSize: 12,
    fontFamily: "OpenSans-Regular",
    fontWeight: "600"
  },
  cancelBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  },
  cancelView: {
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "49%"
  },
  fontFamilyOpenSans: {
    fontFamily: "Open Sans"
  }
})
