import React, { useEffect } from "react";
import Navigation from "./src/Navigation";
import {
  requestNotificationPermission,
  notificationListener,
} from "./src/Helper/notificationServices";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { store, persistor } from "./src/Redux";
import { PersistGate } from "redux-persist/integration/react";
import Toast from "react-native-toast-message";
import { StripeProvider } from "@stripe/stripe-react-native";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    white: "#FFFFFF",
    black: "#000000",
    black80: "#000000CC",
    black60: "#00000099",
    primary: "#800203",
    primaryLite: "#FF5757",
    secondary: "#FF5F4B",
    textPrimary: "#988053",
    textWhite: "#E1E1E1",
    primaryText: "#7D0102",
    primaryTextLite: "rgba(255, 87, 87, 1)",
    secondaryText: "#E1E1E1",
    lightGrey: "#E2E1E5",
    lightGreyLite: "rgba(0, 0, 0, 0.7)",
    accent: "#DADADA",
    accent2: "#D2D2D2",
    textLiteBlack: "#3E4347",
    lightGrey2: "#888787",
    lightGrey3: "#808080",
    lightGreen: "#00AA25",
  },
};

const App = () => {
  useEffect(() => {
    requestNotificationPermission();
    notificationListener();
  }, []);

  // const stripe_key =
  //   "pk_test_51LMmtdLL45J7AGRLjUaAS4c25zDrzkck18lSaN114cbrZhB4twbqblJQpFWyTA5jZZYVTzKXTIyKeHO05rcUOvMx00hC193aFL";
  const stripe_key = "pk_test_y7muYNN027E922VeFVm0rHFz00TXWYb448";

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={theme}>
            <StripeProvider publishableKey={stripe_key}>
              <Navigation />
            </StripeProvider>
          </PaperProvider>
        </PersistGate>
      </Provider>
      <Toast />
    </>
  );
};

export default App;
