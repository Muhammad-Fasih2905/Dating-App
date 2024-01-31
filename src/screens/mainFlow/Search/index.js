import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import ToggleSwitch from "toggle-switch-react-native";

import ModalHeader from "./../../../Components/ModalHeader";
import DropDown from "./../../../Components/Inputs/DropDown";
import Slider from "./../../../Components/Inputs/Slider";
import PrimaryButton from "./../../../Components/Buttons/PrimaryButton";
import { HOME_PATH } from "../../../Navigation/Routes";
import useSearch from "./Hooks/useSearch";

const Search = ({ navigation }) => {
  const { user, updateProfile, loading } = useSearch();
  const { colors } = useTheme();
  const [time, setTime] = useState(null);
  const [adventure, setAdventure] = useState(null);
  const [age, setAge] = useState(null);
  const [ageFrom, setAgeFrom] = useState(null);
  const [gender, setGender] = useState("");
  const [expLv, setExpLv] = useState(null);
  const [sportType, setSportType] = useState(null);
  const [career, setCareer] = useState(null);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(50);
  const [amAvailable, setAmAvailable] = useState(false);
  const timePref = useSelector((state) => state.configReducer.timePref);
  const adventurePref = useSelector(
    (state) => state.configReducer.adventurePref
  );
  const jobs = useSelector((state) => state.configReducer.jobs);

  // const accessToken = useSelector(state => state?.userReducer?.accessToken)
  // console.log("Access Token ==> ", accessToken)

  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);

  const handleSubmit = () => {
    const data = {
      time_preference: time,
      adventure_preference: adventure,
      // gender,
      // age,
      job_field: career,
      distance_range_start: low,
      distance_range_end: high,
      is_available: amAvailable,
    };

    // console.log("DAta ===> ", data);

    updateProfile(data);
  };

  useEffect(() => {
    if (user?.snak_profile) {
      user.snak_profile.time_preference &&
        setTime(user.snak_profile.time_preference);
      user.snak_profile.adventure_preference &&
        setAdventure(user.snak_profile.adventure_preference);
      user.snak_profile.age && setAge(user.snak_profile.age);
      user.snak_profile.gender && setGender(user.snak_profile.gender);
      user.snak_profile.career && setCareer(user.snak_profile.career);
      user.snak_profile.distance_range_start &&
        setLow(user.snak_profile.distance_range_start);
      user.snak_profile.distance_range_end &&
        setHigh(user.snak_profile.distance_range_end);
      user.snak_profile.is_available &&
        setAmAvailable(user.snak_profile.is_available);
    }
  }, []);

  let sportsSnak = [
    {
      id: 1,
      title: "Baseball",
      value: "Baseball",
    },
    {
      id: 2,
      title: "Basketball",
      value: "Basketball",
    },
    { id: 3, title: "Bowling", value: "Bowling" },
    { id: 4, title: "Cycling", value: "Cycling" },
    {
      id: 5,

      title: "Dodgeball",
      value: "Dodgeball",
    },
    {
      id: 6,
      title: "Fishing",
      value: "Fishing",
    },
    { id: 7, title: "Football", value: "Football" },
    { id: 8, title: "Golf", value: "Golf" },
    {
      id: 9,
      title: "Handball",
      value: "Handball",
    },
    {
      id: 10,
      title: "Hiking",
      value: "Hiking",
    },
    {
      id: 11,
      title: "Kayaking/Paddleboarding",
      value: "Kayaking/Paddleboarding",
    },

    {
      id: 12,
      title: "Mountain Biking",
      value: "Mountain Biking",
    },
    {
      id: 13,
      title: "Pickleball",
      value: "Pickleball",
    },
    {
      id: 14,
      title: "Skiing / Snowboarding",
      value: "Skiing / Snowboarding",
    },
    {
      id: 15,
      title: "Soccer",
      value: "Soccer",
    },
    {
      id: 16,
      title: "Tennis",
      value: "Tennis",
    },
    {
      id: 17,
      title: "Volleyball",
      value: "Volleyball",
    },
  ];
  let level = [
    {
      id: 1,
      title: "Biginner",
      value: "Biginner",
    },
    {
      id: 2,
      title: "Intermediate",
      value: "Intermediate",
    },
    {
      id: 3,
      title: "Advanced",
      value: "Advanced",
    },
  ];

  // const optionsArray = adventure == 2 ? sportsSnak : jobs
  const optionsArray = adventure == 1 ? jobs : adventure == 2 ? [] : [];

  return (
    <View
      style={{
        padding: 0,
        margin: 0,
        flex: 1,
      }}
    >
      <ModalHeader onClose={() => navigation.navigate(HOME_PATH)} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.container}>
          <View style={styles.input}>
            <DropDown
              value={time}
              onChangeText={setTime}
              items={timePref?.data?.map((v) => {
                return { label: v.title, value: v.id, key: v.id };
              })}
              placeholder={"Time preference"}
              title="Time preference"
            />
          </View>
          <View style={styles.input}>
            <DropDown
              value={adventure}
              onChangeText={setAdventure}
              items={adventurePref?.data?.map((v) => {
                return { label: v?.title, value: v?.id };
              })}
              placeholder={"Adventure preference"}
              title="Adventure preference"
            />
          </View>
          {adventure == 1 && (
            <View style={styles.input}>
              <DropDown
                value={career}
                onChangeText={setCareer}
                items={optionsArray.map((v) => ({
                  label: v?.title,
                  value: v?.id,
                  key: v?.id,
                }))}
                placeholder={
                  adventure == 1
                    ? "Career field"
                    : adventure == 2
                    ? "Sport"
                    : adventure == 3
                    ? "Romance"
                    : adventure == 4
                    ? "Friendly"
                    : ""
                }
                title={
                  adventure == 1
                    ? "Career field"
                    : adventure == 2
                    ? "Sport Field"
                    : adventure == 3
                    ? "Romance"
                    : adventure == 4
                    ? "Friendly"
                    : ""
                }
              />
            </View>
          )}

          {adventure == 2 ? (
            <View style={[styles.row, styles.input]}>
              <View style={[styles.flex, { marginRight: 10 }]}>
                <DropDown
                  value={expLv}
                  onChangeText={setExpLv}
                  items={level.map((v) => ({
                    label: v?.title,
                    value: v?.id,
                    key: v?.id,
                  }))}
                  placeholder={"Expertise Lv."}
                  title="Expertise Level"
                />
              </View>

              <View style={[styles.flex]}>
                <DropDown
                  value={sportType}
                  onChangeText={setSportType}
                  items={sportsSnak.map((v) => ({
                    label: v?.title,
                    value: v?.id,
                    key: v?.id,
                  }))}
                  placeholder={"Types of Sp."}
                  title="Types of Sports"
                  search
                />
              </View>
            </View>
          ) : null}

          {adventure == 3 ? (
            <>
              <View style={[styles.row, styles.input]}>
                <View style={[styles.flex, { marginRight: 10 }]}>
                  <DropDown
                    value={age}
                    onChangeText={setAge}
                    items={Array.from({ length: 100 - 18 + 1 }, (_, index) => ({
                      label: (18 + index).toString(),
                      value: (18 + index).toString(),
                      key: index,
                    }))}
                    placeholder={"Age"}
                    title="Age From"
                    search
                  />
                </View>

                <View style={[styles.flex]}>
                  <DropDown
                    value={ageFrom}
                    onChangeText={setAgeFrom}
                    items={Array.from({ length: 100 - 18 + 1 }, (_, index) => ({
                      label: (18 + index).toString(),
                      value: (18 + index).toString(),
                      key: index,
                    }))}
                    placeholder={"Age"}
                    title="Age To"
                    search
                  />
                </View>
              </View>

              <View style={[{ zIndex: 600 }, styles.input]}>
                <DropDown
                  value={gender}
                  onChangeText={setGender}
                  items={["male", "female", "non-binary"]?.map((v, index) => {
                    return { label: v, value: v, key: index };
                  })}
                  placeholder={"Gender"}
                  title="Gender"
                />
              </View>
            </>
          ) : null}

          <Slider low={low} high={high} onValueChanged={handleValueChange} />
          <View style={styles.btn}>
            <PrimaryButton
              text="Search Snak"
              height={70}
              onPress={handleSubmit}
              loading={loading}
            />
          </View>
          <View style={styles.toggle}>
            <ToggleSwitch
              isOn={amAvailable}
              onColor={colors.primary}
              offColor={colors.primary}
              label="Make myself available"
              labelStyle={{
                color: colors.black,
                fontFamily: "OpenSans-Regular",
                marginRight: 25,
              }}
              onToggle={setAmAvailable}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingHorizontal: 30,
  },
  inputContainer1: {
    zIndex: 3000,
  },
  inputContainer2: {
    zIndex: 2000,
  },
  inputContainer3: {
    zIndex: 1000,
  },
  input: {
    marginVertical: 7,
  },
  btn: {
    marginVertical: 30,
  },
  toggle: {
    alignItems: "center",
    marginBottom: 20,
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
});
