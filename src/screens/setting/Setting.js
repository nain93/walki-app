import React from "react";
import styled from "styled-components";
import notification from "../../../assets/icons/notification.png";
import setting from "../../../assets/icons/setting.png";
import document from "../../../assets/icons/document.png";
import { Body1Text, theme } from "../../styles/theme";
import { coachColorVar } from "../../../apollo";
import { useReactiveVar } from "@apollo/client";

const Setting = ({ navigation }) => {
  const coachColor = useReactiveVar(coachColorVar);
  return (
    <Container>
      <SettingBox onPress={() => navigation.navigate("AlertSetting")}>
        <SettingImg
          source={notification}
          resizeMode="contain"
          style={{ tintColor: theme.grayScale.gray4 }}
        />
        <SettingText>응원 알림 설정</SettingText>
        <AlertSettingText coachColor={coachColor}>설정</AlertSettingText>
      </SettingBox>
      <SettingBox>
        <SettingImg source={setting} resizeMode="contain" />
        <SettingText>앱 설정</SettingText>
      </SettingBox>
      <SettingBox style={{ borderBottomWidth: 0 }}>
        <SettingImg source={document} resizeMode="contain" />
        <SettingText>앱 정보</SettingText>
      </SettingBox>
    </Container>
  );
};

const Container = styled.View`
  flex: 0.4;
  justify-content: space-around;
  padding: 30px;
  border-bottom-width: 1px;
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

const AlertSettingText = styled(Body1Text)`
  color: ${(props) => props.coachColor.color.main};
  position: absolute;
  right: 10px;
`;

export default Setting;
