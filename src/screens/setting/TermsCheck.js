import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import { Body3Text, theme } from "../../styles/theme";

const TermsCheck = () => {
  return (
    <Container>
      <SettingWrap
        style={{
          borderBottomWidth: 1,
          borderBottomColor: theme.grayScale.gray6,
        }}
      >
        <Body3Text>서비스 이용약관</Body3Text>
      </SettingWrap>
      <SettingWrap>
        <Body3Text>개인정보 처리방침</Body3Text>
      </SettingWrap>
    </Container>
  );
};
const Container = styled.View`
  padding: 0 30px;
`;

const SettingWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export default TermsCheck;
