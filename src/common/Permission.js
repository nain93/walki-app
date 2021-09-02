import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Pedometer } from "expo-sensors";
import { request, PERMISSIONS, check } from "react-native-permissions";

const Permission = () => {
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

  const getSteps = () => {
    Pedometer.watchStepCount((result) =>
      setSteps((steps) => ({
        ...steps,
        currentStepCount: result.steps,
      }))
    );
  };
  useEffect(() => {
    request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then((granted) => {
      if (granted) {
        console.log(granted);
        getSteps();
      }
    });
  }, []);

  const { currentStepCount, isPedometerAvailable } = steps;

  return (
    <View>
      <Text>{currentStepCount}</Text>
    </View>
  );
};

export default Permission;
