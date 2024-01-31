import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  FlatList,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyStatusBar from "../../../Components/MyStatusBar";
import { useTheme, Card } from "react-native-paper";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenWrapper from "../../../Components/ScreenWrapper";
import { useNavigation } from "@react-navigation/native";
import PROFILE_IMAGE_PLACEHOLDER from "../../../assets/Images/profile.png";
import CIRCLE_ADD_IMAGE from "./../../../assets/Images/circle-add.png";
import CAMERA_IMAGE from "./../../../assets/Images/bi_camera.png";
import USERS from "./../../../assets/Images/users.png";
import SINGLE_USER from "./../../../assets/Images/single_user.png";
import SimpleInput from "../../../Components/Inputs/SimpleInput";
import DropDown from "../../../Components/Inputs/DropDown";
import ImageAction from "./../../../Components/ActionPopups/ImageAction";
import { HOME_PATH } from "../../../Navigation/Routes";
import { useSelector } from "react-redux";
import useLogicProfile from "./Hooks/useLogicProfile";

const MyProfile = ({ route }) => {
  const { jobs } = useLogicProfile();
  const navigation = useNavigation();
  const user = useSelector((state) => state.userReducer.user);

  console.log(
    "file: index.js:38 ~ MyProfile ~ user:",
    JSON.stringify(user, null, 2)
  );

  const profileImages = useSelector(
    (state) => state.configReducer.profileImages
  );
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [occupation, setOccupation] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [jobField, setJobField] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleImageChange = (image, index) => {
    if (index === 1) {
      setProfileImage({ uri: image?.path });
    } else if (index === 2) {
      setImage1({ uri: image?.path });
    } else if (index === 3) {
      setImage2({ uri: image?.path });
    }
  };

  useEffect(() => {
    if (user) {
      setName(user?.name || "");
      setBio(user?.bio || "");
      setOccupation(user?.occupation || "");
      setAge((user?.age).toString() || "");
      setGender(user?.gender || "");
      setJobField(user?.job_field?.id || "");
      setProfileImage(user.profile_picture || null);
    }
  }, [user]);

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <View style={[styles.card, { backgroundColor: colors.white }]}>
          <Image source={{ uri: item.image }} style={styles.cardImage} />
        </View>
      );
    },
    [profileImage]
  );

  const listHeader = () => {
    return (
      <View style={[styles.card, { backgroundColor: colors.primary }]}>
        <Image source={CAMERA_IMAGE} style={styles.cardCamera} />
        <Text style={[styles.cardText, { color: colors.white }]}>
          Add photo
        </Text>
      </View>
    );
  };

  const emptyComponent = () => {
    return (
      <View style={[styles.card, { backgroundColor: colors.white }]}>
        <Text style={{ textAlign: "center" }}>{`No\nImages`}</Text>
        {/* <Image source={CIRCLE_ADD_IMAGE} style={styles.cardIcon} /> */}
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <MyStatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <ScreenWrapper
          isMiniLogo={true}
          logoHeight={90}
          logo2
          containerStyle={{
            backgroundColor: "red",
            flex: 1,
            paddingTop: 28,
            paddingHorizontal: 0,
          }}
          viewAsButton={true}
        >
          <View style={styles.cardContainer}>
            <FlatList
              data={profileImages}
              renderItem={renderItem}
              // ListHeaderComponent={listHeader}
              ListEmptyComponent={emptyComponent}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={[styles.inputContainer, { marginTop: 14 }]}>
            <SimpleInput
              value={name}
              onChangeText={setName}
              placeholder={"Name"}
              title="Name"
              error={errors.name}
              disabled
            />
          </View>
          <View style={styles.inputContainer}>
            <SimpleInput
              value={bio}
              onChangeText={setBio}
              placeholder={"Text"}
              dense
              title="Bio"
              multiline
              error={errors.bio}
              disabled
            />
          </View>
          <View style={styles.row}>
            <View style={[styles.flex1, { marginRight: 4, zIndex: 10000 }]}>
              <SimpleInput
                value={age}
                onChangeText={setAge}
                placeholder={"Age"}
                dense
                title="Age"
                keyboardType="numeric"
                error={errors.age}
                disabled
              />
            </View>
            <View style={[styles.flex1, { marginLeft: 4, zIndex: 10000 }]}>
              <DropDown
                value={gender}
                onChangeText={setGender}
                items={["male", "female", "non-binary"].map((v) => {
                  return { label: v, value: v };
                })}
                placeholder={"Gender"}
                dense
                title="Gender"
                error={errors.gender?.[0] ? ["Gender is required"] : null}
                disabled
              />
            </View>
          </View>
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
                  {user?.snak_profile?.total_snaks}
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
                  {user?.snak_profile?.successfull_snaks}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <SimpleInput
              value={occupation}
              onChangeText={setOccupation}
              placeholder={"Occupation"}
              dense
              title="Occupation"
              error={errors.occupation}
              disabled
            />
          </View>
          <View style={styles.inputContainer}>
            <DropDown
              value={jobField}
              onChangeText={setJobField}
              items={jobs?.map((v) => {
                return { label: v?.title, value: v?.id };
              })}
              placeholder={"Job Title"}
              dense
              title="Job Title"
              listMode="SCROLLVIEW"
              error={errors.job_field}
              disabled
            />
          </View>
          <View style={[styles.inputContainer, { marginBottom: 25 }]}>
            <PrimaryButton
              text="Edit my profile"
              height={70}
              onPress={() => navigation.navigate("My Profile")}
            />
          </View>
        </ScreenWrapper>
        <ImageBackground
          style={[styles.avatar]}
          imageStyle={{ borderRadius: 60, backgroundColor: colors.white }}
          source={
            typeof profileImage == "string" && profileImage !== null
              ? { uri: profileImage }
              : PROFILE_IMAGE_PLACEHOLDER
            // typeof profileImage == "string" && profileImage !== null
            //   ? { uri: profileImage }
            //   : PROFILE_IMAGE_PLACEHOLDER
          }
        />
      </KeyboardAwareScrollView>
      <ImageAction onChange={handleImageChange} />
    </SafeAreaProvider>
  );
};
export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginHorizontal: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,

    elevation: 18,
  },
  cardContainer: {
    marginTop: 45,
    borderRadius: 10,
    flexDirection: "row",
    marginHorizontal: 23,
  },
  flex: {
    flex: 1,
  },

  avatar: {
    width: 120,
    height: 120,
    alignSelf: "center",
    position: "absolute",
    top: 65,
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
  icon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    marginRight: 5,
    marginBottom: 3,
  },
  cardIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  cardCamera: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  cardText: {
    fontSize: 12,
    marginTop: 2,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginVertical: 7,
  },
  row: {
    marginHorizontal: 20,
    marginVertical: 7,
    flexDirection: "row",
    zIndex: 10000,
  },
  flex1: {
    flex: 1,
  },
  snaks: {
    marginHorizontal: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  snaksText: {
    color: "#fff",
  },
  snakChild: {
    flexDirection: "row",
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  usersIcon: {
    width: 20,
    height: 20,
  },
  margin5: {
    marginLeft: 5,
  },
  fontFamilyOpenSans: {
    fontFamily: "Open Sans",
  },
});
