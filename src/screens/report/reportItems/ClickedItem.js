import React from "react";
import { Image } from "react-native";
import { coachColorVar } from "../../../../apollo";
import { ListItem } from "../../../styles/reportTheme";
import { H4Text, theme } from "../../../styles/theme";

import tokiGood from "../../../../assets/images/report/toki_good_head.png";
import tokiFail from "../../../../assets/images/report/toki_fail_head.png";
import bukiGood from "../../../../assets/images/report/buki_good_head.png";
import bukiFail from "../../../../assets/images/report/buki_fail_head.png";

const ClickedItem = ({ step, stepGoal, onPress, opacity }) => {
  if (opacity) {
    return <ListItem />;
  }
  return (
    <ListItem
      onPress={onPress}
      style={{
        backgroundColor:
          step >= stepGoal
            ? coachColorVar().color.report
            : theme.grayScale.gray6,
      }}
    >
      <Image
        source={
          step >= stepGoal
            ? coachColorVar().coach === "toki"
              ? tokiGood
              : bukiGood
            : coachColorVar().coach === "toki"
            ? tokiFail
            : bukiFail
        }
        resizeMode="contain"
        style={{ width: 60, height: 60 }}
      />
      <H4Text
        style={{
          color:
            step >= stepGoal ? theme.grayScale.white : theme.grayScale.gray3,
        }}
      >
        {step >= stepGoal ? "잘했어요!" : "힘내세요!"}
      </H4Text>
    </ListItem>
  );
};

export default ClickedItem;
