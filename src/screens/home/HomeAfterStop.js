import React, { useRef, useState } from "react";
import { coachColorVar } from "../../../apollo";
import StatusVariable from "../../components/StatusVariable";
import { theme } from "../../styles/theme";
import toki_hi from "../../../assets/images/character/toki_hi.png";
import buki_hi from "../../../assets/images/character/buki.png";

const HomeAfterStop = () => {
  return (
    <StatusVariable
      coachImg={coachColorVar().coach === "toki" ? toki_hi : buki_hi}
      goalText="목표를 설정해주세요"
      cheerText="우리 내일은 더 열심히 걸어요!"
      buttonText="오늘은 그만할래요"
      buttonColor={theme.grayScale.black}
      disabled={true}
    />
  );
};

export default HomeAfterStop;
