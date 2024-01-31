import React from "react";
import { ActivityIndicator, Text } from "react-native";
import { useTheme } from "react-native-paper";

const ListEmptyComponent = ({ loading, message }) => {
  const { colors } = useTheme();
  return loading ? (
    <ActivityIndicator
      style={{ marginTop: 20 }}
      size="large"
      color={colors.primary}
    />
  ) : (
    <Text
      style={{
        textAlign: "center",
        marginTop: 10,
        color: colors.backdrop,
      }}
    >
      {message}
    </Text>
  );
};

const ListHeaderComponent = ({ loading }) => {
  const { colors } = useTheme();
  return loading ? (
    <ActivityIndicator
      style={{ marginVertical: 8 }}
      size="large"
      color={colors.primary}
    />
  ) : null;
};

const ListFooterComponent = ({ loading }) => {
  const { colors } = useTheme();
  return loading ? (
    <ActivityIndicator
      style={{ marginVertical: 10 }}
      size="large"
      color={colors.primary}
    />
  ) : null;
};

export { ListEmptyComponent, ListHeaderComponent, ListFooterComponent };
