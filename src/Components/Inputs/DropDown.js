import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { Dropdown as DropDownPicker } from "react-native-element-dropdown";
import { useTheme } from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";

function DropDown({ value, onChangeText, items, disabled, ...props }) {
  const { colors } = useTheme();
  const [isFocus, setIsFocus] = useState(false);

  const handleValueChange = (item) => {
    setIsFocus(false);
    onChangeText && onChangeText(item?.value);
  };

  return (
    <>
      <Text style={[styles.label, { color: colors.black }]}>{props.title}</Text>
      <DropDownPicker
        data={items}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleValueChange}
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search={props.search}
        maxHeight={300}
        dropdownPosition="auto"
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? props.placeholder : "..."}
        searchPlaceholder="Search..."
        disable={disabled}
        renderRightIcon={() => (
          <Entypo
            name={!isFocus ? "chevron-thin-down" : "chevron-thin-up"}
            style={styles.icon}
            color={colors.primaryLite}
            size={16}
          />
        )}
      />
      {Boolean(props.error?.[0]) && (
        <Text style={[styles.error, { color: colors.error }]}>
          {props.error?.[0]}
        </Text>
      )}
    </>
  );
}

export default DropDown;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "white",
    marginTop: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    // position: "absolute",
    // backgroundColor: "white",
    // left: 2,
    // top: -4,
    // zIndex: 999,
    // paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: "OpenSans-Light",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
