import React from 'react'
import {View, SafeAreaView, StatusBar} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const MyStatusBar = ({backgroundColor, ...props}) => {
    const insets = useSafeAreaInsets();
    return(
    <View style={{ backgroundColor, height: insets.top }}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
)};

export default MyStatusBar