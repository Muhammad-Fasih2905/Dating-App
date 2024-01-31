import * as React from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { Text, View, StyleSheet, Image } from 'react-native';
import MASTERCARD from '../../assets/Images/master-card.jpg'
const ImageInput = props => {
  const {colors} = useTheme();

  return (
    <View style={styles.cardNumberView}>
      <TextInput
      mode={props.mode || "outlined"}
      outlineColor={props.outlineColor || colors.white}
      activeOutlineColor={props.activeOutlineColor || colors.white}
      underlineColorAndroid={props.underlineColorAndroid || "transparent"}
      style={props.style || {fontSize: 16, height: '100%', marginBottom:5, width: '90%'}}
      {...props}
      />
      <Image source={MASTERCARD} style={props.imageStyle} />
      {/* {Boolean(props.error?.[0]) && (
        <Text style={[styles.error, {color: colors.error}]}>
          {props.error?.[0]}
        </Text>
      )} */}
    </View>
  );
};

export default ImageInput;

const styles = StyleSheet.create({
  cardNumberView: {
    backgroundColor:'white', 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center', 
    borderRadius:12, 
    height:60, 
    paddingRight:10, 
    marginBottom:5
  },
  
  error: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    marginVertical: 5,
  },
});
