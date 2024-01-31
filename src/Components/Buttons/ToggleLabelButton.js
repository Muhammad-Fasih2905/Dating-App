import React from "react"

import { useTheme } from "react-native-paper"
import ToggleSwitch from "toggle-switch-react-native"

const ToggleLabelButton = ({
  containerStyle = {},
  text = "",
  isOn = false,
  onColor = colors.primary,
  offColor = colors.primary,
  lableStyle = {},
  loading = false,
  toggleFunc = () => {},
}) => {
  const { colors } = useTheme()

  return (
    <ToggleSwitch
        style={containerStyle}
        isOn={isOn}
        onColor={onColor}
        offColor={offColor}
        label={text}
        labelStyle={lableStyle}
        onToggle={toggleFunc}
    />
  )
}

export default ToggleLabelButton