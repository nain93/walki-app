import React from "react";
import { ActivityIndicator, Dimensions, } from "react-native";
import styled from "styled-components";
import { H4Text, theme } from "../styles/theme";
import { d2p } from "../common/utils"
import { getBottomSpace } from "react-native-iphone-x-helper";

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
      style={{ marginBottom: getBottomSpace() + d2p(marginBottom) }}
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
  width: ${Dimensions.get("window").width - d2p(76)};
  margin-top: auto;
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

export default LongButton;
