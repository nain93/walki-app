import React from "react"

import { Platform } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Home from "../screens/home/Home"
import ranking from "../screens/ranking/ranking"
import report from "../screens/report/report"

import { Ionicons } from "@expo/vector-icons"

const Tabs = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === "ios" ? "ios-" : "md-"
          if (route.name === "홈") {
            iconName += "home"
          } else if (route.name === "리포트") {
            iconName += "person-outline"
          } else if (route.name === "전체랭킹") {
            iconName += "person-outline"
          }
          return (
            <Ionicons
              name={iconName}
              color={focused ? "#F22764" : "lightgrey"}
              size={26}
            />
          )
        },
      })}
      tabBarOptions={{
        activeTintColor: "#F22764",
        inactiveTintColor: "lightgrey",
        labelStyle: {
          fontSize: 12,
          bottom: 5,
        },
        style: {
          backgroundColor: "#fff",
          height: Platform.OS === "ios" ? 85 : 60,
          fontSize: 11,
          borderTopWidth: 1,
          borderColor: "black",
        },
      }}>
      <Tabs.Screen name="홈" component={Home} />
      <Tabs.Screen name="리포트" component={ranking} />
      <Tabs.Screen name="전체랭킹" component={report} />
    </Tabs.Navigator>
  )
}

export default TabNavigator
