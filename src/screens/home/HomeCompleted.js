import React, { useRef, useState } from "react";

import toki_happy from "../../../assets/images/character/toki_happy.png";
import buki_happy from "../../../assets/images/character/buki_happy.png";
import { theme } from "../../styles/theme";
import { coachColorVar } from "../../../apollo";
import { Animated } from "react-native";

const HomeCompleted = ({ StatusVariable }) => {
  const [failModalOpen, setFailModalOpen] = useState(false);
  const handleFailModal = () => {
    setFailModalOpen(!failModalOpen);
  };
  const fadetextwalk = useRef(new Animated.Value(0)).current;

  const fadeimage = useRef(new Animated.Value(0.8)).current;
  const [onOff, setOnOff] = useState(false);

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
      coachImg={coachColorVar().coach === "toki" ? toki_happy : buki_happy}
      goalText="목표를 설정해주세요"
      cheerText="오예! 이제 도넛을 먹을 수 있어요!"
      buttonText="와! 목표치에 도달했어요!"
      buttonColor={theme.grayScale.black}
      disabled={true}
      fadeimage={fadeimage}
      fadetextwalk={fadetextwalk}
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
    />
  );
};

export default HomeCompleted;
