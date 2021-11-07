import React from "react";
import { Platform } from "react-native";
import StatusAndroid from "./StatusAndroid";
import StatusIos from "./StatusIos";

const StatusVariable = (props) => {
  if (Platform.OS === "android") {
    return <StatusAndroid props={{ ...props }} />;
  }
  if (Platform.OS === "ios") {
    return <StatusIos props={{ ...props }} />;
  }
};

export default StatusVariable;
