import React, { useRef, useState, useEffect } from "react";
import { coachColorVar, statusVar } from "../../../apollo";
import toki_walking from "../../../assets/images/character/toki_walking.png";
import buki_walking from "../../../assets/images/character/buki_walking.png";
import { theme } from "../../styles/theme";
import StatusVariable from "../../components/StatusVariable";
import { Animated } from "react-native";
import { request, PERMISSIONS } from "react-native-permissions";
import { Pedometer } from "expo-sensors";

import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";

const HomeWalk = navigation => {
  const [failModalOpen, setFailModalOpen] = useState(false);
  const handleFailModal = () => {
    setFailModalOpen(!failModalOpen);
  };
  const fadetext = useRef(new Animated.Value(0)).current;
  const fadeimage = useRef(new Animated.Value(0.8)).current;
  const [onOff, setOnOff] = useState(false);
  const status = useReactiveVar(statusVar);

  const handlepressup = () => {
    Animated.timing(fadetext, {
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
    Animated.timing(fadetext, {
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
  // const getSteps = () => {
  //   Pedometer.watchStepCount(result => {
  //     if (status === "walking") {
  //       setSteps(steps => ({
  //         ...steps,
  //         currentStepCount: result.steps,
  //       }));
  //     }
  //   });
  // };

  // const [steps, setSteps] = useState({
  //   isPedometerAvailable: "checking",
  //   pastStepCount: 0,
  //   currentStepCount: 0,
  // });

  // useEffect(() => {
  //   request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then(granted => {
  //     if (granted) {
  //       getSteps();
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   let hours = new Date().getHours();
  //   let minutes = new Date().getMinutes();
  //   if (percentage == 100) {
  //     status = "success";
  //   }
  // 12시에 percent <100 이면
  //  status = "fail"
  // }, []);

  // const { currentStepCount, isPedometerAvailable } = steps;

  // const PUT_CHALLENGE = gql`
  //   mutation putChallenge($challenge: ChallengeInput) {
  //     putChallenge(challenge: $challenge) {
  //       step
  //     }
  //   }
  // `;
  // const GET_CHALLENGE = gql`
  //   query getChallenge($challengeDate: LocalDate) {
  //     getChallenge(challengeDate: $challengeDate) {
  //       step
  //       stepGoal
  //     }
  //   }
  // `;
  // const { data } = useQuery(GET_CHALLENGE, {
  //   variables: {
  //     challengeDate: getToday(),
  //   },
  //   onCompleted: data => {
  //     console.log(data, "data1");
  //   },
  // });
  // const [putChallengeMutation, { loading }] = useMutation(PUT_CHALLENGE, {
  //   onCompleted: data => {
  //     console.log(data, "data");
  //   },
  // });
  // const percentage = currentStepCount / data?.getChallenge?.stepGoal;

  // if (percentage == 100) {
  //   navigation.navigate("successPopUp");
  // }

  return (
    <StatusVariable
      coachImg={coachColorVar().coach === "toki" ? toki_walking : buki_walking}
      goalText="목표를 설정해주세요"
      cheerText="조금만 더 힘내면 목표에 도달할 수 있어요!"
      buttonText="오늘은 그만할래요"
      buttonColor={theme.grayScale.gray1}
      handleGoToNext={handleFailModal}
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
      failModalOpen={failModalOpen}
      fadeimage={fadeimage}
      fadetext={fadetext}
    />
  );
};

export default HomeWalk;
