import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import LongButton from "../../components/LongButton";
import { Body1Text, H1Text, theme } from "../../styles/theme";
import { coachColorVar } from "../../../apollo";
import { useReactiveVar } from "@apollo/client";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { stepVar } from "../../../apollo";
const ChallengeSetting = ({ swiperRef, navigation }) => {
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

  const [status, setStatus] = useState("");
  const inputWatch = watch("walkingNum");
  // const walkStatus = walk
  // const coachStatus = coachColorVar().coach
  const handleGoToNext = () => {
    if (inputWatch < 200) {
      return;
    }
    swiperRef?.current.goToNext();
    navigation.navigate("TabNavigator");
  };

  const PUT_CHALLENGE = gql`
    mutation putChallenge($challenge: ChallengeInput) {
      putChallenge(challenge: $challenge) {
        step
        stepGoal
        challengeDate
      }
    }
  `;
  const [putChallengeMutation, { data }] = useMutation(PUT_CHALLENGE, {
    onCompleted: (data) => {
      console.log(data, "data");
    },
  });

  useEffect(() => {
    putChallengeMutation({
      variables: {
        challenge: {
          step: 100,
          stepGoal: 200,
          challengeDate: "2021-02-11",
        },
      },
    });
  }, []);

  const defaultWalking = () => {
    //  hometabbutton > 색 black으로, 문자 오늘은 그말할래요로..Longbutton 어떡하지..?
    //  CharacterImage 변경
    // coachcolorvar.coach (toki_walk, buki_walk)
    // putChallengeMutation({
    //   variables: {
    //     step: walkRef,
    //     stepGoal: inputWatch,
    //   },
    // })
    // coachStatus.concat(walkStatus)
  };

  return (
    <>
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
            onSubmitEditing={handleSubmit(handleGoToNext)}
            caretHidden={true}
            returnKeyType="next"
            {...register("walkingNum", {
              required: true,
            })}
          />
          <WalkiText>걸음</WalkiText>
        </InputBox>
        <LongBox>
          <LongButton
            handleGoToNext={handleSubmit(handleGoToNext)}
            disabled={inputWatch < 200}
            // characterStatus={setStatus("walk")}
            btnBackColor={coachColorVar()?.color?.main}
          >
            저장
          </LongButton>
        </LongBox>
      </Container>
    </>
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
