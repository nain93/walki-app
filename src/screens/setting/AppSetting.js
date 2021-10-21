import React, { useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import { H1Text, theme, Body1Text, Body3Text } from "../../styles/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import AndroidOpenSettings from "react-native-android-open-settings";

const AppSetting = ({ navigation }) => {
  const [onOfPush, setOnOfPush] = useState(false);
  const [onOfInfo, setOnOfInfo] = useState(false);
  const handleOnOfPush = () => {
    AndroidOpenSettings.appNotificationSettings();
    setOnOfPush(!onOfPush);
  };
  const handleOnOfInfo = () => {
    AndroidOpenSettings.appDetailsSettings();
    setOnOfInfo(!onOfInfo);
  };
  const { gray1, gray2, gray3, gray6 } = theme.grayScale;
  return (
    <Container>
      <Wrap>
        <H1Text>앱설정</H1Text>
        <View>
          <SettingWrap onPress={handleOnOfPush}>
            <Body1Text style={{ color: gray2 }}>푸시설정</Body1Text>
            <Text style={{ color: gray1 }}>{onOfPush ? "ON" : "OFF"}</Text>
          </SettingWrap>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: gray6,
              paddingTop: 20,
              paddingBottom: 20,
            }}
          >
            <Body3Text
              style={{
                color: gray3,
              }}
            >
              {`푸시 알림에 대한 설정은 ‘휴대폰 설정 > walkie > 알림’ \n에서 변경할 수 있습니다.`}
            </Body3Text>
          </View>

          <SettingWrap
            style={{
              borderBottomWidth: 1,
              borderBottomColor: gray6,
              paddingTop: 20,
              paddingBottom: 20,
            }}
            onPress={handleOnOfInfo}
          >
            <Body1Text style={{ color: gray2 }}>내 운동 정보 사용</Body1Text>
            <Text style={{ color: gray1 }}>{onOfInfo ? "ON" : "OFF"}</Text>
          </SettingWrap>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderBottomColor: gray6,
              paddingTop: 20,
              paddingBottom: 20,
            }}
            onPress={() => navigation.navigate("OpenSource")}
          >
            <Body1Text style={{ color: gray2 }}>오픈소스 라이센스</Body1Text>
          </TouchableOpacity>
        </View>

        <SettingWrap style={{ marginTop: 10 }}>
          <Body1Text style={{ color: gray1 }}>버전</Body1Text>
          <Text style={{ color: gray3 }}>1.0.0</Text>
        </SettingWrap>
      </Wrap>
    </Container>
  );
};

const Container = styled.View`
  padding: 0 30px;
  flex: 1;
`;

const Wrap = styled.View`
  justify-content: space-around;
  flex: 0.6;
`;

const SettingWrap = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default AppSetting;
