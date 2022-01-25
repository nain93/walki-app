import React from "react";
import { View, Text, Dimensions } from "react-native";
import { coachColorVar } from "../../../../apollo";
import { d2p, h2p } from "../../../common/utils";
import { ListItem } from "../../../styles/reportTheme";
import { theme } from "../../../styles/theme";

const Item = ({ index, day, step, stepGoal, onPress, opacity }) => {
  if (opacity) {
    return <ListItem />;
  }
  return (
    <ListItem
      onPress={onPress}
      style={{
        marginVertical: h2p(5),
        marginRight: index % 3 === 2 ? 0 : d2p(8),
        backgroundColor:
          step >= stepGoal
            ? coachColorVar().color.report
            : theme.grayScale.gray6,
      }}
    >
      <Text
        style={{
          marginBottom: 5,
          color:
            step >= stepGoal ? theme.grayScale.gray6 : theme.grayScale.gray4,
          fontSize: 14,
        }}
      >
        {day}
      </Text>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color:
              step >= stepGoal ? theme.grayScale.white : theme.grayScale.gray3,
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          {step}
        </Text>
        <Text
          style={{
            color:
              step >= stepGoal ? theme.grayScale.gray5 : theme.grayScale.gray4,
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
