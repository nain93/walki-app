import React, { useEffect, useRef, useState } from "react";
import { coachColorVar, statusVar, tokenVar } from "../../../apollo";
import toki_hi from "../../../assets/images/character/toki_hi.png";
import buki_hi from "../../../assets/images/character/buki.png";
import { useReactiveVar, gql, useQuery } from "@apollo/client";
import HomeWalk from "./HomeWalk";
import HomeAfterStop from "./HomeAfterStop";
import { Animated, Image, Text, View } from "react-native";
import HomeCompleted from "./HomeCompleted";
import HomeFail from "./HomeFail";
import StatusVariable from "../../components/statusVariable/StatusVariable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STOARGE from "../../constants/stoarge";
import Modal from "react-native-modal";
import styled from "styled-components";
import tokiAlarm from "../../../assets/images/character/toki_alarm.png"
import bokiAlarm from "../../../assets/images/character/boki_alarm.png"
import { Body1Text, H2Text, H4Text, theme } from "../../styles/theme";
import PushNotification, { Importance } from "react-native-push-notification";

PushNotification.configure({
  onRegister: function (token) {
    // console.log("TOKEN:", token);
  },

  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);
  },

  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,

  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: "default", // (required)
    channelName: "My channel", // (required)
    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);


const StatusHome = ({ navigation }) => {

  const status = useReactiveVar(statusVar);
  const fadetext = useRef(new Animated.Value(0)).current;
  const fadetextwalk = useRef(new Animated.Value(0)).current;
  const fadeimage = useRef(new Animated.Value(0.8)).current;
  const [onOff, setOnOff] = useState(false);
  const [modalOpen, setOpenModal] = useState(false)

  const handlepressup = () => {
    Animated.timing(fadetext, {
      toValue: 0.8,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeimage, {
      toValue: 0.2,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const handlepressdown = () => {
    Animated.timing(fadetext, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeimage, {
      toValue: 0.8,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const GET_REFRESH_TOKEN = gql`
    query refreshToken {
      refreshToken {
        accessToken
      }
    }
  `;

  const { } = useQuery(GET_REFRESH_TOKEN, {
    onCompleted: (data) => {
      if (data) {
        console.log(data.refreshToken.accessToken, "data.refreshToken.accessToken");
        AsyncStorage.setItem(STOARGE.TOKEN, data.refreshToken.accessToken);
        tokenVar(data.refreshToken.accessToken)
      }
    },
  });

  useEffect(() => {
    const alarmCheck = async () => {
      const check = await AsyncStorage.getItem(STOARGE.ALARM_CHECK)
      if (!check) {
        setOpenModal(true)
      }
      else {
        setOpenModal(false)
      }
    }
    alarmCheck()
  }, [])

  const handleAlarmCheck = async () => {
    await AsyncStorage.setItem(STOARGE.ALARM_CHECK, JSON.stringify(true))
    setOpenModal(false)
  }


  if (status === "home") {
    return (
      <>
        <StatusVariable
          coachImg={coachColorVar()?.coach === "toki" ? toki_hi : buki_hi}
          goalText="목표를 설정해주세요"
          cheerText={coachColorVar()?.coach === "toki" ? "오늘도 함께 달려봐요!" : "오늘도 함께 걸어요!"}
          buttonText="오늘의 목표를 세워보세요!"
          buttonColor={coachColorVar()?.color.main || "white"}
          handleGoToNext={() => navigation.navigate("ChallengeSetting")}
          handleOpacity={() => {
            if (onOff) {
              handlepressdown();
              setOnOff(!onOff);
              return;
            }
            handlepressup();
            setOnOff(!onOff);
            return;
          }}
          fadeimage={fadeimage}
          fadetext={fadetext}
          fadetextwalk={fadetextwalk}
        />
        <Modal
          isVisible={modalOpen}
          style={{ alignItems: "center" }}
          hideModalContentWhileAnimating={true}
          animationIn="fadeIn"
          animationOut="fadeOut"
          onBackdropPress={handleAlarmCheck}
          backdropTransitionOutTiming={0}
          onBackButtonPress={handleAlarmCheck}
        >
          <ModalContainer >
            <Image
              source={coachColorVar().coach === "toki" ? tokiAlarm : bokiAlarm}
              style={{ width: 266, height: 166 }}
            />
            <TextView>
              <H2Text style={{ textAlign: "center", marginTop: 24 }}>{coachColorVar().coach === "toki" ? "토키" : "부키"}의 응원 알림을{"\n"}받아보세요!</H2Text>
              <Body1Text style={{ color: theme.grayScale.gray4, marginBottom: 24, marginTop: 8 }}>메세지 수신을 위해 알림을 설정해주세요.</Body1Text>
            </TextView>
            <BtnWrap>
              <CancelBtn onPress={handleAlarmCheck}>
                <H4Text>나중에</H4Text>
              </CancelBtn>
              <OkayBtn coachColorVar={coachColorVar().coach} onPress={() => {
                handleAlarmCheck()
                navigation.navigate("AlertSetting")
              }}>
                <OkayBtnText >알림 설정하기</OkayBtnText>
              </OkayBtn>
            </BtnWrap>
          </ModalContainer>
        </Modal>
      </>
    );
  }

  if (status === "walking") {
    return <HomeWalk StatusVariable={StatusVariable} />;
  }
  if (status === "afterStop") {
    return <HomeAfterStop StatusVariable={StatusVariable} />;
  }
  if (status === "success") {
    return <HomeCompleted StatusVariable={StatusVariable} />;
  }
  if (status === "fail") {
    return <HomeFail StatusVariable={StatusVariable} />;
  }
};

const ModalContainer = styled.View`
border-radius: 16px;
background-color: ${theme.grayScale.white};
width: 326px;
align-items: center;
padding: 24px;
`;

const TextView = styled.View`

`

const BtnWrap = styled.TouchableOpacity`
width: 100%;
flex-direction: row;
justify-content: center;
`;

const CancelBtn = styled.TouchableOpacity`
border-radius: 8px;
background-color: ${theme.grayScale.gray6};
width: 135px;
padding: 12px 0;
align-items: center;
margin: 0 5px;
`;

const OkayBtn = styled.TouchableOpacity`
border-radius: 8px;
background-color: ${props => props.coachColorVar === "toki" ? theme.toki.color.main : theme.booki.color.main};
color: ${theme.grayScale.white};
width: 135px;
padding: 12px 0;
align-items: center;
margin: 0 5px;
`;

const OkayBtnText = styled(H4Text)`
color: ${theme.grayScale.white};

`;

export default StatusHome;
