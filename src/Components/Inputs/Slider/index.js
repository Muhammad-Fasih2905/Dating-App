import React, { useCallback, useState } from "react"
import { View, Text } from "react-native"
import Slider from "rn-range-slider"

import Thumb from "./Thumb"
import Rail from "./Rail"
import RailSelected from "./RailSelected"
import Notch from "./Notch"
import Label from "./Label"

import styles from "./styles"
import { useTheme } from "react-native-paper"
const SliderScreen = ({ handleValueChange, low, high }) => {
  const { colors } = useTheme()
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(100)

  const renderThumb = useCallback(() => <Thumb />, [])
  const renderRail = useCallback(() => <Rail />, [])
  const renderRailSelected = useCallback(() => <RailSelected />, [])
  const renderLabel = useCallback(value => <Label text={value} />, [])
  const renderNotch = useCallback(() => <Notch />, [])

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={[styles.text, { color: colors.black }]}>
          Distance range (miles)
        </Text>
      </View>
      <Slider
        style={styles.slider}
        min={min}
        max={max}
        step={1}
        floatingLabel={true}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
    </View>
  )
}

export default SliderScreen
