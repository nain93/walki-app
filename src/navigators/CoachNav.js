import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Platform } from "react-native";
import CoachSelect from "../screens/coachSelect";
import BeforeStart from "../screens/beforeStart";
import { theme } from "../styles/theme";
import TabNavigator from "./TabNav";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../../apollo";

const TransitionScreenOptions = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
};
const Stack = createStackNavigator();

const CoachNav = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={Object.assign(
          {},
          Platform.OS === "android" && TransitionScreenOptions,
          { cardStyle: { backgroundColor: theme.grayScale.white } }
        )}
      >
        {!isLoggedIn && (
          <Stack.Screen
            name="OnBoarding"
            options={{
              headerShown: false,
            }}
            component={OnBoarding}
          />
        )}
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
          name="TabNavigator"
          component={TabNavigator}
          options={{ gestureEnabled: false, headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default CoachNav;
