import React from "react"

import {
  View,
  StyleSheet,
  Text,
} from "react-native"

import { useTheme } from "react-native-paper"
const ChatMessageCard = ({ owner, message, time }) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.chatMsgView, {backgroundColor: owner ? colors.primaryLite : '#9FAACB26', borderTopLeftRadius:owner ? 8 : 0, borderTopRightRadius:owner ? 0 : 8, alignSelf:owner ? 'flex-end' : 'flex-start'}]}>
      <Text style={[ styles.chatMsg, {color: owner ? colors.white : colors.lightGrey3} ]}>{message}</Text>
      <Text style={[ styles.chatTime, {color: owner ? colors.white : colors.lightGrey3} ]}>{time}</Text>
    </View>
  )
}

export default ChatMessageCard

const styles = StyleSheet.create({
  chatMsgView: { 
    width:'75%', 
    padding:10, 
    borderRadius:8, 
    marginHorizontal:20, 
    marginBottom:15
  },
  chatMsg: { 
    fontSize:16
  },
  chatTime: {
    textAlign:'right', 
    fontSize:8
  }
})
