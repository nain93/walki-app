import React, { useCallback, useEffect, useState } from "react";
import { View, Text, AppState } from "react-native";
import styled from "styled-components";
import { H1Text, theme, Body1Text, Body3Text } from "../../styles/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import AndroidOpenSettings from "react-native-android-open-settings";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";
import PushNotification from "react-native-push-notification";
import { coachColorVar } from "../../../apollo";

const AppSetting = ({ navigation }) => {
  const [notiCheck, setNotiCheck] = useState(true);
  const [detailCheck, setDetailCheck] = useState(true);
  const handleOnOfPush = () => {
    openDroidSetting(AndroidOpenSettings.appNotificationSettings).then(() => {
      PushNotification.checkPermissions((permissions) => {
        setNotiCheck(permissions.alert);
      });
    });
  };
  const handleOnOfInfo = () => {
    openDroidSetting(AndroidOpenSettings.appDetailsSettings).then(() => {
      check(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then((check) => {
        if (check === "granted") {
          setDetailCheck(true);
        } else if (check === "blocked") {
          setDetailCheck(false);
        }
      });
    });
  };

  const openDroidSetting = (settingFunc) => {
    return new Promise((resolve, reject) => {
      const listener = (state) => {
        if (state === "active") {
          AppState.removeEventListener("change", listener);
          resolve();
        }
      };
      AppState.addEventListener("change", listener);
      try {
        settingFunc();
      } catch (e) {
        AppState.removeEventListener("change", listener);
        reject(e);
      }
    });
  };

  const { gray1, gray2, gray3, gray6 } = theme.grayScale;
  return (
    <Container>
      {console.log(notiCheck, "notiCheck")}
      <Wrap>
        <H1Text>앱설정</H1Text>
        <View>
          <SettingWrap onPress={handleOnOfPush}>
            <Body1Text style={{ color: gray2 }}>푸시설정</Body1Text>
            <Text style={{ color: coachColorVar().color.main }}>
              {notiCheck ? "ON" : "OFF"}
            </Text>
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
              {`푸시 알림에 대한 설정은 ‘휴대폰 설정 > walki > 알림’ \n에서 변경할 수 있습니다.`}
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
            <Text style={{ color: coachColorVar().color.main }}>
              {detailCheck ? "ON" : "OFF"}
            </Text>
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

        <Version>
          <Body1Text style={{ color: gray1 }}>버전</Body1Text>
          <Text style={{ color: gray3 }}>1.0.0</Text>
        </Version>
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

const Version = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default AppSetting;
