import React, { useState, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";

import ModalHeader from "./../ModalHeader";
import DropDown from "../Inputs/DropDown";
import Slider from "../Inputs/Slider";
import PrimaryButton from "../Buttons/PrimaryButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import useSearch from "./../../screens/mainFlow/Search/Hooks/useSearch";
import { FILTER_RECOMMENDED } from "../../Redux/types";

const SearchModal = ({ visible, onClose, onSearch }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const { user, updateProfile, loading } = useSearch();
  const { timePref, adventurePref, jobs } = useSelector(
    (state) => state.configReducer
  );
  const { timePreference, adventurePreference, careerFields } = useSelector(
    (state) => state.userReducer.recommendedSnaksFilter
  );

  const [isModify, setIsModify] = useState(false);
  const [time, setTime] = useState(null);
  const [adventure, setAdventure] = useState(null);
  const [career, setCareer] = useState(null);
  const [age, setAge] = useState(null);
  const [ageFrom, setAgeFrom] = useState(null);
  const [expLv, setExpLv] = useState(null);
  const [sportType, setSportType] = useState(null);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(50);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
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

  const optionsArray = adventure == 1 ? jobs : adventure == 2 ? [] : [];

  const handleChange = (setState, value) => {
    setState(value);
    setIsModify(true);
  };

  const handleSubmit = () => {
    // const data = {
    //   time_preference: time,
    //   adventure_preference: adventure,
    //   job_field: career,
    //   distance_range_start: low,
    //   distance_range_end: high,
    // };
    // updateProfile(data)
    //   .then(() => {
    //     onSearch();
    //     onClose();
    //   })
    //   .catch((err) => {
    //     console.log("Error ==> ", err);
    //   });
    let filter = {
      timePreference: time,
      adventurePreference: adventure,
      careerFields: career,
    };
    dispatch({ type: FILTER_RECOMMENDED, payload: filter });
    onClose();
    // onSearch();
  };

  const handleClearFilters = () => {
    let filter = {
      timePreference: null,
      adventurePreference: null,
      careerFields: null,
    };
    dispatch({ type: FILTER_RECOMMENDED, payload: filter });
    onSearch();
    onClose();

    setIsModify(false);
    setTime(null);
    setAdventure(null);
    setCareer(null);
    setAge(null);
    setAgeFrom(null);
    setExpLv(null);
    setSportType(null);
    setLow(0);
    setHigh(50);
  };

  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      hasBackdrop={true}
      backdropOpacity={1}
      coverScreen={false}
      backdropColor={colors.white}
      style={{
        padding: 0,
        margin: 0,
        flex: 1,
      }}
    >
      <ModalHeader onClose={onClose} />
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.input}>
            <DropDown
              value={time || timePreference}
              onChangeText={(newValue) => handleChange(setTime, newValue)}
              // onChangeText={setTime}
              items={timePref?.data?.map((v) => {
                return { label: v.title, value: v.id, key: v.id };
              })}
              placeholder={"Time preference"}
              title="Time preference"
            />
          </View>
          <View style={styles.input}>
            <DropDown
              value={adventure || adventurePreference}
              onChangeText={(newValue) => handleChange(setAdventure, newValue)}
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
                value={career || careerFields}
                onChangeText={(newValue) => handleChange(setCareer, newValue)}
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
                  onChangeText={(newValue) => handleChange(setExpLv, newValue)}
                  // onChangeText={setExpLv}
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
                  // value={adventure}
                  // onChangeText={null}
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

          {isModify || timePreference || adventurePreference || careerFields ? (
            <TouchableOpacity
              onPress={handleClearFilters}
              style={{
                backgroundColor: colors.primary,
                height: 48,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                paddingHorizontal: 20,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                Clear Filters
              </Text>
            </TouchableOpacity>
          ) : null}

          <View style={styles.btn}>
            <PrimaryButton
              text="Search Snak"
              height={70}
              onPress={handleSubmit}
              loading={loading}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingHorizontal: 30,
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
