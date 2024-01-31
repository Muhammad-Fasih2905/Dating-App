import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import MyStatusBar from "../../../Components/MyStatusBar";
import { useTheme } from "react-native-paper";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenWrapper from "../../../Components/ScreenWrapper";
import CIRCLE_ADD_IMAGE from "./../../../assets/Images/circle-add.png";
import PROFILE_IMAGE_PLACEHOLDER from "./../../../assets/Images/profile.png";
import SimpleInput from "../../../Components/Inputs/SimpleInput";
import DropDown from "../../../Components/Inputs/DropDown";
import ImageAction from "../../../Components/ActionPopups/ImageAction";
import { SheetManager } from "react-native-actions-sheet";
import useLogicProfile from "./Hooks/useLogicProfile";
import Toast from "react-native-toast-message";

var regexOnlyLetters = /^[A-Za-z ]+$/;

const CreateProfile = ({ route }) => {
  const token = route?.params?.token;
  const phone = route?.params?.phoneNo;

  const { jobs, onSignup, setProfileImages } = useLogicProfile();

  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState(phone || "");
  const [bio, setBio] = useState("");
  const [occupation, setOccupation] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [jobField, setJobField] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleImageChange = (image, index) => {
    let timeNow = new Date().getTime();
    if (index === 1) {
      setProfileImage({
        uri: image.path,
        type: image.mime,
        name: `profile_${timeNow}.${image.mime.split("/")[1]}`,
      });
    }
  };

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
      !email.trim() ||
      !age.trim() ||
      !gender.trim() ||
      !phoneNo.trim() ||
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

    try {
      let reqObj = {
        name: name.trim(),
        email: email.trim(),
        age: age.trim(),
        phone: phoneNo.trim(),
        gender: gender.trim(),
        bio: bio.trim(),
        occupation: occupation.trim(),
        job_field: jobField,
        token,
      };

      if (typeof profileImage === "object" && profileImage !== null) {
        reqObj["profile_picture"] = profileImage;
      }

      let formData = dataToFormData(reqObj);
      await onSignup(formData);
    } catch (error) {
      console.log("Error While Creating User Profile! ", error);
      setLoading(false);
    } finally {
      setLoading(false);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Profile has been created successfully",
      });
    }
  };

  return (
    <>
      <MyStatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <ScreenWrapper isSignup={true} isMiniLogo={true} logoHeight={48} logo2>
          <View
            style={{
              ...styles.flex1,
              backgroundColor: "rgba(255, 192, 203, 0.1)",
              // alignItems: "center"
            }}
          >
            <View style={[styles.inputContainer, { marginTop: 100 }]}>
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
            <View style={styles.inputContainer}>
              <SimpleInput
                value={email}
                onChangeText={setEmail}
                placeholder={"Email"}
                title="Email"
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.email}
              />
            </View>
            <View style={styles.row}>
              <View style={[styles.flex1, { marginRight: 4, zIndex: 10000 }]}>
                <SimpleInput
                  value={age}
                  onChangeText={setAge}
                  placeholder={"Age"}
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
                value={phoneNo}
                // onChangeText={setPhoneNo}
                placeholder={"Phone number"}
                disable
                title="Phone number"
                error={errors.phone}
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

            <View style={[styles.inputContainer, { marginVertical: 25 }]}>
              <PrimaryButton
                text="Create Profile"
                height={70}
                onPress={handleSubmit}
                loading={loading}
              />
            </View>
          </View>
        </ScreenWrapper>

        <ImageBackground
          style={[styles.avatar]}
          imageStyle={{ borderRadius: 60, backgroundColor: colors.white }}
          source={
            profileImage?.uri
              ? { uri: profileImage.uri }
              : profileImage
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
