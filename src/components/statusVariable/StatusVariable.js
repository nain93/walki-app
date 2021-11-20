import { useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { stepVar } from "../../../apollo";
import StatusAndroid from "./StatusAndroid";
import StatusIos from "./StatusIos";
import { gql, useMutation } from "@apollo/client";

const StatusVariable = (props) => {
  const step = useReactiveVar(stepVar);
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
    if (step.date) {
      putChallengeMutation({
        variables: {
          challenge: {
            step: step.step,
            challengeDate: step.date,
          },
        },
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
