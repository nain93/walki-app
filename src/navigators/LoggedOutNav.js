import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Platform } from "react-native";
import OnBoarding from "../screens/onBoarding";
import { theme, headerTitleStyle } from "../styles/theme";
import Service from "../screens/terms/Service";
import Info from "../screens/terms/Info";
import CloseIcon from "../components/CloseIcon";


const TransitionScreenOptions = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
};
const Stack = createStackNavigator();

const LoggedOutNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={Object.assign(
          {},
          Platform.OS === "android" && TransitionScreenOptions,
          { cardStyle: { backgroundColor: theme.grayScale.white } }
        )}
      >
        <Stack.Screen
          name="OnBoarding"
          options={{
            headerShown: false,
          }}
          component={OnBoarding}
        />
        <Stack.Screen
          name="Service"
          options={{
            headerTitleAlign: "center",
            title: "서비스 이용약관",
            headerTitleStyle,
            headerLeft: () => null,
            headerRight: (props) => <CloseIcon {...props} />,
            headerStyle: {
              backgroundColor: theme.grayScale.white,
              elevation: 0, // android
              shadowOpacity: 0, //ios
            },
          }}
          component={Service}
        />
        <Stack.Screen
          name="Info"
          options={{
            headerTitleAlign: "center",
            title: "개인정보 처리방침",
            headerTitleStyle,
            headerLeft: () => null,
            headerRight: (props) => <CloseIcon {...props} />,
            headerStyle: {
              backgroundColor: theme.grayScale.white,
              elevation: 0, // android
              shadowOpacity: 0, //ios
            },
          }}
          component={Info}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoggedOutNav;
