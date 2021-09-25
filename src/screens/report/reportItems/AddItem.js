import React from "react";
import { Text, View } from "react-native";
import { coachColorVar } from "../../../../apollo";
import { theme } from "../../../styles/theme";
import { ListItem } from "../../../styles/reportTheme";

const AddItem = ({ step, stepGoal }) => {
  return (
    <ListItem>
      <Text style={{ color: coachColorVar().color.report, fontWeight: "600" }}>
        Today
      </Text>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color: coachColorVar().color.report,
            fontWeight: "600",
            fontSize: 18,
          }}
        >
          {step}
        </Text>
        <Text
          style={{
            color: theme.grayScale.gray2,
            fontSize: 12,
          }}
        >
          /{stepGoal}
        </Text>
      </View>
    </ListItem>
  );
};

export default AddItem;
