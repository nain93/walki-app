import React from "react";
import styled from "styled-components";
import upload from "../../../assets/icons/upload.png";
import { Body1Text, theme } from "../../styles/theme";

const Others = () => {
  return (
    <Container>
      <SettingBox onPress={() => {}}>
        <SettingImg
          source={upload}
          resizeMode="contain"
          style={{ tintColor: theme.grayScale.gray4 }}
        />
        <SettingText>이 앱 공유하기</SettingText>
      </SettingBox>
      <SettingBox>
        <SettingText>로그아웃</SettingText>
      </SettingBox>
      <SettingBox style={{ borderBottomWidth: 0 }}>
        <SettingText>탈퇴하기</SettingText>
      </SettingBox>
    </Container>
  );
};

const Container = styled.View`
  flex: 0.4;
  justify-content: space-around;
  padding: 30px;
  border-bottom-color: ${theme.grayScale.gray7};
`;

const SettingBox = styled.TouchableOpacity`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.grayScale.gray7};
  height: 60px;
  align-items: center;
  padding: 0 10px;
`;

const SettingText = styled(Body1Text)``;

const SettingImg = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

export default Others;
