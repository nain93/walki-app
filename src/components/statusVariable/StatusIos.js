import React, { useState, useEffect } from "react";
import { CircularProgress } from "react-native-svg-circular-progress";
import { coachColorVar, stepVar, walkStatus } from "../../../apollo";
import LongButton from "../../components/LongButton";

import {
  Blurgoal,
  CharacetrImage,
  GoalBox,
  Blurgoal2,
} from "../../styles/homeTheme";
import UserFail from "../../screens/home/others/UserFail";
import { Animated, View, Text, Platform } from "react-native";
import { request, PERMISSIONS } from "react-native-permissions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { Body1Text, H4Text, theme } from "../../styles/theme";
import { getToday } from "../../common/getToday";
import styled from "styled-components";

const StatusIos = ({
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
  const [steps, setSteps] = useState({
    totalSteps: 0,
    observeSteps: "",
  });

  const PUT_CHALLENGE = gql`
    mutation putChallenge($challenge: ChallengeInput) {
      putChallenge(challenge: $challenge) {
        step
      }
    }
  `;
  const GET_CHALLENGE = gql`
    query getChallenge($challengeDate: LocalDate) {
      getChallenge(challengeDate: $challengeDate) {
        step
        stepGoal
        challengeDate
      }
    }
  `;
  const { data, loading } = useQuery(GET_CHALLENGE, {
    variables: {
      challengeDate: getToday(),
    },
    onCompleted: (data) => {
      if (data === undefined) {
        walkStatus("home");
      }
    },
  });

  const [putChallengeMutation, {}] = useMutation(PUT_CHALLENGE, {
    onCompleted: (data) => {
      console.log(data, "data");
    },
  });

  useEffect(() => {
    if (!loading) {
      if (data === undefined) {
        walkStatus("home");
      }
    }
  }, []);

  return (
    <>
      <GoalBox>
        <TouchableOpacity onPress={handleOpacity}>
          <CircularProgress
            percentage={
              step === 0
                ? 0
                : step > 100
                ? 100
                : (step / data?.getChallenge?.stepGoal) * 100
            }
            donutColor={coachColorVar().color.main}
            size={350}
            progressWidth={165}
          >
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

                  <Blurgoal2> {data?.getChallenge?.stepGoal} 걸음</Blurgoal2>
                </View>
              </View>
            </Animated.View>
          </CircularProgress>
        </TouchableOpacity>
        <Body1Text style={{ marginTop: 10, color: theme.grayScale.gray2 }}>
          {cheerText}
        </Body1Text>
      </GoalBox>
      <LongButton
        handleGoToNext={handleGoToNext}
        btnBackColor={buttonColor}
        disabled={disabled}
      >
        {buttonText}
      </LongButton>
      <UserFail
        handleFailModal={handleGoToNext}
        failModalOpen={failModalOpen}
      />
    </>
  );
};

const GoalTextBox = styled.View`
  background-color: ${(props) => props.coachColorVar};
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 5px 10px;
`;

export default StatusIos;
