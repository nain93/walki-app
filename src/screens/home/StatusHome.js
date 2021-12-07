import React, { useCallback, useEffect, useRef, useState } from "react";
import { coachColorVar, statusVar, walkStatus } from "../../../apollo";
import toki_hi from "../../../assets/images/character/toki_hi.png";
import buki_hi from "../../../assets/images/character/buki.png";
import { useReactiveVar, gql, useQuery } from "@apollo/client";
import HomeWalk from "./HomeWalk";
import HomeAfterStop from "./HomeAfterStop";
import { Animated,View } from "react-native";
import HomeCompleted from "./HomeCompleted";
import HomeFail from "./HomeFail";
import StatusVariable from "../../components/statusVariable/StatusVariable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STOARGE from "../../constants/stoarge";

const StatusHome = ({ navigation }) => {

  const status = useReactiveVar(statusVar);
  const fadetext = useRef(new Animated.Value(0)).current;
  const fadetextwalk = useRef(new Animated.Value(0)).current;
  const fadeimage = useRef(new Animated.Value(0.8)).current;
  const [onOff, setOnOff] = useState(false);

  const handlepressup = () => {
    Animated.timing(fadetext, {
      toValue: 0.8,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeimage, {
      toValue: 0.2,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const handlepressdown = () => {
    Animated.timing(fadetext, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeimage, {
      toValue: 0.8,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const GET_REFRESH_TOKEN = gql`
    query refreshToken {
      refreshToken {
        accessToken
      }
    }
  `;

  const {} = useQuery(GET_REFRESH_TOKEN, {
    onCompleted: (data) => {
      console.log(data.refreshToken.accessTokenr, "refreshToken");
      AsyncStorage.setItem(STOARGE.TOKEN, data.refreshToken.accessToken);
    },
  });


  if (status === "home") {
    return (
      <StatusVariable
        coachImg={coachColorVar()?.coach === "toki" ? toki_hi : buki_hi}
        goalText="목표를 설정해주세요"
        cheerText="오늘도 함께 걸어요!"
        buttonText="오늘의 목표를 세워보세요!"
        buttonColor={coachColorVar()?.color.main || "white"}
        handleGoToNext={() => navigation.navigate("ChallengeSetting")}
        handleOpacity={() => {
          if (onOff) {
            handlepressdown();
            setOnOff(!onOff);
            return;
          }
          handlepressup();
          setOnOff(!onOff);
          return;
        }}
        fadeimage={fadeimage}
        fadetext={fadetext}
        fadetextwalk={fadetextwalk}
      />
    );
  }
  if (status === "walking") {
    return <HomeWalk StatusVariable={StatusVariable} />;
  }
  if (status === "afterStop") {
    return <HomeAfterStop StatusVariable={StatusVariable} />;
  }
  if (status === "success") {
    return <HomeCompleted StatusVariable={StatusVariable} />;
  }
  if (status === "fail") {
    return <HomeFail StatusVariable={StatusVariable} />;
  }
};

export default StatusHome;
