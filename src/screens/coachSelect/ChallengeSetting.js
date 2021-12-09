import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import LongButton from "../../components/LongButton";
import { Body1Text, theme } from "../../styles/theme";
import { coachColorVar, monthVar, stepVar, walkStatus } from "../../../apollo";
import { gql, useMutation, useReactiveVar, useQuery } from "@apollo/client";
import { KeyboardAvoidingView } from "react-native";
import { getToday, getYesterday } from "../../common/getToday";
import HeaderForm from "../../components/HeaderForm";
import BackgroundService from 'react-native-background-actions';
import { startCounter, stopCounter } from 'react-native-accurate-step-counter';

const ChallengeSetting = ({ navigation }) => {
  const step = useReactiveVar(stepVar);
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

  const PUT_CHALLENGE_MUTATION = gql`
    mutation putChallenge($challenge: ChallengeInput) {
      putChallenge(challenge: $challenge) {
        step
        stepGoal
        challengeDate
      }
    }
  `;

  const GET_CHALLENGES_QUERY = gql`
    query getChallenges {
      getChallenges {
        challengeDate
      }
    }
  `;

  const { refetch } = useQuery(GET_CHALLENGES_QUERY, {
    onCompleted: (data) => {
      const arr = [];
      data.getChallenges.map((item, idx) => {
        if (arr[idx - 1]?.month === Number(item.challengeDate.slice(5, 7))) {
          return;
        }
        arr.push({
          year: Number(item.challengeDate.slice(0, 4)),
          month: Number(item.challengeDate.slice(5, 7)),
        });
      });
      monthVar([...arr]);
    },
  });

  const [putChallengeMutation, { loading }] = useMutation(
    PUT_CHALLENGE_MUTATION,
    {
      onCompleted: (data) => {
        refetch();
      },
      refetchQueries: [
        {
          query: GET_CHALLENGES_QUERY,
        },
      ],
      awaitRefetchQueries: true,
      // ! refetchQueries
    }
  );

  const options = {
    taskName: 'Example',
    taskTitle: `걸음수: 0`,
    taskDesc: `목표 걸음수: ${inputWatch}`,
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'app://open.my.app', 
    parameters: {
        delay: 1000,
    },
};

  const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

  const veryIntensiveTask = async (taskDataArguments) => {
    const {delay} = taskDataArguments;

    await new Promise(async (resolve) => {
      let a = 0;
      const config = {
        default_threshold: 15.0,
        default_delay: 150000000,
        cheatInterval: 3000,
        onStepCountChange: (stepCount) =>  a = stepCount ,
        onCheat: () => { console.log("User is Cheating") }
      }
      startCounter(config);
      for (let i = 0; BackgroundService.isRunning(); i++) {
        await BackgroundService.updateNotification({taskTitle: `걸음수: ${a}`})
        stepVar(a)
        const date = new Date()
        if (date.getHours() === 0 && date.getMinutes()===0 && date.getSeconds()===0){
          await putChallengeMutation({
            variables: {
              challenge: {
                step: a,
                stepGoal: inputWatch,
                challengeDate: getYesterday(),
              },
            },
          });
          walkStatus("home")
          await BackgroundService.stop()
        }
        await sleep(delay);
      }
    })
  };

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
    await BackgroundService.start(veryIntensiveTask, options);
    walkStatus("walking");
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

const Container = styled.View`
  flex: 1;
  padding: 30px;
  justify-content: space-between;
  align-items: center;
`;

export default ChallengeSetting;
