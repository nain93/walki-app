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
        paddingBottom: h2p(2),
        marginRight: index % 3 === 2 ? 0 : d2p(8),
        backgroundColor:
          step >= stepGoal
            ? coachColorVar().color.report
            : theme.grayScale.gray6,
      }}
    >
      <Text
        style={{
          color:
            step >= stepGoal ? theme.grayScale.gray6 : theme.grayScale.gray4,
          fontSize: 14,
          lineHeight: 21,
          fontFamily: "Montserrat-SemiBold"
        }}
      >
        {day}
      </Text>
      <View style={{ alignItems: "center", marginTop: h2p(8) }}>
        <Text
          style={{
            color:
              step >= stepGoal ? theme.grayScale.white : theme.grayScale.gray3,
            fontSize: 20,
            lineHeight: 24,
            fontFamily: "Montserrat-SemiBold"
          }}
        >
          {step}
        </Text>
        <Text
          style={{
            color:
              step >= stepGoal ? theme.grayScale.gray5 : theme.grayScale.gray4,
            fontSize: 12,
            lineHeight: 12,
            fontFamily: "Montserrat-Medium",
            marginTop: h2p(4)
          }}
        >
          /{stepGoal}
        </Text>
      </View>
    </ListItem>
  );
};

export default Item;
