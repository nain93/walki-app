import React, { useCallback, useEffect, useRef, useState } from "react";
import { coachColorVar, statusVar, walkStatus } from "../../../apollo";
import toki_hi from "../../../assets/images/character/toki_hi.png";
import buki_hi from "../../../assets/images/character/buki.png";
import { useReactiveVar, gql, useQuery } from "@apollo/client";
import HomeWalk from "./HomeWalk";
import HomeAfterStop from "./HomeAfterStop";
import { Animated,View } from "react-native";
import HomeCompleted from "./HomeCompleted";
import HomeFail from "./HomeFail";
import StatusVariable from "../../components/statusVariable/StatusVariable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STOARGE from "../../constants/stoarge";
import BackgroundService from 'react-native-background-actions';
import { Pedometer } from "expo-sensors";
import { request, PERMISSIONS, check } from "react-native-permissions";
import { startCounter, stopCounter } from 'react-native-accurate-step-counter';

const StatusHome = ({ navigation }) => {

  const [steps, setSteps] = useState({
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
  });
  const checkSettingsAsync = async () => {
    const { status } = await Pedometer.requestPermissionsAsync();
  };

  const able = async () => {
    const isAble = await Pedometer.isAvailableAsync();
    setSteps((steps) => ({
      ...steps,
      isPedometerAvailable: isAble,
    }));
  };

  
  const { currentStepCount, isPedometerAvailable } = steps;



  useEffect(() => {
    request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then((granted) => {
      if (granted) {
        console.log(granted);
      }
    });
  }, []);


  const status = useReactiveVar(statusVar);
  const fadetext = useRef(new Animated.Value(0)).current;
  const fadetextwalk = useRef(new Animated.Value(0)).current;
  const fadeimage = useRef(new Animated.Value(0.8)).current;
  const [onOff, setOnOff] = useState(false);

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

  const GET_REFRESH_TOKEN = gql`
    query refreshToken {
      refreshToken {
        accessToken
      }
    }
  `;

  const {} = useQuery(GET_REFRESH_TOKEN, {
    onCompleted: (data) => {
      console.log(data.refreshToken.accessTokenr, "refreshToken");
      AsyncStorage.setItem(STOARGE.TOKEN, data.refreshToken.accessToken);
    },
  });

  const options = {
    taskName: 'Example',
    taskTitle: `걸음수: ${currentStepCount}`,
    taskDesc: `걸음수`,
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    parameters: {
        delay: 1000,
    },
};

  const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

  

  const veryIntensiveTask = async (taskDataArguments) => {
    // Example of an infinite loop task
    const { delay } = taskDataArguments;
    await new Promise( async (resolve) => {
     if(BackgroundService.isRunning()){
       console.log(currentStepCount,"currentStepCount")
          Pedometer.watchStepCount((result) =>
          setSteps((steps) => ({
            ...steps,
            currentStepCount: result.steps,
          }))
        );
      }
      // for (let i = 0; BackgroundService.isRunning(); i++) {
            
      //       await sleep(delay);
      //   }
    });
};

useEffect(()=>{
  const backgroundFetch = async () =>{
    await BackgroundService.start(veryIntensiveTask, options);
  }
  backgroundFetch()
},[])

const update = useCallback(async()=>{
  await BackgroundService.updateNotification({ taskTitle: `걸음수: ${currentStepCount}`});
},[currentStepCount])

useEffect(()=>{
  update()
},[update])




return(
  <View>
  </View>
)
  // if (status === "home") {
  //   return (
  //     <StatusVariable
  //       coachImg={coachColorVar()?.coach === "toki" ? toki_hi : buki_hi}
  //       goalText="목표를 설정해주세요"
  //       cheerText="오늘도 함께 걸어요!"
  //       buttonText="오늘의 목표를 세워보세요!"
  //       buttonColor={coachColorVar()?.color.main || "white"}
  //       handleGoToNext={() => navigation.navigate("ChallengeSetting")}
  //       handleOpacity={() => {
  //         if (onOff) {
  //           handlepressdown();
  //           setOnOff(!onOff);
  //           return;
  //         }
  //         handlepressup();
  //         setOnOff(!onOff);
  //         return;
  //       }}
  //       fadeimage={fadeimage}
  //       fadetext={fadetext}
  //       fadetextwalk={fadetextwalk}
  //     />
  //   );
  // }
  // if (status === "walking") {
  //   return <HomeWalk StatusVariable={StatusVariable} />;
  // }
  // if (status === "afterStop") {
  //   return <HomeAfterStop StatusVariable={StatusVariable} />;
  // }
  // if (status === "success") {
  //   return <HomeCompleted StatusVariable={StatusVariable} />;
  // }
  // if (status === "fail") {
  //   return <HomeFail StatusVariable={StatusVariable} />;
  // }
};

export default StatusHome;
