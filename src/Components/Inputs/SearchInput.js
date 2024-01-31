import React, { useState, useEffect } from "react"
import { TextInput, useTheme } from "react-native-paper"
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import FILTER_IMAGE from "../../assets/Images/filter.png"

const SearchInput = props => {
  const { colors } = useTheme()
  const [searchModal, setSearchModal] = useState(false)
  return (
    <>
      <TextInput
        mode="outlined"
        outlineColor={colors.primaryText}
        activeOutlineColor={colors.primaryText}
        theme={{
          colors: {
            text: colors.primaryText,
            placeholder: colors.primaryText,
            background: "rgba(255, 255, 255, 0.75)"
          },
          fonts: {
            fontFamily: "OpenSans-Regular"
          },
          roundness: 12
        }}
        style={{
          fontSize: 16,
          height: 40,
          margin: 20,
          marginVertical: 10,
          marginTop: 0
        }}
        {...props}
        left={
          <TextInput.Icon
            name={() => (
              <EvilIcons
                name={"search"}
                style={styles.icon}
                color={colors.primaryText}
                size={28}
              />
            )}
            color={colors.primaryText}
            size={30}
            onPress={props?.onPress}
          />
        }
      />
      {Boolean(props.error?.[0]) && (
        <Text style={[styles.error, { color: colors.error }]}>
          {props.error?.[0]}
        </Text>
      )}
    </>
  )
}

export default SearchInput

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    marginTop: 12
    // minHeight: 50,
  },
  label: {
    fontSize: 15,
    fontFamily: "OpenSans-Regular",
    marginBottom: 2
  },
  error: {
    fontSize: 12,
    fontFamily: "OpenSans-Regular",
    marginVertical: 5
  },
  icon: {
    marginBottom: -6,
    marginLeft: -5
  }
})
