import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { useTheme } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SheetManager } from "react-native-actions-sheet";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import MyStatusBar from "../../../Components/MyStatusBar";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import ScreenWrapper from "../../../Components/ScreenWrapper";
import CIRCLE_ADD_IMAGE from "./../../../assets/Images/circle-add.png";
import PROFILE_IMAGE_PLACEHOLDER from "./../../../assets/Images/profile.png";
import CAMERA_IMAGE from "./../../../assets/Images/bi_camera.png";
import SimpleInput from "../../../Components/Inputs/SimpleInput";
import DropDown from "../../../Components/Inputs/DropDown";
import ImageAction from "./../../../Components/ActionPopups/ImageAction";
import useLogicProfile from "./Hooks/useLogicProfile";

var regexOnlyLetters = /^[A-Za-z ]+$/;

const CreateProfile = () => {
  const { jobs, updateProfile, setProfileImages } = useLogicProfile();
  const user = useSelector((state) => state.userReducer.user);
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
  const [addImages, setAddImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleImageChange = (image, index) => {
    let timeNow = new Date().getTime();

    if (index === 1) {
      setProfileImage({
        uri: image.path,
        type: image.mime,
        name: `profile_${timeNow}_${user.id}.${image.mime.split("/")[1]}`,
      });
      SheetManager.hide("ImageAction");
    } else if (index === 2) {
      setAddImages((prev) => [
        ...prev,
        {
          uri: image.path,
          type: image.mime,
          name: `image_${timeNow}_${user.id}.${image.mime.split("/")[1]}`,
        },
      ]);
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
      setProfileImage(user?.profile_picture || null);
    }
  }, [user]);

  const dataToFormData = (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        formData.append(key, element);
      }
    }
    return formData;
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (
      !name.trim() ||
      !age.trim() ||
      !gender.trim() ||
      !bio.trim() ||
      !occupation.trim() ||
      !jobField
    ) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill all fields!",
      });
      setLoading(false);
      return;
    }

    if (!name.match(regexOnlyLetters)) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Numbers and special characters are not allowed in Name field",
      });
      setLoading(false);
      return;
    }

    await Promise.all([
      addImages.length &&
        addImages.map((e) =>
          setProfileImages(dataToFormData({ image: e, type: "gallery" }))
        ),
    ])
      .then(() => {
        setAddImages([]);
      })
      .catch((error) => {
        console.error("Error whie adding images", error);
      });

    try {
      let reqObj = {
        name: name.trim(),
        age: age.trim(),
        gender: gender.trim(),
        bio: bio.trim(),
        occupation: occupation.trim(),
        job_field: jobField,
      };

      if (typeof profileImage === "object" && profileImage !== null) {
        reqObj["profile_picture"] = profileImage;
      }

      let formData = dataToFormData(reqObj);
      updateProfile(formData);
    } catch (error) {
      // if (error.status === 400) {
      //   if (error?.message?.key === "validations") {
      //     setErrors(error?.message?.messages)
      //   }
      //   if (error?.message?.messages?.non_field) {
      //     console.log(
      //       error?.message?.messages?.non_field,
      //       "error?.message?.messages?.non_field"
      //     )
      //   }
      // }
      console.log("Error While Updating User Profile! ", error);
      setLoading(false);
    } finally {
      setLoading(false);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Provide updated successfully",
      });
    }
  };

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <View style={[styles.card, { backgroundColor: colors.white }]}>
          <Image
            source={item.uri ? { uri: item?.uri } : { uri: item?.image }}
            style={styles.cardImage}
          />
        </View>
      );
    },
    [profileImages]
  );

  const combinedImages = [...addImages, ...profileImages];

  return (
    <>
      <MyStatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <ScreenWrapper isMiniLogo={true} logoHeight={48} logo2>
          <View
            style={{
              ...styles.flex1,
              backgroundColor: "rgba(255, 192, 203, 0.1)",
              // alignItems: "center"
            }}
          >
            <View style={styles.cardContainer}>
              <TouchableOpacity
                onPress={() => SheetManager.show("ImageAction", { image: 2 })}
                style={[styles.card, { backgroundColor: colors.primary }]}
              >
                <Image source={CAMERA_IMAGE} style={styles.cardCamera} />
                <Text style={[styles.cardText, { color: colors.white }]}>
                  Add photo
                </Text>
              </TouchableOpacity>

              <FlatList
                data={combinedImages}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <SimpleInput
                value={name}
                onChangeText={setName}
                placeholder={"Name"}
                dense
                title="Name"
                multiline={false}
                error={errors.name}
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
                />
              </View>
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
              />
            </View>
            <View style={styles.inputContainer}>
              <SimpleInput
                value={occupation}
                onChangeText={setOccupation}
                placeholder={"Occupation"}
                dense
                title="Occupation"
                error={errors.occupation}
              />
            </View>
            <View style={styles.inputContainer}>
              <DropDown
                value={jobField}
                onChangeText={setJobField}
                items={jobs?.map((v) => {
                  return {
                    label:
                      v?.title === "PP & Marketing"
                        ? "PR & Marketing"
                        : v?.title,
                    value: v?.id,
                  };
                })}
                placeholder={"Career Field"}
                dense
                title="Career Field"
                listMode="SCROLLVIEW"
                error={errors.job_field}
              />
            </View>

            <View style={[styles.inputContainer, { marginBottom: 25 }]}>
              <PrimaryButton
                text="Save alterations"
                height={70}
                onPress={handleSubmit}
                loading={loading}
              />
            </View>
          </View>
        </ScreenWrapper>

        <ImageBackground
          style={[styles.avatar]}
          imageStyle={{
            borderRadius: 60,
            backgroundColor: colors.white,
          }}
          source={
            typeof profileImage == "object" && profileImage !== null
              ? { uri: profileImage?.uri }
              : typeof profileImage == "string" && profileImage !== null
              ? { uri: profileImage }
              : PROFILE_IMAGE_PLACEHOLDER
          }
        >
          <TouchableOpacity
            onPress={() => SheetManager.show("ImageAction", { image: 1 })}
          >
            <Image source={CIRCLE_ADD_IMAGE} style={styles.icon} />
          </TouchableOpacity>
        </ImageBackground>
      </KeyboardAwareScrollView>

      <ImageAction onChange={handleImageChange} />
    </>
  );
};
export default CreateProfile;

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
    marginTop: 100,
    marginBottom: 20,
    // marginVertical: 20,
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
    top: 30,
    resizeMode: "contain",
    shadowColor: "#000",
    padding: 10,
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
});
