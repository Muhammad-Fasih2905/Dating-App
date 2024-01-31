import React, { useState } from "react"
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native"

import { useTheme } from "react-native-paper"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import DatePicker from "react-native-date-picker"
import moment from "moment"
const DatePickerInput = props => {
  const { colors } = useTheme()
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const textPrimaryColor = colors.textPrimary
  const textWhiteColor = colors.textWhite

  return (
    <>
      <Text style={[styles.label, { color: colors.white }]}>{props.title}</Text>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={[styles.button, { backgroundColor: colors.white }]}
        disabled={false}
      >
        <Text
          style={[
            styles.text,
            {
              color: colors.black,
              fontSize: 16,
              marginLeft: 5,
              fontFamily: "OpenSans-Light"
            }
          ]}
        >
          {Boolean(props.value)
            ? moment(props.value).format(
                props.mode === "date" ? "yyyy-MMM-DD" : "HH:mm A"
              )
            : ""}
        </Text>
        <FontAwesome
          name={props?.icon || "calendar"}
          size={20}
          color={colors.primary}
          style={styles.icon}
        />
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date}
        mode={props.mode || "date"}
        onConfirm={date => {
          setOpen(false)
          props.onChange(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        {...props}
      />
      {Boolean(props.error?.[0]) && (
        <Text style={[styles.error, { color: colors.white }]}>
          {props.error?.[0]}
        </Text>
      )}
    </>
  )
}

export default DatePickerInput

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    maxHeight: 48,
    minHeight: 48,

    padding: 5,
    marginTop: 7,
    // borderWidth: 1,
    width: "90%"
  },
  label: {
    marginTop: 0,
    fontSize: 15,
    fontFamily: "OpenSans-Regular",
    marginBottom: 2
  },
  icon: {
    marginRight: 5
  },
  error: {
    fontSize: 12,
    fontFamily: "OpenSans-Regular",
    marginVertical: 5
  }
})
