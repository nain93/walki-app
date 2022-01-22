import React, { useEffect } from "react";
import { CircularProgress } from "react-native-svg-circular-progress";
import { coachColorVar, stepVar, statusVar, stepGoalVar } from "../../../apollo";
import LongButton from "../../components/LongButton";

import {
  Blurgoal,
  CharacetrImage,
  GoalBox,
  Blurgoal2,
} from "../../styles/homeTheme";
import UserFail from "../../screens/home/others/UserFail";
import { Animated, View, Text, Dimensions, StyleSheet } from "react-native";
import { request, PERMISSIONS } from "react-native-permissions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useReactiveVar } from "@apollo/client";
import { Body1Text, H4Text, theme } from "../../styles/theme";
import styled from "styled-components";
import { d2p, h2p } from "../../common/utils";
import Svg, { Path, Circle } from 'react-native-svg'


const StatusAndroid = ({
  props: {
    coachImg,
    cheerText,
    buttonText,
    buttonColor,
    handleGoToNext,
    disabled,
    failModalOpen,
    handleOpacity,
    fadeimage,
    fadetextwalk,
    goalText,
    fadetext,
  },
}) => {
  const step = useReactiveVar(stepVar);
  const stepGoal = useReactiveVar(stepGoalVar)
  const status = useReactiveVar(statusVar);

  useEffect(() => {
    request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then((granted) => {
      if (granted) {
        console.log(granted, "granted");
      }
    });
  }, []);

  function generateArc(percentage, radius) {
    if (percentage === 100) percentage = 99.999
    const a = percentage * 2 * Math.PI / 100 // angle (in radian) depends on percentage
    const r = radius // radius of the circle
    var rx = r,
      ry = r,
      xAxisRotation = 0,
      largeArcFlag = 1,
      sweepFlag = 1,
      x = r + r * Math.sin(a),
      y = r - r * Math.cos(a)
    if (percentage <= 50) {
      largeArcFlag = 0;
    } else {
      largeArcFlag = 1
    }

    return `A${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x} ${y}`
  }


  const size = h2p(312)
  const half = size / 2


  return (
    <>
      <GoalBox>
        <TouchableOpacity onPress={handleOpacity}>
          <View style={{ width: size, height: size }}>
            <Svg width={size} height={size}>
              <Circle cx={half} cy={half} r={half} fill={"#DADADA"} />
              <Path
                strokeLinecap="round"
                d={`M${half} ${half} L${half} 0 ${generateArc(
                  status === "home"
                    ? 0
                    : step === 0
                      ? 0
                      : step > stepGoal
                        ? 100
                        : (step / stepGoal) * 100
                  , half)} Z`}
                fill={coachColorVar().color.main}
              />
              {<Circle cx={half} cy={half} r={half - h2p(10)} fill={"white"} />}
            </Svg>
            <View style={styles.textView}>
              <Animated.View style={[{ opacity: fadeimage ? fadeimage : 1 }]}>
                <CharacetrImage source={coachImg} resizeMode="contain" />
              </Animated.View>
              <Animated.View
                style={[
                  { opacity: fadetext ? fadetext : 0, position: "absolute" },
                ]}
              >
                <View style={{ alignItems: "center" }}>
                  <Blurgoal coachColorVar={coachColorVar().color.main}>
                    0
                  </Blurgoal>

                  <H4Text>{goalText}</H4Text>
                </View>
              </Animated.View>
              <Animated.View
                style={[
                  {
                    opacity: fadetextwalk ? fadetextwalk : 0,
                    position: "absolute",
                  },
                ]}
              >
                <View style={{ alignItems: "center" }}>
                  <Blurgoal coachColorVar={coachColorVar().color.main}>
                    {step}
                  </Blurgoal>

                  <View
                    style={{
                      flex: 1,
                      aligitems: "center",
                      justifyConetent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <GoalTextBox coachColorVar={coachColorVar().color.main}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 12,
                        }}
                      >
                        목표
                      </Text>
                    </GoalTextBox>
                    <Blurgoal2> {stepGoal} 걸음</Blurgoal2>
                  </View>
                </View>
              </Animated.View>
            </View>
          </View>
        </TouchableOpacity>
        <Body1Text style={{ marginTop: h2p(14), color: theme.grayScale.gray2, marginBottom: "auto" }}>
          {cheerText}
        </Body1Text>
        <LongButton
          handleGoToNext={handleGoToNext}
          btnBackColor={buttonColor}
          disabled={disabled}
        >
          {buttonText}
        </LongButton>
      </GoalBox>
      <UserFail
        handleFailModal={handleGoToNext}
        failModalOpen={failModalOpen}
      />
    </>
  );
};

const styles = StyleSheet.create({
  textView: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0, right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const GoalTextBox = styled.View`
  background-color: ${(props) => props.coachColorVar};
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 5px 10px;
`;

export default StatusAndroid;
