import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styled from "styled-components";
import HeaderForm from "../../components/HeaderForm";
import { theme } from "../../styles/theme";
import { alertTimeVar, coachColorVar } from "../../../apollo";
import { useReactiveVar } from "@apollo/client";
import LongButton from "../../components/LongButton";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AlertSetting = ({ navigation }) => {
  const coachColor = useReactiveVar(coachColorVar);
  // const [permissions, setPermissions] = useState({});

  // const onRemoteNotification = (notification) => {
  //   const isClicked = notification.getActionIdentifier();

  //   if (isClicked) {
  //     // Navigate user to another screen
  //     console.log("isClicked");
  //   } else {
  //     console.log("do something");
  //     // Do something else with push notification
  //   }
  // };

  // useEffect(() => {
  //   PushNotificationIOS.addEventListener("notification", onRemoteNotification);
  // });
  const [timePick, setTimePick] = useState({
    ampm: "오전",
    hour: "12",
    min: "00",
  });

  const handleGoToNext = () => {
    alertTimeVar({
      ...timePick,
    });
    // todo: 푸쉬 알람 허용 및 시간 설정
    navigation.goBack();
  };

  const handleAfterSetting = () => {
    navigation.goBack();
  };

  const handleHourChange = (text) => {
    setTimePick({
      ...timePick,
      hour: text.replace(/[^0-9]/g, ""),
    });
  };
  const handleMinChange = (text) => {
    setTimePick({
      ...timePick,
      min: text.replace(/[^0-9]/g, ""),
    });
  };

  const { ampm, hour, min } = timePick;
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <Container>
        <HeaderForm
          headerChildren={"응원 알림 설정"}
          descChildren={
            "당신을 응원하기 위해 토키가 매일 알림을 \n보내드려요! 시간은 나중에 변경할 수 있어요."
          }
          align="left"
        />
        <TimePickerWrap>
          <AmPmWrap>
            <AmPmBtn
              current={ampm === "오전"}
              onPress={() =>
                setTimePick({
                  ...timePick,
                  ampm: "오전",
                })
              }
            >
              <AmPmText current={ampm === "오전"}>오전</AmPmText>
            </AmPmBtn>
            <AmPmBtn
              current={ampm === "오후"}
              onPress={() =>
                setTimePick({
                  ...timePick,
                  ampm: "오후",
                })
              }
            >
              <AmPmText current={ampm === "오후"}>오후</AmPmText>
            </AmPmBtn>
          </AmPmWrap>
          <TimeWrap coachColor={coachColor}>
            <TextInput
              maxLength={2}
              onChangeText={(text) => handleHourChange(text)}
              keyboardType="numeric"
            >
              12
            </TextInput>
            <Text>:</Text>
            <TextInput
              maxLength={2}
              onChangeText={(text) => handleMinChange(text)}
              keyboardType="numeric"
              style={{ color: coachColor.color.main }}
            >
              00
            </TextInput>
          </TimeWrap>
        </TimePickerWrap>
        <View>
          <LongButton
            handleGoToNext={handleGoToNext}
            disabled={
              Number(hour) > 12 ||
              Number(hour) < 0 ||
              Number(min) > 59 ||
              Number(min) < 0
            }
            btnBackColor={coachColor.color.main}
          >
            설정
          </LongButton>
          <AfterSettingBtn onPress={handleAfterSetting}>
            <AfterSettingText>나중에 설정할래요</AfterSettingText>
          </AfterSettingBtn>
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 30px;
  justify-content: space-between;
`;

const TimePickerWrap = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const AmPmWrap = styled.View`
  flex-direction: row;
  margin: 0 10px;
`;

const AmPmBtn = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.current ? theme.grayScale.gray2 : theme.grayScale.gray6};
  padding: 10px 15px;
  border-radius: 4px;
`;

const AmPmText = styled.Text`
  color: ${(props) =>
    props.current ? theme.grayScale.white : theme.grayScale.gray3};
`;

const TimeWrap = styled.View`
  flex-direction: row;
  align-items: center;
  border: 2px solid ${(props) => props.coachColor.color.main};
  border-radius: 4px;
  margin: 0 10px;
  padding: 0 10px;
`;

const AfterSettingBtn = styled.TouchableOpacity`
  align-items: center;
  margin-top: 10px;
`;

const AfterSettingText = styled.Text`
  color: ${theme.grayScale.gray4};
  text-decoration: underline;
  text-decoration-color: ${theme.grayScale.gray4};
`;
export default AlertSetting;
