import React from "react";

import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

import { useTheme } from "react-native-paper";

const RoundSideButton = ({
  containerStyle = {},
  text = "",
  textStyle = {},
  loading = false,
  onPress = () => {},
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      {!loading ? (
        <Text style={[textStyle, { color: colors.textWhite }]}>{text}</Text>
      ) : (
        <ActivityIndicator
          style={{ marginVertical: 10 }}
          size="small"
          color="#fff"
        />
      )}
    </TouchableOpacity>
  );
};

export default RoundSideButton;
