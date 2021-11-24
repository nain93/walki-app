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
import { TouchableOpacity } from "react-native-gesture-handler";
import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { Body1Text, H4Text, theme } from "../../styles/theme";
import { getToday } from "../../common/getToday";
import styled from "styled-components";
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health'

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

  const permissions = {
    permissions: {
      read: [AppleHealthKit.Constants.Permissions.Steps,
        AppleHealthKit.Constants.Permissions.StepCount,],
      write: [AppleHealthKit.Constants.Permissions.Steps],
    },
  } 
 
    AppleHealthKit.initHealthKit(permissions, (error) => {
    if (error) {
    console.log('[ERROR] Cannot grant permissions!');
    }
  
    

const majorVersionIOS = parseInt(Platform.Version, 15);
      if (majorVersionIOS >= 13) {
        // console.log('ios >= 13');

        let optionsSteps = {
          date: new Date().toISOString(), // optional; default now
          includeManuallyAdded: true, // optional: default true
        };
        AppleHealthKit.getStepCount(optionsSteps, (err, results) => {
          if (err) {
            console.log('err', err);
            return;
          }
          // results ? setSteps(results.value) : setSteps(null);
          // stepVar(results);
          setSteps(results.value)
          stepVar(results.value)
          console.log(steps, "걸음수")
        });
      }
    }
  )


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
                : step > data?.getChallenge?.stepGoal
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


// AppleHealthKit.initHealthKit(permissions, (error: string) => {
//   /* Called after we receive a response from the system */
//   if (error) {
//     console.log('[ERROR] Cannot grant permissions!');
//   }
//   /* Can now read or write to HealthKit */
//   //   unit: settings.unit === 1 ? 'mgPerdL' : 'mmolPerL', // optional; default 'mmolPerL'
//   let options = {
//     startDate: fromDate, // required
//     endDate: tillDate, // optional; default now
//   };
//   AppleHealthKit.getBloodGlucoseSamples(options, (callbackError, results) => {
//     /* Samples are now collected from HealthKit */
//     if (callbackError) {
//       console.log(callbackError);
//       return;
//     }
//     setCoordinates(
//       results.map(coordinates => {
//         console.log(coordinates.value);
//         return {
//           x: new Date(moment(coordinates.startDate).toISOString()),
//           y: coordinates.value * (settings.unit === 1 ? MMOLPERL : MGPERDL),
//         };
//       }),
//     );
//   });

//   AppleHealthKit.getCarbohydratesSamples(options, (callbackError, results) => {
//     /* Samples are now collected from HealthKit */
//     if (callbackError) {
//       console.log(callbackError);
//       return;
//     }
//     setCarbs(results.map(data => data.value));
//     setCarbCoordinates(
//       results.map(coordinates => {
//         const kitCarbs = mapUnit(coordinates.value, settings);
//         return {
//           x: new Date(moment(coordinates.startDate).toISOString()),
//           y: kitCarbs,
//         };
//       }),
//     );
//   });

//   const majorVersionIOS = parseInt(Platform.Version, 10);
//   if (majorVersionIOS >= 13) {
//     console.log('ios >= 13');

//     let optionsSteps = {
//       date: new Date(foodDate).toISOString(), // optional; default now
//       includeManuallyAdded: true, // optional: default true
//     };
//     AppleHealthKit.getStepCount(optionsSteps, (err, results) => {
//       if (err) {
//         console.log('err', err);
//         return;
//       }
//       results ? setStepsPerDay(results.value) : setStepsPerDay(null);
//     });
//   }
// });
// setLoading(false);
// } else if (userSettings && userSettings.glucoseSource === LIBRETWOAPP) {
// const localCGMData = await database.getCgmData(id);
// if (localCGMData && localCGMData.length > 0) {
//   const jsonLocalCGMData = JSON.parse(localCGMData);
//   const glucoseCoordinates = filterSVGDataByTime(jsonLocalCGMData);
//   setCoordinates(glucoseCoordinates);
// }
// setLoading(false);
// } else {
// setLoading(false);
// }
// }