import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import GlobalNav from "./src/navigators/GlobalNav";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, {
  coachColorVar,
  isCoachVar,
  isLoggedInVar,
  statusVar,
  tokenVar,
} from "./apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import STOARGE from "./src/constants/stoarge";
import { theme } from "./src/styles/theme";
import LoggedOutNav from "./src/navigators/LoggedOutNav";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [loading, setLoading] = useState(true);
  const onFinish = () => {
    SplashScreen.hideAsync();
    setLoading(false);
  };

  const prepare = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
      // await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (e) {
      console.warn(e);
    }
  };
  const { TOKEN, COACH, STATUS } = STOARGE;

  const getToken = async () => {
    const token = await AsyncStorage.getItem(TOKEN);
    console.log(token, "token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    else{
      isLoggedInVar(false);
    }
  };

  const getCoach = async () => {
    const coach = await AsyncStorage.getItem(COACH);
    console.log(coach, "coach");
    if (coach) {
      isCoachVar(true);
      if (coach === "toki") {
        coachColorVar({ coach: "toki", ...theme.toki });
      } else if (coach === "booki") {
        coachColorVar({ coach: "booki", ...theme.booki });
      }
    }
  };

  const getStatus = async () => {
    const status = await AsyncStorage.getItem(STATUS);
    console.log(status, "status");
    if (status) {
      statusVar(status);
    }
    else if(status === null){
      statusVar("home")
    }
  };

  const preload = async () => {
    const token = getToken();
    const coach = getCoach();
    const status = getStatus();

    await Promise.all([token, coach, status]);
    return prepare();
  };

  let colorScheme = useColorScheme();

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <AppearanceProvider>
        <SafeAreaProvider>
          {isLoggedIn ? <GlobalNav /> : <LoggedOutNav />}
        </SafeAreaProvider>
      </AppearanceProvider>
    </ApolloProvider>
  );
}
