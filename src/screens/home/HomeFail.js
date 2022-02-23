import React, { useRef, useState } from "react";

import toki_fail from "../../../assets/images/character/toki_cry.png";
import buki_fail from "../../../assets/images/character/buki_cry.png";
import { theme } from "../../styles/theme";
import { coachColorVar } from "../../../apollo";
import { Animated } from "react-native";

const HomeFail = ({ StatusVariable }) => {
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
      coachImg={coachColorVar().coach === "toki" ? toki_fail : buki_fail}
      goalText="목표를 설정해주세요"
      cheerText={
        coachColorVar().coach === "toki"
          ? "흥... 열심히 안할꺼에요?"
          : "시무룩.. 열심히 안할꺼에요?"
      }
      buttonText="오늘은 그만할래요"
      buttonColor={theme.grayScale.black}
      handleGoToNext={handleFailModal}
      failModalOpen={failModalOpen}
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

export default HomeFail;
