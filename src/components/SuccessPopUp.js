import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import fire from "../../assets/icons/fire.png";
import { View,Animated,Easing } from "react-native";

import LongButton from "./LongButton";
import { Body1Text, theme, H1Text } from "../styles/theme";
import { coachColorVar } from "../../apollo";

const SuccessPopUp = ({ navigation }) => {
  const [animaiton,setAnimation] = useState(new Animated.Value(0))
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(()=>{
    Animated.timing(animaiton,{
      toValue:10,
      duration:300,
      easing:Easing.bezier(0.7, -0.4, 0.4, 1.4),
      useNativeDriver:true
    }).start()
  },[])
  
  return (
    <Container>
        <TodayChallengeBox>
        <Animated.Image 
        style={{transform:[{translateY:animaiton}]}}
        source={fire}/>
          <ChallengeText>오늘의 목표 달성!</ChallengeText>
          <WalkiText>일째 목표 달성 중</WalkiText>
        </TodayChallengeBox>
        <LongBox>
          <LongButton
            onpress={() => navigation.goBack()}
            btnBackColor={coachColorVar()?.color?.main}
          >
            계속하기
          </LongButton>
        </LongBox>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex:1;
  align-items: center;
`;

const LongBox = styled.View`
  width: 300px;
  height: 54px;
  margin-top: 141px;
`;

const TodayChallengeBox = styled.View`
  margin-top: 226px;
  align-items: center;
`;

const ChallengeText = styled(H1Text)`
  text-align: center;
  margin-bottom: 8px;
  color: ${theme.grayScale.gray1};
`;
const WalkiText = styled(Body1Text)`
  text-align: center;
  color: ${theme.TextColor};
`;
const Fire = styled.Image`
  width: 132px;
  height: 168px;
`;
export default SuccessPopUp;
