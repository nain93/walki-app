import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Home from "../screens/home";
import { Platform } from "react-native";
import LogoTitle from "../components/LogoTitle";
import OnBoarding from "../screens/onBoarding";
import CoachSelect from "../screens/coachSelect";
import BeforeStart from "../screens/beforeStart";
import { theme } from "../styles/theme";

const TransitionScreenOptions = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
};
const Stack = createStackNavigator();
const GlobalNav = () => {
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
          name="CoachSelect"
          options={{
            headerShown: false,
          }}
          component={CoachSelect}
        />
        <Stack.Screen
          name="BeforeStart"
          options={{
            headerShown: false,
          }}
          component={BeforeStart}
        />
        <Stack.Screen
          name="Home"
          options={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerStyle: {
              backgroundColor: "transparent",
              elevation: 0, // android
              shadowOpacity: 0, //ios
            },
          }}
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default GlobalNav;
