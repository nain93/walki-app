import React from "react"

import { Platform, Container, Image } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Home from "../screens/home/Home"
import ranking from "../screens/ranking/ranking"
import report from "../screens/report/report"

import LogoTitle from "../components/LogoTitle"
import SettingLogoTitle from "../components/SettingLogoTitle"
import { coachColorVar } from "../../apollo"
import { useReactiveVar } from "@apollo/client"
import Star from "../../assets/icons/Star.png"
import home1 from "../../assets/icons/home1.png"
import message from "../../assets/icons/message.png"
import styled from "styled-components"

const Tabs = createBottomTabNavigator()

const TabNavigator = () => {
  const tabColor = useReactiveVar(coachColorVar)
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: tabColor.color.main,
        tabBarInactiveTintColor: "gray",
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
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              style={{ width: 30 }}
              resizeMode="contain"
              source={focused ? home1 : Star}
              tintColor={color}
            />
          ),
        }}
        component={Home}
      />
      <Tabs.Screen
        name="리포트"
        component={ranking}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              style={{ width: 30 }}
              resizeMode="contain"
              source={focused ? Star : Star}
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="전체랭킹"
        component={report}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              style={{ width: 30 }}
              resizeMode="contain"
              source={focused ? message : message}
              tintColor={color}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  )
}

export default TabNavigator
