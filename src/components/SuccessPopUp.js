import React from "react";
import styled from "styled-components";
import fire from "../../assets/icons/fire.png";
import { useForm, useEffect } from "react-hook-form";

import LongButton from "./LongButton";
import { Body1Text, theme, H1Text } from "../styles/theme";
import { coachColorVar, statusVar, walkStatus } from "../../apollo";
import { KeyboardAvoidingView } from "react-native";

const SuccessPopUp = ({ navigation }) => {
  // const { putStatus, setStatus } = useForm({
  //   defaultValues: {
  //     statusVar: "walking",
  //   },
  // });
  const NextPage = () => {
    walkStatus("success");
    navigation.navigate("HomeCompleted");
    navigation.goBack();
  };
  // useEffect(() => {
  //   putStatus("walking");
  // }, []);
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={"height"}
      keyboardVerticalOffset={100}
    >
      <Container>
        <TodayChallengeBox>
          <Fire source={fire} resizeMode={"contain"}></Fire>
          <ChallengeText>오늘의 목표 달성!</ChallengeText>
          <WalkiText>일째 목표 달성 중</WalkiText>
        </TodayChallengeBox>
        <LongBox>
          <LongButton
            onpress={() => NextPage()}
            btnBackColor={coachColorVar()?.color?.main}
          >
            계속하기
          </LongButton>
        </LongBox>
      </Container>
    </KeyboardAvoidingView>
  );
};

const Container = styled.SafeAreaView`
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 150px;
`;

const LongBox = styled.View`
  width: 80%;
  height: 15%;
  flex-direction: row;
  margin-top: 250px;
`;

const TodayChallengeBox = styled.View`
  width: 100%;
  height: 20%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ChallengeText = styled(H1Text)`
  text-align: center;
  color: ${theme.grayScale.gray1};
`;
const WalkiText = styled(Body1Text)`
  text-align: center;
  color: ${theme.TextColor};
`;
const Fire = styled.Image`
  width: 120px;
  height: 192px;
`;
export default SuccessPopUp;
