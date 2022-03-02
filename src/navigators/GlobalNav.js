import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Platform, TouchableOpacity } from "react-native";
import CoachSelect from "../screens/coachSelect";
import BeforeStart from "../screens/beforeStart";
import { headerTitleStyle, theme } from "../styles/theme";
import SettingScreen from "../screens/setting";
import EditName from "../screens/setting/EditName";
import AlertSetting from "../screens/setting/AlertSetting";
import TabNavigator from "./TabNav";
import LeftIcon from "react-native-vector-icons/AntDesign";
import { useReactiveVar } from "@apollo/client";
import { coachSelect, isCoachVar } from "../../apollo";
import ChallengeSetting from "../screens/coachSelect/ChallengeSetting";
import AppSetting from "../screens/setting/AppSetting";
import OpenSource from "../screens/setting/OpenSource";
import Service from "../screens/terms/Service";
import Info from "../screens/terms/Info";
import TermsCheck from "../screens/terms/TermsCheck";
import CloseIcon from "../components/CloseIcon";
import SuccessPopUp from "../components/SuccessPopUp";
import { gql, useQuery } from "@apollo/client";
import Loading from "../components/Loading";

const TransitionScreenOptions = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
};
const Stack = createStackNavigator();

const GlobalNav = () => {
  const isCoach = useReactiveVar(isCoachVar)
  const [coachLoading, setCoachLoading] = useState(true)

  const GET_MEMBER_QUERY = gql`
query getMember{
  getMember{
    coach{
      name
    }
  }
}
`
  const { loading } = useQuery(GET_MEMBER_QUERY, {
    onCompleted: (data) => {
      if (data.getMember.coach) {
        if (data.getMember.coach?.name === "토키") {
          coachSelect("toki")
        }
        else if (data.getMember.coach?.name === "부키") {
          coachSelect("booki")
        }
        setTimeout(() => {
          setCoachLoading(false)
        }, 800)
      }
      else {
        isCoachVar(false)
        setTimeout(() => {
          setCoachLoading(false)
        }, 800)
      }
    },
    fetchPolicy: "no-cache"
  })
  if (loading || coachLoading) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={Object.assign(
          {},
          Platform.OS === "android" && TransitionScreenOptions,
          { cardStyle: { backgroundColor: theme.grayScale.white } }
        )}
      >
        {!isCoach && (
          <Stack.Screen
            name="CoachSelect"
            options={{
              title: "",
              headerStyle: {
                backgroundColor: theme.grayScale.white,
                elevation: 0, // android
                shadowOpacity: 0, //ios
              },
            }}
            component={CoachSelect}
          />
        )}
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{
            gestureEnabled: false, headerShown: false
          }}
        />
        <Stack.Screen
          name="BeforeStart"
          options={{
            title: "",
            headerLeft: () => null,
            headerStyle: {
              backgroundColor: theme.grayScale.white,
              elevation: 0, // android
              shadowOpacity: 0, //ios
            },
          }}
          component={BeforeStart}
        />

        <Stack.Screen
          name="SettingScreen"
          options={{
            title: "설정",
            headerTitleStyle,
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
            headerTitleStyle,
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
          options={({ navigation }) => ({
            headerTitleAlign: "center",
            title: "약관확인",
            headerTitleStyle,
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
          component={TermsCheck}
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
      </Stack.Navigator>
      <Stack.Screen
        name="successPopUp"
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
        component={SuccessPopUp}
      />
    </NavigationContainer>
  );
};

export default GlobalNav;
