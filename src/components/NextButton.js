import React from "react";
import styled from "styled-components";
import { coachVar } from "../../apollo";
import { H4Text, theme } from "../styles/theme";

const NextButton = ({ handleGoToNext, disabled, btnBackColor }) => {
  return (
    <Container
      disabled={disabled}
      onPress={handleGoToNext}
      btnBackColor={btnBackColor}
    >
      <NextText>다음</NextText>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  width: 100%;
  height: 54px;
  background-color: ${(props) => String(props.btnBackColor)};
  color: ${theme.grayScale.white};
  border-radius: 8px;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};
`;

const NextText = styled(H4Text)`
  color: ${theme.grayScale.white};
  text-align: center;
`;

export default NextButton;
