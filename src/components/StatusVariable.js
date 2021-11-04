import React, { useState, useEffect } from "react";
import { CircularProgress } from "react-native-svg-circular-progress";
import { coachColorVar, statusVar, stepVar } from "../../apollo";
import LongButton from "../components/LongButton";

import {
  Blurgoal,
  CharacetrImage,
  GoalBox,
  Blurgoal2,
} from "../styles/homeTheme";
import UserFail from "../screens/home/others/UserFail";
import { Animated, View, Text } from "react-native";
import { request, PERMISSIONS } from "react-native-permissions";
import GoogleFit, { Scopes } from "react-native-google-fit";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { Body1Text, H4Text, theme } from "../styles/theme";
import { getToday } from "../common/getToday";
import styled from "styled-components";

const opt = {
  startDate: "2021-10-29T00:00:17.971Z", // required ISO8601Timestamp
  endDate: new Date().toISOString(), // required ISO8601Timestamp
  bucketUnit: "DAY", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
  bucketInterval: 1, // optional - default 1.
};
const options = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_ACTIVITY_WRITE,
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_BODY_WRITE,
  ],
};

const StatusVariable = ({
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
}) => {
  const navigation = useNavigation();
  const status = useReactiveVar(statusVar);
  const step = useReactiveVar(stepVar);
  const [steps, setSteps] = useState({
    totalSteps: 0,
    observeSteps: "",
  });

  useEffect(() => {
    GoogleFit.authorize(options).then((authResult) => {
      if (authResult.success) {
        GoogleFit.getDailySteps(new Date().toISOString()).then((res) => {
          if (res[2].steps.length !== 0) {
            const { date, value } = res[2].steps[0];
            setSteps({ ...steps, totalSteps: value });
            stepVar(value);
          }
        });
      } else {
        console.log("AUTH_DENIED", authResult.message);
      }
    });
  }, [steps.observeSteps]);

  useEffect(() => {
    request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then((granted) => {
      if (granted) {
        GoogleFit.startRecording(() => {
          GoogleFit.observeSteps((res) => {
            setSteps({ ...steps, observeSteps: res.steps });
          });
        });
      }
    });
  }, []);

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
      }
    }
  `;
  const { data, loading } = useQuery(GET_CHALLENGE, {
    variables: {
      challengeDate: getToday(),
    },
  });

  const [putChallengeMutation, {}] = useMutation(PUT_CHALLENGE, {
    onCompleted: (data) => {
      console.log(data, "data");
    },
  });

  useEffect(() => {
    // statusVar("fail");
    if (step === data?.getChallenge?.stepGoal) {
    }
  }, [step]);

  // useEffect(() => {
  //   const now = new Date();
  //   const hour = now.getHours();
  //   const date = now.getMinutes();
  //   console.log(date, "date");
  //   if (hour === 0) {
  //     const putStep = async () => {
  //       await putChallengeMutation({
  //         variables: {
  //           challenge: {
  //             step: steps.totalSteps,
  //             challengeDate: getToday(),
  //           },
  //         },
  //       });
  //     };
  //     putStep();
  //   }
  // }, []);
  // * status가 walking중이어야하고 00시여야함
  // * 하루전날 스탭을 보내야함 date.setDate(date.getDate() - 1)
  // * 12시전에 (11시59분59초) 한번 업데이트 해야됨
  // * 종료시점을 알수있으면 종료하기전에 스탭 보내기 x
  // * 백에 안보내도 되지않나 googleAPi에 저장되어있기때문

  return (
    <>
      <GoalBox>
        <TouchableOpacity onPress={handleOpacity}>
          <CircularProgress
            percentage={
              step === 0 ? 0 : (step / data?.getChallenge?.stepGoal) * 100
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
                  {steps.totalSteps}
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
        navigation={navigation}
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

export default StatusVariable;
