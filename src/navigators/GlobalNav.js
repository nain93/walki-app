import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack"
import Home from "../screens/home/Home"
import LogoTitle from "../components/LogoTitle"
import OnBoarding from "../screens/onBoarding"
import CoachSelect from "../screens/coachSelect"
import { Platform } from "react-native"

const TransitionScreenOptions = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
}
const Stack = createStackNavigator()

const GlobalNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={Platform.OS === "android" && TransitionScreenOptions}>
        {/* <Stack.Screen
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
        /> */}
        <Stack.Screen
          name="Home"
          options={{
            headerTitle: props => <LogoTitle {...props} />,
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
  )
}

export default GlobalNav
