import React from "react";
import CharacterModal from "../../../components/CharacterModal";
import tokiFail from "../../../../assets/images/toki_fail.png";
import bukiFail from "../../../../assets/images/buki_fail.png";
import { Body1Text, H2Text, theme } from "../../../styles/theme";
import { useMutation, gql } from "@apollo/client";
import { isCoachVar, logUserOut } from "../../../../apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STOARGE from "../../../constants/stoarge";

const DeleteUser = ({ handleDeleteModal, deleteModalOpen }) => {
  const DELETE_USER_MUTATION = gql`
    mutation deleteMember {
      deleteMember
    }
  `;
  const [deleteUserMutation] = useMutation(DELETE_USER_MUTATION);

  const handleOkayBtn = async () => {
    const { COACH, STATUS } = STOARGE;
    deleteUserMutation();
    await logUserOut();
    await AsyncStorage.removeItem(COACH);
    await AsyncStorage.removeItem(STATUS);
    isCoachVar(false);
    handleDeleteModal();
  };

  return (
    <CharacterModal
      open={deleteModalOpen}
      handleOkayBtn={handleOkayBtn}
      tokiImg={tokiFail}
      bukiImg={bukiFail}
      handleModal={handleDeleteModal}
      handleOkayBtn={handleOkayBtn}
      okayText={"탈퇴하기"}
    >
      <H2Text>정말 탈퇴할거에요?</H2Text>
      <Body1Text style={{ color: theme.TextColor }}>
        쌓여왔던 운동 기록이 사라져요.
      </Body1Text>
    </CharacterModal>
  );
};

export default DeleteUser;
