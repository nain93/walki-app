import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Home from "../screens/home";
import { Image, Platform, TouchableOpacity } from "react-native";
import OnBoarding from "../screens/onBoarding";
import CoachSelect from "../screens/coachSelect";
import BeforeStart from "../screens/beforeStart";
import { theme } from "../styles/theme";
import LogoTitle from "../components/LogoTitle";
import SettingLogoTitle from "../components/SettingLogoTitle";
import SettingScreen from "../screens/setting";
import closeIcon from "../../assets/icons/close.png";
import { useNavigation } from "@react-navigation/native";
import EditName from "../screens/setting/EditName";
import LeftIcon from "react-native-vector-icons/AntDesign";

const TransitionScreenOptions = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
};
const Stack = createStackNavigator();

const CloseIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={closeIcon}
        resizeMode="contain"
        style={{ width: 24, height: 24, marginRight: 20 }}
      />
    </TouchableOpacity>
  );
};

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
          name="EditName"
          options={{
            title: "",

            headerLeft: ({ navigation }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    console.log(navigation);
                  }}
                >
                  <LeftIcon name="left" size={24} />
                </TouchableOpacity>
              );
            },

            headerStyle: {
              backgroundColor: "transparent",
              elevation: 0, // android
              shadowOpacity: 0, //ios
            },
          }}
          component={EditName}
        />
        <Stack.Screen
          name="SettingScreen"
          options={{
            title: "설정",
            headerTitleAlign: "center",
            headerTitleStyle: { fontSize: 16, fontWeight: "700" },
            headerLeft: () => null,
            headerRight: (props) => <CloseIcon {...props} />,
            headerStyle: {
              backgroundColor: "transparent",
              elevation: 0, // android
              shadowOpacity: 0, //ios
            },
          }}
          component={SettingScreen}
        />
        <Stack.Screen
          name="Home"
          options={{
            title: "",
            headerLeft: (props) => <LogoTitle {...props} />,
            headerRight: (props) => <SettingLogoTitle {...props} />,
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
