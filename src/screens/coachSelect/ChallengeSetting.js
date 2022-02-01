import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import LongButton from "../../components/LongButton";
import { Body1Text, theme } from "../../styles/theme";
import { coachColorVar, monthVar, stepGoalVar, stepVar, walkStatus } from "../../../apollo";
import { gql, useMutation, useReactiveVar, useQuery } from "@apollo/client";
import { KeyboardAvoidingView, Platform } from "react-native";
import { getToday, getYesterday } from "../../common/getToday";
import HeaderForm from "../../components/HeaderForm";
import BackgroundService from 'react-native-background-actions';
import BackgroundFetch from "react-native-background-fetch";


import { startCounter, stopCounter } from 'react-native-accurate-step-counter';
import { d2p } from "../../common/utils";


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

  const stepstep = useReactiveVar(stepVar);
  const stepGoal = useReactiveVar(stepGoalVar)

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

  
    const init = () => {
      BackgroundFetch.configure(
        {
          minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
          // Android options
          forceAlarmManager: true, // <-- Set true to bypass JobScheduler.
          stopOnTerminate: false,
          startOnBoot: true,
          requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
          requiresCharging: false, // Default
          requiresDeviceIdle: false, // Default
          requiresBatteryNotLow: false, // Default
          requiresStorageNotLow: false, // Default
        },
        async (taskId) => {
          console.log('[js] Received background-fetch event: ', taskId);
          console.log("gogo");
          // Use a switch statement to route task-handling.
          switch (taskId) {
            case 'com.transistorsoft.fetch':
              console.log('Received custom task');
              try {
                const result = "foo"
                console.log('result: ', result);
              } catch (err) {
                console.log('fetch failed', err);
              }
              break;
            default:
              console.log('Default fetch task');
          }
          
         
          
          // Required: Signal completion of your task to native code
          // If you fail to do this, the OS can terminate your app
          // or assign battery-blame for consuming too much background-time
         
        },
        
        (error) => {
          console.log('[js] RNBackgroundFetch failed to start');
        },

        
      );

      BackgroundFetch.scheduleTask({
        taskId: "com.transistorsoft.fetch",
        forceAlarmManager: true,
        delay: 5000,
      })
  
      // Optional: Query the authorization status.
      BackgroundFetch.status((status) => {
        switch (status) {
          case BackgroundFetch.STATUS_RESTRICTED:
            console.log('BackgroundFetch restricted');
            break;
          case BackgroundFetch.STATUS_DENIED:
            console.log('BackgroundFetch denied');
            break;
          case BackgroundFetch.STATUS_AVAILABLE:
           
            console.log('BackgroundFetch is enabled');
            console.log("right?");
            
            break;
          default:
            console.log('Default fetch task');
        }
      });
      const date = new Date()
          if (date.getHours() === 0 && date.getMinutes() === 0 && (date.getSeconds() >= 0 || date.getSeconds() < 5)) {
             putChallengeMutation({
              variables: {
                challenge: {
                  step: stepstep,
                  stepGoal: inputWatch,
                  challengeDate: getYesterday(),
                },
              },
            });
  
            walkStatus("home")
            BackgroundFetch.finish()
          }
     
    };

    
    useEffect(() => {
      const backGroundInterval = setInterval(() => {
        init();
      },1000)
      return ()=>clearInterval()
    }, []);

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
    const { delay } = taskDataArguments;

    await new Promise(async (resolve) => {
      let a = 0;
      const config = {
        default_threshold: 15.0,
        default_delay: 150000000,
        cheatInterval: 3000,
        onStepCountChange: (stepCount) => a = stepCount,
        onCheat: () => { console.log("User is Cheating") }
      }
      startCounter(config);

      for (let i = 0; BackgroundService.isRunning(); i++) {
        await BackgroundService.updateNotification({ taskTitle: `걸음수: ${a}` })
        stepVar(a)
        if (a >= inputWatch) {
          walkStatus("success")
        }
        const date = new Date()
        console.log(date.getSeconds(), "getSeconds");
        console.log(date.getMinutes(), "getMinutes");
        if (date.getHours() === 0 && date.getMinutes() === 0 && (date.getSeconds() >= 0 || date.getSeconds() <= 5)) {
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
    if (Platform.OS === "android") {
      await BackgroundService.start(veryIntensiveTask, options);
    } else {
      await BackgroundFetch.start(init, options)
    }
    stepGoalVar(inputWatch)
    walkStatus("walking");
    navigation.goBack();
  };


  useEffect(() => {
    init()
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
        <HeaderForm
          headerChildren={"오늘의 챌린지 세우기"}
          descChildren={
            "우리 오늘은 얼마나 걸어볼까요? \n200걸음 이상 설정해보세요!"
          }
          align="left"
        />
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
  margin: ${d2p(40)}px 0;
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
  padding-top: ${d2p(13)}px;
  padding-left: ${d2p(38)}px;
  padding-right: ${d2p(38)}px;
`;

export default ChallengeSetting;
