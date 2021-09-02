import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import LongButton from "../../components/LongButton";
import { H2Text, theme } from "../../styles/theme";
import {
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { gql, useMutation } from "@apollo/client";
import { coachColorVar, userNameVar } from "../../../apollo";
import deleteIcon from "../../../assets/icons/delete.png";

const EditName = ({
  navigation,
  route: {
    params: { name, profileImage },
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
  const [nameValue, setNameValue] = useState(name);

  const [putMemberMutation, { loading, data, error }] = useMutation(
    PUT_MEMBER,
    {
      onCompleted: (data) => {
        userNameVar({
          name: data.putMember.name,
          profileImage,
        });
      },
    }
  );

  const dismissKeyBoard = () => {
    Keyboard.dismiss();
  };

  const handleGoToNext = () => {
    if (inputWatch === name || inputWatch === "") {
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

  const handleDeleteInput = () => {
    setValue("name", "");
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyBoard}>
      <Container>
        <HeaderTitle>이름 변경</HeaderTitle>
        <NameInputWrap>
          <NameInput
            defaultValue={newName ? newName : ""}
            onChangeText={(text) => setValue("name", text)}
            onSubmitEditing={handleSubmit(handleGoToNext)}
          />
          <TouchableOpacity onPress={handleDeleteInput}>
            <Image
              source={deleteIcon}
              style={{ width: 18 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </NameInputWrap>

        <LongButton
          handleGoToNext={handleGoToNext}
          disabled={inputWatch === name || inputWatch === ""}
          btnBackColor={coachColorVar().color.main}
        >
          {loading ? <ActivityIndicator color="white" /> : "변경하기"}
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

const NameInputWrap = styled.View`
  flex-direction: row;
  width: 100%;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.grayScale.gray7};
  border-radius: 8px;
  margin: 10px 0;
  border: 1px solid ${theme.grayScale.gray5};
  padding: 0 10px;
`;

const NameInput = styled.TextInput`
  width: 80%;
`;

export default EditName;
