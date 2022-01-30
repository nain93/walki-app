import React from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import styled from "styled-components";
import { H4Text, theme } from "../styles/theme";
import { d2p, h2p } from "../common/utils"

const LongButton = ({
  handleGoToNext,
  disabled,
  btnBackColor,
  children,
  marginBottom,
  loading = false,
}) => {
  return (
    <Container
      style={{ width: Dimensions.get("window").width - d2p(76) }}
      disabled={disabled}
      onPress={handleGoToNext}
      btnBackColor={btnBackColor}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <NextText>{children}</NextText>
      )}
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  align-self: center;
  margin-top: ${h2p(20)}px;
  height:${d2p(54)}px;
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

export default LongButton;
