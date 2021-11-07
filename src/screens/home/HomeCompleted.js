import React from "react";

import toki_happy from "../../../assets/images/character/toki_happy.png";
import buki_happy from "../../../assets/images/character/buki_happy.png";
import { theme } from "../../styles/theme";
import { coachColorVar } from "../../../apollo";

const HomeCompleted = ({ StatusVariable }) => {
  return (
    <StatusVariable
      coachImg={coachColorVar().coach === "toki" ? toki_happy : buki_happy}
      goalText="목표를 설정해주세요"
      cheerText="오예! 이제 도넛을 먹을 수 있어요!"
      buttonText="와! 목표치에 도달했어요!"
      buttonColor={theme.grayScale.black}
      disabled={true}
    />
  );
};

export default HomeCompleted;
