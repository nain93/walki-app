import React, { useState, useEffect } from "react";
import { Alert } from 'react-native'
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import GlobalNav from "./src/navigators/GlobalNav";
import splash from "./assets/images/splash.png";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { ApolloProvider } from "@apollo/client";
import client, { isLoggedInVar, tokenVar } from "./apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging"


export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);

  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [splash];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };

  async function requestUsePermission() {
    const authStatus = await messaging().requestPermission();
    const enabled=
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
  if (AuthorizationStatus) {
    console.log('이 곳은 승인 상태일 때에만 타게 됩니다.')
  }
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived', JSON.stringify(remoteMessage));
    });
      return unsubscribe;
  }, []);
  
  
  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    return preloadAssets();
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
        <GlobalNav />
      </AppearanceProvider>
    </ApolloProvider>
  );
}
