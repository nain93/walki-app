import React, { useEffect, useRef, useState } from "react";
import { coachColorVar, statusVar } from "../../../apollo";
import toki_hi from "../../../assets/images/character/toki_hi.png";
import buki_hi from "../../../assets/images/character/buki.png";
import StatusVariable from "../../components/StatusVariable";
import { useReactiveVar } from "@apollo/client";
import HomeWalk from "./HomeWalk";
import HomeAfterStop from "./HomeAfterStop";
import { Animated } from "react-native";
import HomeCompleted from "./HomeCompleted";
import GoogleFit, { Scopes } from "react-native-google-fit";

const StatusHome = ({ navigation }) => {
  const status = useReactiveVar(statusVar);
  const fadetext = useRef(new Animated.Value(0)).current;
  const fadetextwalk = useRef(new Animated.Value(0)).current;
  const fadeimage = useRef(new Animated.Value(0.8)).current;
  const [onOff, setOnOff] = useState(false);
  const [steps, setSteps] = useState("");

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

  const opt = {
    startDate: "2021-10-01T00:00:17.971Z", // required ISO8601Timestamp
    endDate: new Date().toISOString(), // required ISO8601Timestamp
    bucketUnit: "DAY", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
    bucketInterval: 1, // optional - default 1.
  };

  // or with async/await syntax

  useEffect(() => {
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_ACTIVITY_WRITE,
        Scopes.FITNESS_BODY_READ,
        Scopes.FITNESS_BODY_WRITE,
      ],
    };
    const fetch = async () => {
      const auth = await GoogleFit.authorize(options);
      console.log(auth, "auth");
      if (auth.success) {
        GoogleFit.startRecording((res1) => {
          console.log(res1, "res1");
          GoogleFit.observeSteps((res2) => {
            console.log(res2, "res2");
            setSteps(res2);
          });
        });
      }
    };
    fetch();
  }, []);

  if (status === "home") {
    return (
      <>
        {console.log(steps, "steps")}
        <StatusVariable
          coachImg={coachColorVar()?.coach === "toki" ? toki_hi : buki_hi}
          goalText="목표를 설정해주세요"
          cheerText="오늘도 함께 걸어요!"
          buttonText="오늘의 목표를 세워보세요!"
          buttonColor={coachColorVar()?.color.main || "white"}
          handleGoToNext={() => navigation.navigate("ChallengeSetting")}
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
          fadeimage={fadeimage}
          fadetext={fadetext}
          fadetextwalk={fadetextwalk}
        />
      </>
    );
  }
  if (status === "walking") {
    return <HomeWalk />;
  }
  if (status === "afterStop") {
    return <HomeAfterStop />;
  }
  if (status === "success") {
    return <HomeCompleted />;
  }
  if (status === "fail") {
    return <HomeFail />;
  }
};

export default StatusHome;
