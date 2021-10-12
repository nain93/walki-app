import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import LongButton from "../../components/LongButton";
import { Body1Text, theme } from "../../styles/theme";
import { coachColorVar, monthVar, statusVar } from "../../../apollo";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { KeyboardAvoidingView } from "react-native";
import { getToday, month, year } from "../../common/getToday";
import HeaderForm from "../../components/HeaderForm";
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

  const inputWatch = watch("walkingNum");

  const PUT_CHALLENGE = gql`
    mutation putChallenge($challenge: ChallengeInput) {
      putChallenge(challenge: $challenge) {
        step
        stepGoal
        challengeDate
      }
    }
  `;

  const [putChallengeMutation, { data, loading }] = useMutation(PUT_CHALLENGE, {
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
    const check = monthVar().walkedMonth.map((item) => {
      return month === item.month;
    });
    if (!check) {
      monthVar({
        walkedMonth: (prev) => [...prev, { month, year }],
      });
    }

    statusVar("walking");
    navigation.goBack();
  };

  useEffect(() => {
    walkRef?.current?.focus();
  }, []);

  useEffect(() => {
    register("walkingNum", { required: true });
  }, []);

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
          <HeaderForm
            headerChildren={"오늘의 챌린지 세우기"}
            descChildren={
              "우리 오늘은 얼마나 걸어볼까요? \n200걸음 이상 설정해보세요!"
            }
            align="left"
          />
        </TodayChallengeBox>
        <InputBox>
          <WalkTextInput
            coachColor={coachColor}
            ref={walkRef}
            keyboardType="number-pad"
            defaultValue="200"
            onChangeText={(text) => setValue("walkingNum", text)}
            onSubmitEditing={handleSubmit(handlePutChallenge)}
            returnKeyType="next"
          />
          <WalkiText>걸음</WalkiText>
        </InputBox>
        <LongButton
          handleGoToNext={handleSubmit(handlePutChallenge)}
          disabled={inputWatch < 200}
          btnBackColor={coachColorVar()?.color?.main}
          loading={loading}
        >
          저장
        </LongButton>
      </Container>
    </KeyboardAvoidingView>
  );
};

const InputBox = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: flex-end;
`;

const TodayChallengeBox = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WalkTextInput = styled.TextInput`
  font-size: 64px;
  font-weight: 700;
  text-align: center;
  width: 80%;
  border-bottom-color: ${(props) => props.coachColor.color.main};
  border-bottom-width: 2px;
  margin-right: 10px;
  color: ${theme.grayScale.gray1};
`;

const WalkiText = styled(Body1Text)`
  color: ${theme.grayScale.gray1};
`;

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 30px;
  justify-content: space-between;
  align-items: center;
`;

export default ChallengeSetting;
