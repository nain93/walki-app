import React, { useRef, useState, useEffect } from "react";
import { coachColorVar, statusVar } from "../../../apollo";
import toki_walking from "../../../assets/images/character/toki_walking.png";
import buki_walking from "../../../assets/images/character/buki_walking.png";
import { theme } from "../../styles/theme";
import StatusVariable from "../../components/StatusVariable";
import { Animated } from "react-native";

import { useReactiveVar } from "@apollo/client";

const HomeWalk = navigation => {
  const [failModalOpen, setFailModalOpen] = useState(false);
  const handleFailModal = () => {
    setFailModalOpen(!failModalOpen);
  };
  const fadetext = useRef(new Animated.Value(0)).current;
  const fadetextwalk = useRef(new Animated.Value(0)).current;

  const fadeimage = useRef(new Animated.Value(0.8)).current;
  const [onOff, setOnOff] = useState(false);
  const status = useReactiveVar(statusVar);

  const handlepressup = () => {
    Animated.timing(fadetextwalk, {
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
    Animated.timing(fadetextwalk, {
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

  return (
    <StatusVariable
      coachImg={coachColorVar().coach === "toki" ? toki_walking : buki_walking}
      goalText="목표를 설정해주세요"
      cheerText="조금만 더 힘내면 목표에 도달할 수 있어요!"
      buttonText="오늘은 그만할래요"
      buttonColor={theme.grayScale.gray1}
      handleGoToNext={handleFailModal}
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
      failModalOpen={failModalOpen}
      fadeimage={fadeimage}
      fadetextwalk={fadetextwalk}
    />
  );
};

export default HomeWalk;
