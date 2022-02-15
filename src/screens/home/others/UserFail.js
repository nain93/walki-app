import React from "react";
import CharacterModal from "../../../components/CharacterModal";
import tokiFail from "../../../../assets/images/toki_fail.png";
import bukiFail from "../../../../assets/images/buki_fail.png";
import { Body1Text, H2Text, theme } from "../../../styles/theme";
import { stepGoalVar, stepVar, walkStatus } from "../../../../apollo";
import BackgroundService from 'react-native-background-actions';
import { d2p } from "../../../common/utils";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { getToday } from "../../../common/getToday";

const UserFail = ({ handleFailModal, failModalOpen }) => {

  const PUT_CHALLENGE_MUTATION = gql`
    mutation putChallenge($challenge: ChallengeInput) {
      putChallenge(challenge: $challenge) {
        step
        stepGoal
        challengeDate
      }
    }
  `;

  const [putChallengeMutation, { loading }] = useMutation(PUT_CHALLENGE_MUTATION);

  const step = useReactiveVar(stepVar);
  const stepGoal = useReactiveVar(stepGoalVar)

  const handleOkayBtn = async () => {
    await putChallengeMutation({
      variables: {
        challenge: {
          step,
          stepGoal,
          challengeDate: getToday(),
        },
      },
    });
    await BackgroundService.stop()
    walkStatus("afterStop");
    handleFailModal();
  };
  return (
    <CharacterModal
      open={failModalOpen}
      handleOkayBtn={handleOkayBtn}
      tokiImg={tokiFail}
      bukiImg={bukiFail}
      handleModal={handleFailModal}
      okayText="그만하기"
    >
      <H2Text>정말 그만할거에요?</H2Text>
      <Body1Text style={{ color: theme.TextColor, textAlign: "center", marginTop: d2p(8), marginBottom: d2p(24) }}>
        그만하기를 선택하면{"\n"}오늘은 다시 운동할 수 없어요.
      </Body1Text>
    </CharacterModal>
  );
};

export default UserFail;
