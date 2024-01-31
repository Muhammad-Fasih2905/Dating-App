import React from "react";
import { Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AUTH_ROUTES, MAIN_ROUTES } from "./Routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./CustomDrawer";
import navigationService from "./navigationService";
const width = Dimensions.get("window").width;

const Drawer = createDrawerNavigator();

const MainStack = createNativeStackNavigator();
const MainNavigation = ({}) => {
  const user = useSelector((state) => state?.userReducer?.accessToken);
  // console.log(user)
  // const user = null
  return (
    <NavigationContainer
      ref={(ref) => navigationService.setTopLevelNavigator(ref)}
      screenOptions={{
        headerShown: false,
      }}
    >
      {!user ? (
        <MainStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {AUTH_ROUTES.map((screen, index) => (
            <MainStack.Screen
              key={index}
              name={screen.path}
              component={screen.component}
            />
          ))}
        </MainStack.Navigator>
      ) : (
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              width: width - 30,
            },
          }}
          drawerContent={(props) => <CustomDrawer {...props} />}
        >
          {MAIN_ROUTES.map((screen, index) => (
            <Drawer.Screen
              key={index}
              name={screen.path}
              component={screen.component}
              options={screen.options}
            />
          ))}
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MainNavigation;
