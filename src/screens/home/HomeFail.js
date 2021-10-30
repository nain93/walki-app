import React, { useState } from "react";

import toki_fail from "../../../assets/images/character/toki_fail.png";
import buki_fail from "../../../assets/images/character/buki_fail.png";
import { theme } from "../../styles/theme";
import { coachColorVar } from "../../../apollo";

const HomeFail = ({ navigation }) => {
  const [failModalOpen, setFailModalOpen] = useState(false);
  const handleFailModal = () => {
    setFailModalOpen(!failModalOpen);
  };
  return (
    <StatusVariable
      coachImg={coachColorVar().coach === "toki" ? toki_fail : buki_fail}
      goalText="목표를 설정해주세요"
      cheerText="흠..열심히 안할꺼에요?"
      buttonText="오늘은 그만할래요"
      buttonColor={theme.grayScale.black}
      handleGoToNext={handleFailModal}
      failModalOpen={failModalOpen}
    />
  );
};

export default HomeFail;
