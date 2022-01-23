import React from "react";
import { Image, Text } from "react-native";
import Modal from "react-native-modal";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { coachColorVar } from "../../apollo";
import { d2p, h2p } from "../common/utils";

const CharacterModal = ({
  open,
  tokiImg,
  bukiImg,
  children,
  handleModal,
  handleOkayBtn,
  okayText,
}) => {
  return (
    <Container>
      <Modal
        isVisible={open}
        style={{ alignItems: "center" }}
        hideModalContentWhileAnimating={true}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={handleModal}
        backdropTransitionOutTiming={0}
        onBackButtonPress={handleModal}
      >
        <ModalContainer tokiImg={tokiImg}>
          {tokiImg ? (
            <Image
              source={coachColorVar().coach === "toki" ? tokiImg : bukiImg}
              resizeMode="contain"
              style={{ width: d2p(100), height: d2p(100), marginBottom: d2p(24) }}
            />
          ) : (
            <></>
          )}
          {children}
          <BtnWrap>
            <CancelBtn onPress={handleModal}>
              <Text>취소</Text>
            </CancelBtn>
            <OkayBtn onPress={handleOkayBtn}>
              <OkayBtnText>{okayText}</OkayBtnText>
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
  border-radius: 16px;
  background-color: ${theme.grayScale.white};
  width: ${d2p(326)}px;
  align-items: center;
  justify-content: space-around;
  padding: ${d2p(24)}px;
`;

const BtnWrap = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

const CancelBtn = styled.TouchableOpacity`
  border-radius: 8px;
  background-color: ${theme.grayScale.gray6};
  width: ${d2p(135)}px;
  height: ${d2p(48)}px;
  padding: 12px 0;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const OkayBtn = styled.TouchableOpacity`
  border-radius: 8px;
  background-color: ${theme.grayScale.gray1};
  color: ${theme.grayScale.white};
  width: ${d2p(135)}px;
  height: ${d2p(48)}px;
  padding: 12px 0;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const OkayBtnText = styled.Text`
  color: ${theme.grayScale.white};
`;

export default CharacterModal;
