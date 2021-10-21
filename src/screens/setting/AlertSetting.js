import React, { useRef, useState, useEffect } from "react";
import { View, KeyboardAvoidingView } from "react-native";
import styled from "styled-components";
import HeaderForm from "../../components/HeaderForm";
import { theme } from "../../styles/theme";
import { alertTimeVar, coachColorVar } from "../../../apollo";
import { useReactiveVar } from "@apollo/client";
import LongButton from "../../components/LongButton";
import PushNotification from "react-native-push-notification";
import DatePicker from "react-native-date-picker";


const AlertSetting = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const coachColor = useReactiveVar(coachColorVar);

  const InputRef = useRef();

  
  useEffect(() => {
    InputRef?.current?.focus();
  }, []);

  const handleGoToNext = async () => {
    PushNotification.setApplicationIconBadgeNumber(0);
    PushNotification.cancelAllLocalNotifications();
    // date.setDate(date.getDate()+1);
    handleChangeState(date);
    alertTimeVar({
      ampm: date.getHours() >= 12 ? "오후" : "오전",
      hour: date.getHours(),
      minute: date.getMinutes(),
    });
    // AppState.addEventListener("change", handleChangeState);
    // return () => AppState.removeEventListener("change", handleChangeState);
    // todo: 푸쉬 알람 허용 및 시간 설정
    navigation.goBack();
  };

  const handleChangeState = (nextHour) => {
    PushNotification.localNotificationSchedule({
      channelId: "default",
      title: `오늘도 ${
        coachColor.coach === "booki" ? "부키" : "토키"
      }와 함께 동네 한 바퀴 어때요?`,
      // message: `오늘도 ${
      //   coachColor.coach === "booki" ? "부키" : "토키"
      // }와 함께 동네 한 바퀴 어때요?`,
      date: nextHour,
      allowWhileIdle: true,
      repeatType: "day",
    });
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        paddingLeft: 30,
        paddingBottom: 30,
        paddingTop: 30,
        paddingRight: 30,
      }}
      behavior={"height"}
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
          <TimeWrap coachColor={coachColor}>
            <DatePicker
              date={date}
              onDateChange={setDate}
              mode="time"
              style={{ height: 50 }}
              locale="ko"
            />
          </TimeWrap>
        </TimePickerWrap>
        <View>
          <LongButton
            handleGoToNext={handleGoToNext}
            btnBackColor={coachColor.color.main}
          >
            설정
          </LongButton>
          <AfterSettingBtn onPress={() => navigation.goBack()}>
            <AfterSettingText>나중에 설정할래요</AfterSettingText>
          </AfterSettingBtn>
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const TimePickerWrap = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const TimeWrap = styled.View`
  height: 40px;
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
