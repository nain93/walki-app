import React from "react";
import styled from "styled-components";
import { Body3Text, theme } from "../../styles/theme";

const TermsCheck = ({ navigation }) => {
  return (
    <Container>
      <SettingWrap
        style={{
          borderBottomWidth: 1,
          borderBottomColor: theme.grayScale.gray6,
        }}
        onPress={() => navigation.navigate("Service")}
      >
        <Body3Text>서비스 이용약관</Body3Text>
      </SettingWrap>
      <SettingWrap
        style={{ paddingTop: 30 }}
        onPress={() => navigation.navigate("Info")}
      >
        <Body3Text>개인정보 처리방침</Body3Text>
      </SettingWrap>
    </Container>
  );
};
const Container = styled.View`
  padding: 30px;
`;

const SettingWrap = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
`;

export default TermsCheck;
