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
import { d2p, h2p } from "../../common/utils";

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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SettingImg
            source={notification}
            resizeMode="contain"
            style={{ tintColor: theme.grayScale.gray4 }}
          />
          <Body1Text>응원 알림 설정</Body1Text>
        </View>

        <AlertSettingText coachColor={coachColor}>
          {ampm
            ? `${ampm} ${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute
            }`
            : "설정"}
        </AlertSettingText>
      </SettingBox>
      <SettingBox onPress={() => navigation.navigate("AppSetting")}>
        {/* ios, aos 따로? */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SettingImg source={bookMark} resizeMode="contain" />
          <Body1Text>앱 설정</Body1Text>
        </View>
      </SettingBox>
      <SettingBox
        style={{ borderBottomWidth: 0 }}
        onPress={() => navigation.navigate("TermsCheck")}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SettingImg source={document} resizeMode="contain" />
          <Body1Text>약관확인</Body1Text>
        </View>
      </SettingBox>
    </Container>
  );
};

const Container = styled.View`
  min-height: ${h2p(180)}px;
  padding: 0 ${d2p(38)}px;
  margin-bottom: ${h2p(20)}px;
  border-bottom-color: ${theme.grayScale.gray7};
`;

const SettingBox = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-bottom-color: ${theme.grayScale.gray7};
  padding: ${h2p(18)}px 0;
`;

const SettingImg = styled.Image`
  width: ${d2p(24)}px;
  height: ${d2p(24)}px;
  margin-right: ${d2p(12)}px;

`;

const AlertSettingText = styled(Body1Text)`
  color: ${(props) => props.coachColor.color.main};
  position: absolute;
  right: ${d2p(10)}px;
  top:${h2p(18)}px
`;

export default Setting;
