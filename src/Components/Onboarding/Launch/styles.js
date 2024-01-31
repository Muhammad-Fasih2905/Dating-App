import { StyleSheet, Dimensions } from "react-native"
const { width, height } = Dimensions.get("window")
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#800203',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  logoStyle: {
    marginTop: 30,
    width: 120,
    height: 120,
    resizeMode: "contain"
    // marginBottom: 20,
    // marginTop: 40
  },
  title: {
    color: "#E1E1E1",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Open Sans",
    fontWeight: "600",
    fontSize: 22
  },
  subTitle: {
    color: "#E1E1E1",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Open Sans",
    fontWeight: "400",
    fontSize: 14,
    letterSpacing: 0.5
  },
  image2: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: -10,
    bottom: -41
  },
  bottomView: {
    position: "absolute",
    zIndex: 10,
    bottom: 20
  },
  buttonLabelStyle: {
    color: "#800203",
    fontSize: 18,
    paddingHorizontal: 25
  },
  indicatorView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20
  },
  spaceBetween: {
    width: 25
  },
  imageSmall: {
    height: 120,
    width: 120,
    resizeMode: "contain",
    zIndex: 10,
    margin: 5,
    position: "absolute"
    // bottom: 20,
  },
  imageBig: {
    height: width + 20,
    width: width + 50,
    resizeMode: "contain",
    zIndex: 10,
    margin: 5
  },
  imageContainer: {
    flex: 1
  },
  smallContainer: {
    // flexDirection: 'row',
  },
  position6: {
    bottom: -130,
    right: -120,
    height: 110,
    width: 110
  },
  position7: {
    bottom: -240,
    right: -200,
    height: 120,
    width: 120
  },

  position8: {
    bottom: -385,
    right: -185,
    height: 135,
    width: 135
  },

  position9: {
    bottom: -95,
    right: -5,
    height: 90,
    width: 90
  },
  position10: {
    bottom: -135,
    right: 90,
    height: 85,
    width: 85
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18
  },
  imageSlide1: {
    width: width - 20,
    height: height * 0.51,
    resizeMode: "contain"
  }
})
