import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import {useTheme} from 'react-native-paper';

const ComponentHeader = ({title, componentIcon}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: colors.primaryText}]}>{title}</Text>
      {Boolean(componentIcon) && componentIcon}
    </View>
  );
};

export default ComponentHeader;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'pink',
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'NunitoSans-Bold',
  },
});
