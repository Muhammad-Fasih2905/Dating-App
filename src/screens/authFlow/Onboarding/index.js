import React, {useRef, useState} from 'react';
import {Text, View, Image} from 'react-native';
import {styles} from './styles';
import PagerView from 'react-native-pager-view';
import Launch1 from './../../../Components/Onboarding/Launch';
import Launch2 from './../../../Components/Onboarding/Launch2';
import {useTheme} from 'react-native-paper';
const Welcome = () => {
  const {colors} = useTheme();
  const pagerRef = useRef();
  const [pageNo, setPageNo] = useState(0);

  const onPageScroll = event => {
    const {position} = event.nativeEvent;
    if (position !== pageNo) {
      setPageNo(position);
    }
  };
  return (
    <PagerView
      style={[styles.container, {backgroundColor: colors.primaryColor}]}
      initialPage={0}
      ref={pagerRef}
      onPageScroll={onPageScroll}>
      <View key="1">
        <Launch1
          isActive={pageNo === 0}
          onIndicatorPress={e => pagerRef?.current?.setPage(e)}
        />
      </View>
      <View key="2">
        <Launch2
          isActive={pageNo === 1}
          onIndicatorPress={e => pagerRef?.current?.setPage(e)}
        />
      </View>
    </PagerView>
  );
};
export default Welcome;
