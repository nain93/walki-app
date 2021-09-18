import React from "react";
import { Image, Text } from "react-native";
import Modal from "react-native-modal";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { coachColorVar } from "../../apollo";

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
      >
        <ModalContainer tokiImg={tokiImg}>
          {tokiImg ? (
            <Image
              source={coachColorVar().coach === "toki" ? tokiImg : bukiImg}
              resizeMode="contain"
              style={{ width: 100, height: 116 }}
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
  flex: ${(props) => (props.tokiImg ? 0.4 : 0.3)};
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

export default CharacterModal;
