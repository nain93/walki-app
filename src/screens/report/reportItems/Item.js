import React from "react";
import { View, Text } from "react-native";
import { coachColorVar } from "../../../../apollo";
import { ListItem } from "../../../styles/reportTheme";
import { theme } from "../../../styles/theme";

const Item = ({ day, step, stepGoal, onPress }) => {
  return (
    <ListItem
      onPress={onPress}
      style={{
        backgroundColor:
          step === stepGoal
            ? coachColorVar().color.report
            : theme.grayScale.gray6,
      }}
    >
      <Text
        style={{
          marginBottom: 5,
          color:
            step === stepGoal ? theme.grayScale.gray6 : theme.grayScale.gray4,
          fontSize: 14,
        }}
      >
        {day}
      </Text>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color:
              step === stepGoal ? theme.grayScale.white : theme.grayScale.gray3,
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          {step}
        </Text>
        <Text
          style={{
            color:
              step === stepGoal ? theme.grayScale.gray5 : theme.grayScale.gray4,
            fontSize: 12,
          }}
        >
          /{stepGoal}
        </Text>
      </View>
    </ListItem>
  );
};

export default Item;
