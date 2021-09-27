import React from "react";
import CharacterModal from "../../../components/CharacterModal";
import tokiFail from "../../../../assets/images/toki_fail.png";
import bukiFail from "../../../../assets/images/buki_fail.png";
import { Body1Text, H2Text, theme } from "../../../styles/theme";
import { statusVar } from "../../../../apollo";

const UserFail = ({ handleFailModal, failModalOpen, navigation }) => {
  const handleOkayBtn = () => {
    handleFailModal();
    statusVar("afterStop");
  };
  return (
    <CharacterModal
      open={failModalOpen}
      handleOkayBtn={handleOkayBtn}
      tokiImg={tokiFail}
      bukiImg={bukiFail}
      handleModal={handleFailModal}
      handleOkayBtn={handleOkayBtn}
      okayText={"그만하기"}
    >
      <H2Text>정말 그만할거에요?</H2Text>
      <Body1Text style={{ color: theme.TextColor }}>
        그만하기를 선택하면{"\n"}오늘은 다시 운동할 수 없어요.
      </Body1Text>
    </CharacterModal>
  );
};

export default UserFail;
