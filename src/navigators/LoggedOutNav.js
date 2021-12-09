import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Platform } from "react-native";
import OnBoarding from "../screens/onBoarding";
import { theme } from "../styles/theme";


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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoggedOutNav;
