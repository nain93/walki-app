import React, { useRef, useState } from "react";
import { coachColorVar } from "../../../apollo";
import { theme } from "../../styles/theme";
import toki_hi from "../../../assets/images/character/toki_hi.png";
import buki_hi from "../../../assets/images/character/buki.png";
import { Animated } from "react-native";

const HomeAfterStop = ({ StatusVariable }) => {
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
      coachImg={coachColorVar().coach === "toki" ? toki_hi : buki_hi}
      goalText="목표를 설정해주세요"
      cheerText="우리 내일은 더 열심히 걸어요!"
      buttonText="오늘은 그만할래요"
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

export default HomeAfterStop;
