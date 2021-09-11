import React from "react"

import { Platform, Image } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Home from "../screens/home/Home"
import Ranking from "../screens/ranking"
import Report from "../screens/report"

import LogoTitle from "../components/LogoTitle"
import SettingLogoTitle from "../components/SettingLogoTitle"
import { coachColorVar } from "../../apollo"
import { useReactiveVar } from "@apollo/client"
import activehome from "../../assets/icons/activehome.png"
import inactivehome from "../../assets/icons/inactivehome.png"
import inactivestar from "../../assets/icons/inactivestar.png"
import activestar from "../../assets/icons/activestar.png"
import activemessage from "../../assets/icons/activemessage.png"
import inactivemessage from "../../assets/icons/inactivemessage.png"
import { theme } from "../styles/theme"

const Tabs = createBottomTabNavigator()

const TabNavigator = () => {
  const tabColor = useReactiveVar(coachColorVar)
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: tabColor.color.main,
        tabBarInactiveTintColor: theme.grayScale.gray3,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        style: {
          backgroundColor: "#fff",
          height: Platform.OS === "ios" ? 85 : 60,
          fontSize: 11,
          borderTopWidth: 1,
          borderColor: "black",
        },
      }}>
      <Tabs.Screen
        name="홈"
        options={{
          headerTitle: () => null,
          headerLeft: props => <LogoTitle {...props} />,
          headerRight: props => <SettingLogoTitle {...props} />,
          headerStyle: {
            backgroundColor: "transparent",
            elevation: 0, // android
            shadowOpacity: 0, //ios
          },
          tabBarLabel: "홈",
          tabBarIcon: ({ color, focused }) => (
            <Image
              style={{ width: 30, tintColor: color }}
              resizeMode="contain"
              source={focused ? home1 : home1}
              tintColor={color}
            />
          ),
        }}
        component={Home}
      />
      <Tabs.Screen
        name="리포트"
        component={Report}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              style={{ width: 30, tintColor: color }}
              resizeMode="contain"
              source={focused ? activestar : inactivestar}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="전체랭킹"
        component={Ranking}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              style={{ width: 30, tintColor: color }}
              resizeMode="contain"
              source={focused ? activemessage : inactivemessage}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  )
}

export default TabNavigator
