import React from "react";
import { Text, View } from "react-native";
import { coachColorVar, stepVar } from "../../../../apollo";
import { theme } from "../../../styles/theme";
import { ListItem } from "../../../styles/reportTheme";
import { useReactiveVar } from "@apollo/client";
import { d2p, h2p } from "../../../common/utils";

const AddItem = ({ stepGoal }) => {
  const step = useReactiveVar(stepVar);
  return (
    <ListItem
      style={{ marginRight: d2p(8), paddingBottom: h2p(2) }}
    >
      <Text style={{
        color: coachColorVar().color.report, fontSize: 14,
        lineHeight: 21, fontFamily: "Montserrat-SemiBold"
      }}>
        today
      </Text>
      <View style={{ alignItems: "center", marginTop: h2p(8) }}>
        <Text
          style={{
            color: coachColorVar().color.report,
            fontFamily: "Montserrat-SemiBold",
            fontSize: 20,
            lineHeight: 24
          }}
        >
          {step}
        </Text>
        <Text
          style={{
            color: theme.grayScale.gray2,
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

export default AddItem;
