import React, { useState, useEffect } from "react";
import { CircularProgress } from "react-native-svg-circular-progress";
import { coachColorVar, statusVar, stepVar } from "../../apollo";
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
import UserFail from "../screens/home/Others/UserFail";
import { Animated } from "react-native";

import { Pedometer } from "expo-sensors";
import { request, PERMISSIONS } from "react-native-permissions";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { getToday } from "../common/getToday";

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
  const status = useReactiveVar(statusVar);

  const getSteps = () => {
    Pedometer.watchStepCount((result) => {
      if (status === "walking") {
        setSteps((steps) => ({
          ...steps,
          currentStepCount: result.steps,
        }));
      }
    });
  };

  const [steps, setSteps] = useState({
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
  });

  useEffect(() => {
    request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then((granted) => {
      if (granted) {
        getSteps();
      }
    });
  }, []);

  const { currentStepCount, isPedometerAvailable } = steps;

  const PUT_CHALLENGE = gql`
    mutation putChallenge($challenge: ChallengeInput) {
      putChallenge(challenge: $challenge) {
        step
      }
    }
  `;

  const [putChallengeMutation, { data, loading }] = useMutation(PUT_CHALLENGE, {
    onCompleted: (data) => {
      console.log(data, "data");
    },
  });

  // useEffect(() => {
  //   const putStep = async () => {
  //     await putChallengeMutation({
  //       variables: {
  //         challenge: {
  //           step: currentStepCount,
  //           challengeDate: getToday(),
  //         },
  //       },
  //     });
  //     stepVar(currentStepCount);
  //   };
  //   putStep();
  // }, [currentStepCount]);
  // * 12시에 업데이트 해야됨

  return (
    <>
      <MiddleStatus>
        <GoalBox>
          {/* <MiddleBox onpress={handlepressup}> */}
          <ProgressGoal>
            <TouchableOpacity onPress={handleOpacity}>
              <CircularProgress
                percentage={percentage}
                donutColor={coachColorVar().color.main}
                size={300}
                progressWidth={140}
              >
                <CharacterBox>
                  <Animated.View
                    style={[{ opacity: fadeimage ? fadeimage : 1 }]}
                  >
                    <CharacetrImage source={coachImg} resizeMode="contain" />
                  </Animated.View>
                </CharacterBox>
                <Animated.View
                  style={[
                    { opacity: fadetext ? fadetext : 0, position: "absolute" },
                  ]}
                >
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
          {/* </MiddleBox> */}
        </GoalBox>
      </MiddleStatus>

      <CheerText>{cheerText}</CheerText>

      <BottomStatus>
        <LongButton
          handleGoToNext={handleGoToNext}
          btnBackColor={buttonColor}
          disabled={disabled}
        >
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
