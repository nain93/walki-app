import React from "react";
import { logUserOut } from "../../../../apollo";
import CharacterModal from "../../../components/CharacterModal";
import { H3Text, theme } from "../../../styles/theme";

const LogOut = ({ handleLogOutModal, logOutModalOpen, navigation }) => {
  const handleOkayBtn = async () => {
    await logUserOut();
    handleLogOutModal();
    navigation.reset({ routes: [{ name: "OnBoarding" }] });
  };

  return (
    <CharacterModal
      open={logOutModalOpen}
      handleOkayBtn={handleOkayBtn}
      handleModal={handleLogOutModal}
      handleOkayBtn={handleOkayBtn}
      okayText={"로그아웃"}
    >
      <H3Text
        style={{ color: theme.grayScale.gray1 }}
      >{`로그아웃하면 목표 걸음 수 입력 \n푸쉬 알림을 받을 수 없어요`}</H3Text>
      <H3Text style={{ color: theme.grayScale.gray1 }}>
        그래도 로그아웃하시겠어요?
      </H3Text>
    </CharacterModal>
  );
};

export default LogOut;
