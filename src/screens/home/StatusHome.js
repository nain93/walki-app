import React, { useRef, useState } from "react";
import { coachColorVar, statusVar } from "../../../apollo";
import toki_hi from "../../../assets/images/character/toki_hi.png";
import buki_hi from "../../../assets/images/character/buki.png";
import StatusVariable from "../../components/StatusVariable";
import { useReactiveVar } from "@apollo/client";
import HomeWalk from "./HomeWalk";
import HomeAfterStop from "./HomeAfterStop";
import { Animated } from "react-native";
import HomeCompleted from "./HomeCompleted";

const StatusHome = ({ navigation }) => {
  const status = useReactiveVar(statusVar);
  const percentage = 0;

  const fadetext = useRef(new Animated.Value(0)).current;
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

  if (status === "home") {
    return (
      <StatusVariable
        coachImg={coachColorVar().coach === "toki" ? toki_hi : buki_hi}
        goalText="목표를 설정해주세요"
        cheerText="오늘도 함께 걸어요!"
        buttonText="오늘의 목표를 세워보세요!"
        buttonColor={coachColorVar().color.main}
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
      />
    );
  }
  if (status === "walking") {
    return <HomeWalk />;
  }
  if (status === "afterStop") {
    return <HomeAfterStop />;
  }
  if (status === "success") {
    return <HomeCompleted />;
  }
  if (status === "fail") {
    return <HomeFail />;
  }
};

export default StatusHome;
