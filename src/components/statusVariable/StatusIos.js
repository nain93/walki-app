import React , {useEffect} from "react";
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
import { Animated, View, Text, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useReactiveVar } from "@apollo/client";
import { Body1Text, H4Text, theme } from "../../styles/theme";
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
  const stepGoal = useReactiveVar(stepGoalVar)
  const status = useReactiveVar(statusVar);



  const permissions = {
    permissions: {
      read: [AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.StepCount,],
      write: [AppleHealthKit.Constants.Permissions.Steps],
    },
  } 
    useEffect(() => {
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
            setInterval(() => {
              AppleHealthKit.getStepCount(optionsSteps, (err, results) => {
                if (err) {
                  console.log('err', err);
                  return;
                }
                // results ? setSteps(results.value) : setSteps(null);
                // stepVar(results);
                stepVar(results.value)
              });
              console.log(step, "stepTest");

            },1000)
          }
        }
      )
    }, [step])
    

  return (
    <>
      <GoalBox>
        <TouchableOpacity onPress={handleOpacity}>
          <CircularProgress
            percentage={
              status === "home"
                ? 0
                : step === 0
                  ? 0
                  : step > stepGoal
                    ? 100
                    : (step / stepGoal) * 100
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
                  <Blurgoal2> {stepGoal} 걸음</Blurgoal2>
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
        marginBottom={20}
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


