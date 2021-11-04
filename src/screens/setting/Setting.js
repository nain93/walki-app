import React, { useState, useCallback } from "react";
import styled from "styled-components";
import notification from "../../../assets/icons/notification.png";
import bookMark from "../../../assets/icons/bookmark.png";
import document from "../../../assets/icons/document.png";
import { Body1Text, theme } from "../../styles/theme";
import { coachColorVar } from "../../../apollo";
import { useReactiveVar } from "@apollo/client";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STOARGE from "../../constants/stoarge";
import { useFocusEffect } from "@react-navigation/core";

const Setting = ({ navigation }) => {
  const [time, setTime] = useState({
    ampm: "",
    hour: 0,
    minute: 0,
  });
  const coachColor = useReactiveVar(coachColorVar);
  const { TIME } = STOARGE;

  useFocusEffect(
    useCallback(() => {
      const getAlertTime = async () => {
        const alertTime = await AsyncStorage.getItem(TIME);
        setTime({ ...JSON.parse(alertTime) });
      };
      getAlertTime();
    }, [])
  );
  const { ampm, hour, minute } = time;

  return (
    <Container>
      <SettingBox onPress={() => navigation.navigate("AlertSetting")}>
        <View style={{ flexDirection: "row" }}>
          <SettingImg
            source={notification}
            resizeMode="contain"
            style={{ tintColor: theme.grayScale.gray4 }}
          />
          <SettingText>응원 알림 설정</SettingText>
        </View>

        <AlertSettingText coachColor={coachColor}>
          {ampm
            ? `${ampm} ${hour < 10 ? `0${hour}` : hour}:${
                minute < 10 ? `0${minute}` : minute
              }`
            : "설정"}
        </AlertSettingText>
      </SettingBox>
      <SettingBox onPress={() => navigation.navigate("AppSetting")}>
        {/* ios, aos 따로? */}
        <View style={{ flexDirection: "row" }}>
          <SettingImg source={bookMark} resizeMode="contain" />
          <SettingText>앱 설정</SettingText>
        </View>
      </SettingBox>
      <SettingBox
        style={{ borderBottomWidth: 0 }}
        onPress={() => navigation.navigate("TermsCheck")}
      >
        <View style={{ flexDirection: "row" }}>
          <SettingImg source={document} resizeMode="contain" />
          <SettingText>약관확인</SettingText>
        </View>
      </SettingBox>
    </Container>
  );
};

const Container = styled.View`
  flex: 0.4;
  justify-content: space-around;
  padding: 0 30px;
  border-bottom-color: ${theme.grayScale.gray7};
`;

const SettingBox = styled.TouchableOpacity`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.grayScale.gray7};
  align-items: center;
  flex: 1;
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
  align-items: center;
`;

export default Setting;
