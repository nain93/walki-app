import React, { useRef, useState, useEffect } from "react";
import { CircularProgress } from "react-native-svg-circular-progress";
import { coachColorVar, stepVar } from "../../apollo";
import LongButton from "../components/LongButton";
import {
  Blurgoal,
  BlurgoalBox,
  BottomStatus,
  CharacetrImage,
  CharacterBox,
  CheerText,
  GoalBox,
  GoalText,
  MiddleStatus,
  ProgressGoal,
} from "../styles/homeTheme";
import UserFail from "../screens/home/others/UserFail";
import { Animated } from "react-native";

import { Pedometer } from "expo-sensors";
import { request, PERMISSIONS } from "react-native-permissions";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const StatusVariable = ({
  coachImg,
  goalText,
  cheerText,
  buttonText,
  buttonColor,
  handleGoToNext,
  disabled,
  failModalOpen,
  handleOpacity,
  fadeimage,
  fadetext,
}) => {
  const navigation = useNavigation();
  const percentage = 0;

  const getSteps = () => {
    Pedometer.watchStepCount(result =>
      setSteps(steps => ({
        ...steps,
        currentStepCount: result.steps,
      }))
    );
  };

  const [steps, setSteps] = useState({
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
  });

  useEffect(() => {
    request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then(granted => {
      if (granted) {
        console.log(granted);
        getSteps();
      }
    });
  }, []);

  useEffect(() => {
    stepVar(currentStepCount);
  }, [currentStepCount]);

  const { currentStepCount, isPedometerAvailable } = steps;

  return (
    <>
      <MiddleStatus>
        <GoalBox>
          {/* <MiddleBox onpress={handlepressup}> */}
          <ProgressGoal>
            <TouchableOpacity
              onPress={handleOpacity}
              style={{ paddingTop: 370 }}>
              <CircularProgress
                percentage={percentage}
                donutColor={coachColorVar().color.main}
                size={350}
                progressWidth={160}>
                <CharacterBox>
                  <Animated.View
                    style={[{ opacity: fadeimage ? fadeimage : 1 }]}>
                    <CharacetrImage source={coachImg} resizeMode="contain" />
                  </Animated.View>
                </CharacterBox>
                <Animated.View
                  style={[
                    { opacity: fadetext ? fadetext : 0, position: "absolute" },
                  ]}>
                  <BlurgoalBox>
                    <Blurgoal coachColorVar={coachColorVar().color.main}>
                      {currentStepCount}
                      {"\n"}
                    </Blurgoal>

                    <GoalText>{goalText}</GoalText>
                  </BlurgoalBox>
                </Animated.View>
              </CircularProgress>
            </TouchableOpacity>
          </ProgressGoal>
          <CheerText>{cheerText}</CheerText>

          {/* </MiddleBox> */}
        </GoalBox>
      </MiddleStatus>

      <BottomStatus>
        <LongButton
          handleGoToNext={handleGoToNext}
          btnBackColor={buttonColor}
          disabled={disabled}>
          {buttonText}
        </LongButton>
        <UserFail
          navigation={navigation}
          handleFailModal={handleGoToNext}
          failModalOpen={failModalOpen}
        />
      </BottomStatus>
    </>
  );
};

export default StatusVariable;
