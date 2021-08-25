import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import LongButton from "../../components/LongButton";
import { H2Text, theme } from "../../styles/theme";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { gql, useMutation } from "@apollo/client";
import { CommonActions } from "@react-navigation/native";
import { userName } from "../../../apollo";

const EditName = ({
  navigation,
  route: {
    params: { name },
  },
}) => {
  const PUT_MEMBER = gql`
    mutation putMember($member: MemberInput) {
      putMember(member: $member) {
        name
      }
    }
  `;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      name,
    },
  });
  const inputWatch = watch("name");
  const newName = getValues("name");

  const [putMemberMutation, { loading, data, error }] = useMutation(
    PUT_MEMBER,
    {
      onCompleted: (data) => {
        if (!loading) {
          userName({
            name: data.putMember.name,
            profileImage: "",
          });
        }
      },
    }
  );

  const dismissKeyBoard = () => {
    Keyboard.dismiss();
  };

  const handleGoToNext = () => {
    if (inputWatch === name) {
      return;
    }
    if (!loading) {
      putMemberMutation({
        variables: {
          member: {
            name: newName,
          },
        },
      });
      navigation.goBack();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyBoard}>
      <Container>
        <HeaderTitle>이름 변경</HeaderTitle>
        <NameInput
          defaultValue={name}
          onChangeText={(text) => setValue("name", text)}
          onSubmitEditing={handleSubmit(handleGoToNext)}
        />
        <LongButton
          handleGoToNext={handleGoToNext}
          disabled={inputWatch === name}
          btnBackColor={theme.toki.color.main}
        >
          변경하기
        </LongButton>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 30px;
  align-items: center;
`;

const HeaderTitle = styled(H2Text)`
  margin: 15px 0px;
`;

const NameInput = styled.TextInput`
  width: 100%;
  height: 48px;
  justify-content: center;
  background-color: ${theme.grayScale.gray7};
  border-radius: 8px;
  margin: 10px 0;
  border: 1px solid ${theme.grayScale.gray5};
  padding: 0 10px;
`;

export default EditName;
