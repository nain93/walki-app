import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Platform, TouchableOpacity } from "react-native";
import OnBoarding from "../screens/onBoarding";
import CoachSelect from "../screens/coachSelect";
import BeforeStart from "../screens/beforeStart";
import { theme } from "../styles/theme";
import SettingScreen from "../screens/setting";
import EditName from "../screens/setting/EditName";
import AlertSetting from "../screens/setting/AlertSetting";
import TabNavigator from "./TabNav";
import LeftIcon from "react-native-vector-icons/AntDesign";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../../apollo";
import ChallengeSetting from "../screens/coachSelect/ChallengeSetting";
import AppSetting from "../screens/setting/AppSetting";
import OpenSource from "../screens/setting/OpenSource";
import Service from "../screens/terms/Service";
import Info from "../screens/terms/Info";
import TermsCheck from "../screens/terms/TermsCheck";
import CloseIcon from "../components/CloseIcon";

const TransitionScreenOptions = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
};
const Stack = createStackNavigator();

const GlobalNav = () => {
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
          name="SettingScreen"
          options={{
            title: "설정",
            headerTitleAlign: "center",
            headerTitleStyle: { fontSize: 16, fontWeight: "700" },
            headerLeft: () => null,
            headerRight: (props) => <CloseIcon {...props} />,
            headerStyle: {
              backgroundColor: theme.grayScale.white,
              elevation: 0, // android
              shadowOpacity: 0, //ios
            },
          }}
          component={SettingScreen}
        />
        <Stack.Screen
          name="EditName"
          options={({ navigation }) => ({
            title: "",
            headerLeft: () => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{ marginLeft: 20 }}
                >
                  <LeftIcon name="left" size={24} />
                </TouchableOpacity>
              );
            },
            headerStyle: {
              backgroundColor: theme.grayScale.white,
              elevation: 0, // android
              shadowOpacity: 0, //ios
            },
          })}
          component={EditName}
        />
        <Stack.Screen
          name="AlertSetting"
          options={{
            title: "",
            headerLeft: () => null,
            headerRight: (props) => <CloseIcon {...props} />,
            headerStyle: {
              backgroundColor: theme.grayScale.white,
              elevation: 0, // android
              shadowOpacity: 0, //ios
            },
          }}
          component={AlertSetting}
        />
        <Stack.Screen
          name="AppSetting"
          options={({ navigation }) => ({
            title: "",
            headerLeft: () => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{ marginLeft: 20 }}
                >
                  <LeftIcon name="left" size={24} />
                </TouchableOpacity>
              );
            },
            headerStyle: {
              backgroundColor: theme.grayScale.white,
              elevation: 0, // android
              shadowOpacity: 0, //ios
            },
          })}
          component={AppSetting}
        />
        <Stack.Screen
          name="OpenSource"
          options={({ navigation }) => ({
            title: "오픈소스 라이센스",
            headerLeft: () => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{ marginLeft: 20 }}
                >
                  <LeftIcon name="left" size={24} />
                </TouchableOpacity>
              );
            },
            headerStyle: {
              backgroundColor: theme.grayScale.white,
              elevation: 0, // android
              shadowOpacity: 0, //ios
            },
          })}
          component={OpenSource}
        />
        {/* 이용약관 */}
        <Stack.Screen
          name="TermsCheck"
          options={{
            headerTitleAlign: "center",
            title: "약관확인",
            headerLeft: () => null,
            headerRight: (props) => <CloseIcon {...props} />,
            headerStyle: {
              backgroundColor: theme.grayScale.white,
              elevation: 0, // android
              shadowOpacity: 0, //ios
            },
          }}
          component={TermsCheck}
        />
        <Stack.Screen
          name="Service"
          options={{
            headerTitleAlign: "center",
            title: "서비스 이용약관",
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
        <Stack.Screen
          name="ChallengeSetting"
          options={{
            title: "",
            headerLeft: () => null,
            headerRight: (props) => <CloseIcon {...props} />,
            headerStyle: {
              backgroundColor: theme.grayScale.white,
              elevation: 0, // android
              shadowOpacity: 0, //ios
            },
          }}
          component={ChallengeSetting}
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

export default GlobalNav;
