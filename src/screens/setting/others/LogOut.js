import React from "react";
import { logUserOut } from "../../../../apollo";
import { d2p } from "../../../common/utils";
import CharacterModal from "../../../components/CharacterModal";
import { H3Text, theme } from "../../../styles/theme";
import BackgroundService from 'react-native-background-actions';

const LogOut = ({ handleLogOutModal, logOutModalOpen }) => {
  const handleOkayBtn = async () => {
    await logUserOut();
    await BackgroundService.stop()
    handleLogOutModal();
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
        style={{ color: theme.grayScale.gray1, textAlign: "center", marginBottom: d2p(30), marginTop: d2p(16) }}
      >{`로그아웃하면 목표 걸음 수 입력 \n푸쉬 알림을 받을 수 없어요`}</H3Text>
      <H3Text style={{ color: theme.grayScale.gray1, marginBottom: d2p(24) }}>
        그래도 로그아웃하시겠어요?
      </H3Text>
    </CharacterModal >
  );
};

export default LogOut;
