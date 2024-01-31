import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useTheme} from 'react-native-paper';

const styles = StyleSheet.create({
  root: {
    // padding: 20,
    // justifyContent: 'center',
    margin: 0,
    padding: 0,
    // maxWidth: '100%',
    // alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {textAlign: 'center', fontSize: 30, fontFamily: 'OpenSans-Bold'},
  codeFieldRoot: {marginTop: 15, maxWidth: '100%'},
  cell: {
    width: 75,
    height: 75,
    borderWidth: 1.5,
    // borderColor: '#00000030',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 15,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.95,

    elevation: 18,
  },
  focusCell: {
    // borderColor: '#000',
  },
  hasValue: {
    color: '#fff',
    fontFamily: 'OpenSans-Bold',
  },
});

const CELL_COUNT = 4;

const VerificationInput = ({value, onChange}) => {
  const {colors} = useTheme();
  // const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: onChange,
  });

  return (
    <SafeAreaView>
      <View style={styles.root}>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={onChange}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              key={index}
              style={[
                styles.cell,
                {borderColor: colors.white},
                {
                  backgroundColor: colors.white,
                },
              ]}>
              <Text
                style={[
                  symbol && {
                    color: colors.primary,
                    fontFamily: 'OpenSans-Bold',

                    // lineHeight: 40,
                    fontSize: 32,
                  },
                ]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default VerificationInput;
