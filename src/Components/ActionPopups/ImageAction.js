import React, { useEffect, useState } from "react"
import ActionSheet, { SheetManager } from "react-native-actions-sheet"
import { View, StyleSheet, PermissionsAndroid, Alert } from "react-native"
import { useTheme } from "react-native-paper"
import ImagePicker from "react-native-image-crop-picker"

import SmallButton from "../Buttons/SmallButton"
import ActionButton from "../Buttons/ActionButton"
import CAMERA_IMAGE from "./../../assets/Images/camera.png"
import BROWSE_IMAGE from "./../../assets/Images/browse.png"

const ImageAction = ({ onChange }) => {
  const { colors } = useTheme()
  const [data, setData] = useState(null)

  // const handleGallery = async () => {
  //   try {
  //     const result = await ImagePicker.openPicker({
  //       width: 300,
  //       height: 400,
  //       cropping: true
  //     })

  //     console.log('result from image crop picker ===>> ', JSON.stringify(result, null, 2))
  //     console.log('data from ImageAction ===>> ', JSON.stringify(data, null, 2))

  //     if (result.didCancel) {
  //       return
  //     }
  //     onChange(result, data?.image)
  //     //   console.log(result);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const handleCamera = async () => {
  //   try {
  //     const result = await ImagePicker.openCamera({
  //       width: 300,
  //       height: 400,
  //       cropping: true,
  //     })

  //     console.log('result from image crop picker ===>> ', JSON.stringify(result, null, 2))
  //     console.log('data from ImageAction ===>> ', JSON.stringify(data, null, 2))

  //     if (result.didCancel) {
  //       return
  //     }
  //     onChange(result, data?.image)
  //     //   console.log(result);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleGallery = async () => {
    try {
      // const result = await launchImageLibrary({
      //   mediaType: "photo",
      //   quality: 0.5,
      //   selectionLimit: 1
      // })

      const result = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      })

      // console.log("result from image picker ==> ", result)
      // onChange(result.assets?.[0], data?.image)
      onChange(result, data?.image)

      if (result.didCancel) {
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCamera = async () => {
    try {
      // const result = await launchCamera({
      //   mediaType: "photo",
      //   quality: 0.5,
      //   selectionLimit: 1
      // })

      const result = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true
      })

      console.log("result from image crop picker ==> ", result)
      // onChange(result.assets[0], data?.image)
      onChange(result, data?.image)

      if (result.didCancel) {
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ActionSheet
      id="ImageAction"
      containerStyle={[
        styles.actionContainer,
        { backgroundColor: colors.primary }
      ]}
      onBeforeShow={data => {
        setData(data)
      }}
    >
      <View style={styles.actionSheet}>
        <View style={styles.content}>
          <View style={styles.actionSheetItem}>
            <ActionButton
              text="Take new photo"
              image={CAMERA_IMAGE}
              onPress={handleCamera}
            />
            <ActionButton
              text="Browse gallery"
              image={BROWSE_IMAGE}
              onPress={handleGallery}
            />
            <View style={styles.btnContainer}>
              <View style={styles.btn}>
                <SmallButton
                  text="Cancel"
                  onPress={() => SheetManager.hide("ImageAction")}
                />
              </View>
              <View style={{ flex: 1 }} />
              <View style={styles.btn}>
                <SmallButton
                  text="Set"
                  onPress={() => SheetManager.hide("ImageAction")}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ActionSheet>
  )
}

export default ImageAction

const styles = StyleSheet.create({
  actionSheetItem: {
    marginBottom: 0,
    marginHorizontal: 20
  },

  actionSheet: {
    marginBottom: 20,
    paddingBottom: 10
  },

  content: {
    paddingHorizontal: 25,
    paddingVertical: 10
  },
  actionContainer: {
    borderRadius: 15,
    marginBottom: -10
  },

  btnContainer: {
    flexDirection: "row",
    marginVertical: 10,
    marginTop: 30

    // backgroundColor: 'pink',
  },
  btn: {
    flex: 2.5,
    // height: 50,
    padding: 5
  }
})
