import React, { useState } from "react";

import toki_fail from "../../../assets/images/character/toki_cry.png";
import buki_fail from "../../../assets/images/character/buki_cry.png";
import { theme } from "../../styles/theme";
import { coachColorVar } from "../../../apollo";
import StatusVariable from "../../components/StatusVariable";

const HomeFail = () => {
  const [failModalOpen, setFailModalOpen] = useState(false);
  const handleFailModal = () => {
    setFailModalOpen(!failModalOpen);
  };
  return (
    <StatusVariable
      coachImg={coachColorVar().coach === "toki" ? toki_fail : buki_fail}
      goalText="목표를 설정해주세요"
      cheerText={
        coachColorVar().coach === "toki"
          ? "흥... 열심히 안할꺼에요?"
          : "시무룩.. 열심히 안할꺼에요?"
      }
      buttonText="오늘은 그만할래요"
      buttonColor={theme.grayScale.black}
      handleGoToNext={handleFailModal}
      failModalOpen={failModalOpen}
    />
  );
};

export default HomeFail;
