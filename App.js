import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import GlobalNav from "./src/navigators/GlobalNav";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { ApolloProvider } from "@apollo/client";
import client, {
  coachColorVar,
  coachSelect,
  isCoachVar,
  isLoggedInVar,
  tokenVar,
  walkStatus,
} from "./apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotification, { Importance } from "react-native-push-notification";
import * as SplashScreen from "expo-splash-screen";
import STOARGE from "./src/constants/stoarge";
import { SafeAreaProvider } from "react-native-safe-area-context";

PushNotification.configure({
  onRegister: function (token) {
    // console.log("TOKEN:", token);
  },

  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);
  },

  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,

  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: "default", // (required)
    channelName: "My channel", // (required)
    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => {
    setLoading(false);
    SplashScreen.hideAsync();
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
  const preload = async () => {
    const token = await AsyncStorage.getItem(TOKEN);
    console.log(token, "token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    const coach = await AsyncStorage.getItem(COACH);
    console.log(coach, "coach");
    if (coach) {
      await coachSelect(coach);
      isCoachVar(true);
    } else {
      isCoachVar(false);
    }
    const status = await AsyncStorage.getItem(STATUS);
    if (status) {
      walkStatus(status);
    }
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
          <GlobalNav />
        </SafeAreaProvider>
      </AppearanceProvider>
    </ApolloProvider>
  );
}
