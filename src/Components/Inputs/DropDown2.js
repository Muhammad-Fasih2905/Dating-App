import React, { useState } from "react"
import DropDownPicker from "react-native-dropdown-picker"
import { useTheme } from "react-native-paper"
import { Text, StyleSheet, View } from "react-native"
import Entypo from "react-native-vector-icons/Entypo"
function DropDown({ value, onChangeText, items, disabled, ...props }) {
  const { colors } = useTheme()
  const [open, setOpen] = useState(false)
  return (
    <>
      <Text style={[styles.label, { color: colors.black }]}>{props.title}</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={onChangeText}
        style={{
          borderColor: colors.lightGrey,
          height: 54,
          marginTop: 6
        }}
        labelStyle={{
          color: colors.black,
          fontFamily: "OpenSans-Light"
        }}
        dropDownContainerStyle={{
          borderColor: colors.lightGrey
        }}
        arrowIconStyle={{
          borderColor: colors.primary
        }}
        placeholder={props.placeholder}
        placeholderStyle={{
          color: colors.black,
          fontFamily: "OpenSans-Light"
        }}
        ArrowUpIconComponent={({ style }) => (
          <Entypo
            name="chevron-thin-up"
            style={style}
            color={colors.primaryLite}
            size={16}
          />
        )}
        ArrowDownIconComponent={({ style }) => (
          <Entypo
            name="chevron-thin-down"
            style={style}
            color={colors.primaryLite}
            size={16}
          />
        )}
        listMode="SCROLLVIEW"
        //   setItems={setItems}
        disabled={disabled}
      />
      {Boolean(props.error?.[0]) && (
        <Text style={[styles.error, { color: colors.error }]}>
          {props.error?.[0]}
        </Text>
      )}
    </>
  )
}

export default DropDown

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontFamily: "OpenSans-Light",
    marginBottom: 2
  },
  error: {
    fontSize: 12,
    fontFamily: "OpenSans-Regular",
    marginVertical: 5
  }
})
