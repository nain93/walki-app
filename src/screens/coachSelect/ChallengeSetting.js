import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import LongButton from "../../components/LongButton";
import { Body1Text, H1Text, theme } from "../../styles/theme";
import { coachColorVar } from "../../../apollo";
import { useReactiveVar } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import { stepVar } from "../../../apollo";
import { KeyboardAvoidingView } from "react-native";
import { CommonActions } from "@react-navigation/native";
const ChallengeSetting = ({ navigation }) => {
  const walkRef = useRef();
  const coachColor = useReactiveVar(coachColorVar);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      walkingNum: 200,
    },
  });
  function getToday() {
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  }

  const inputWatch = watch("walkingNum");
  // const walkStatus = walk
  // const coachStatus = coachColorVar().coach

  const PUT_CHALLENGE = gql`
    mutation putChallenge($challenge: ChallengeInput) {
      putChallenge(challenge: $challenge) {
        step
        stepGoal
        challengeDate
      }
    }
  `;

  function getToday() {
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  }

  const [putChallengeMutation, { data }] = useMutation(PUT_CHALLENGE, {
    onCompleted: (data) => {
      console.log(data, "data");
    },
  });

  const handlePutChallenge = async () => {
    if (inputWatch < 200) {
      return;
    }
    await putChallengeMutation({
      variables: {
        challenge: {
          step: 0,
          stepGoal: inputWatch,
          challengeDate: getToday(),
        },
      },
    });
    stepVar({
      step: inputWatch,
    });

    navigation.goBack();
    // navigation.navigate("HomeWalk")
  };

  useEffect(() => {
    walkRef?.current?.focus();
  }, []);

  useEffect(() => {
    register("walkingNum", { required: true });
  }, []);

  const defaultWalking = () => {
    //  hometabbutton > 색 black으로, 문자 오늘은 그말할래요로..Longbutton 어떡하지..?
    //  CharacterImage 변경
    // coachcolorvar.coach (toki_walk, buki_walk)
    // coachStatus.concat(walkStatus)
  };

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
          <ChallengeText>오늘의 챌린지 세우기</ChallengeText>
          <WalkiText>
            우리 오늘은 얼마나 걸어볼까요? {"\n"}
            200걸음 이상 설정해보세요!
          </WalkiText>
        </TodayChallengeBox>
        <InputBox>
          <WalkTextInput
            coachColor={coachColor}
            ref={walkRef}
            keyboardType="number-pad"
            defaultValue="200"
            onChangeText={(text) => setValue("walkingNum", text)}
            onSubmitEditing={handleSubmit(handlePutChallenge)}
            caretHidden={true}
            returnKeyType="next"
          />
          <WalkiText>걸음</WalkiText>
        </InputBox>
        <LongBox>
          <LongButton
            handleGoToNext={handleSubmit(handlePutChallenge)}
            disabled={inputWatch < 200}
            // characterStatus={setStatus("walk")}
            btnBackColor={coachColorVar()?.color?.main}
          >
            저장
          </LongButton>
        </LongBox>
      </Container>
    </KeyboardAvoidingView>
  );
};

const InputBox = styled.View`
  width: 100%;
  height: 35%;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;
const LongBox = styled.View`
  width: 80%;
  height: 15%;
  flex-direction: row;
`;

const TodayChallengeBox = styled.View`
  width: 100%;
  height: 20%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WalkTextInput = styled.TextInput`
  font-size: 64px;
  font-weight: 700;
  text-align: center;
  width: 50%;
  border-bottom-color: ${(props) => props.coachColor.color.main};
  border-bottom-width: 2px;
  margin-right: 10px;
`;
const ChallengeText = styled(H1Text)`
  text-align: center;
  color: ${theme.grayScale.gray1};
`;
const WalkiText = styled(Body1Text)`
  text-align: center;
  color: ${theme.TextColor};
`;
const Container = styled.SafeAreaView`
  align-items: center;
  width: 100%;
  height: 100%;
`;
export default ChallengeSetting;
