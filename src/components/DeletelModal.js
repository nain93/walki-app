import React from "react";
import { Text, Button, Image } from "react-native";
import Modal from "react-native-modal";
import tokiFail from "../../assets/images/toki_fail.png";
import bookiFail from "../../assets/images/buki_fail.png";
import styled from "styled-components";
import { Body1Text, H2Text, theme } from "../styles/theme";
import { coachColorVar } from "../../apollo";

const DeletelModal = ({ open, setOpen }) => {
  const toggleModal = () => {
    setOpen(!open);
  };
  const handleDeleteAccount = () => {
    //todo 회원 탈퇴 로직
  };

  return (
    <Container>
      <Modal isVisible={open} style={{ alignItems: "center" }}>
        <ModalContainer>
          <Image
            source={coachColorVar().coach === "toki" ? tokiFail : bookiFail}
            resizeMode="contain"
            style={{ width: 100, height: 116 }}
          />
          <H2Text>정말 탈퇴할거에요?</H2Text>
          <Body1Text style={{ color: theme.TextColor }}>
            쌓여왔던 운동 기록이 사라져요.
          </Body1Text>

          <BtnWrap>
            <CancelBtn onPress={toggleModal}>
              <Text>취소</Text>
            </CancelBtn>
            <OkayBtn onPress={handleDeleteAccount}>
              <OkayBtnText>탈퇴하기</OkayBtnText>
            </OkayBtn>
          </BtnWrap>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const ModalContainer = styled.View`
  flex: 0.4;
  border-radius: 16px;
  background-color: ${theme.grayScale.white};
  width: 326px;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0;
`;

const BtnWrap = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

const CancelBtn = styled.TouchableOpacity`
  border-radius: 8px;
  background-color: ${theme.grayScale.gray6};
  width: 135px;
  padding: 12px 0;
  align-items: center;
  margin: 0 5px;
`;

const OkayBtn = styled.TouchableOpacity`
  border-radius: 8px;
  background-color: ${theme.grayScale.gray1};
  color: ${theme.grayScale.white};
  width: 135px;
  padding: 12px 0;
  align-items: center;
  margin: 0 5px;
`;

const OkayBtnText = styled.Text`
  color: ${theme.grayScale.white};
`;

export default DeletelModal;
