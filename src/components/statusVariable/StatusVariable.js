import { useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import GoogleFit, { Scopes } from "react-native-google-fit";
import { statusVar, stepVar } from "../../../apollo";
import StatusAndroid from "./StatusAndroid";
import StatusIos from "./StatusIos";
import { gql, useMutation } from "@apollo/client";
import { PERMISSIONS, request } from "react-native-permissions";

const options = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_ACTIVITY_WRITE,
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_BODY_WRITE,
  ],
};

const StatusVariable = (props) => {
  const step = useReactiveVar(stepVar);
  const status = useReactiveVar(statusVar);
  const PUT_CHALLENGE = gql`
    mutation putChallenge($challenge: ChallengeInput) {
      putChallenge(challenge: $challenge) {
        step
      }
    }
  `;

  const [putChallengeMutation, {}] = useMutation(PUT_CHALLENGE, {
    onCompleted: (data) => {
      console.log(data, "data");
    },
  });

  useEffect(() => {
    if (status === "home") {
      request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then((granted) => {
        if (granted) {
          GoogleFit.authorize(options).then((authResult) => {
            if (authResult.success) {
              GoogleFit.getDailySteps(new Date().toISOString()).then((res) => {
                if (res[2].steps.length !== 0) {
                  const { date, value } = res[2].steps[0];
                  console.log(value, "value");
                  console.log(step, "step");
                  putChallengeMutation({
                    variables: {
                      challenge: {
                        step: value - step.step,
                        challengeDate: step.date,
                      },
                    },
                  });
                }
              });
            } else {
              console.log("AUTH_DENIED", authResult.message);
            }
          });
        } else {
          // todo 구글핏 허가 안받았을때 에러 처리
        }
      });
    }
  }, []);

  if (Platform.OS === "android") {
    return <StatusAndroid props={{ ...props }} />;
  }
  if (Platform.OS === "ios") {
    return <StatusIos props={{ ...props }} />;
  }
};

export default StatusVariable;
