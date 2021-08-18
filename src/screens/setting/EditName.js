import React from "react";
import { useForm } from "react-hook-form";
import { View, Text, TextInput } from "react-native";
import styled from "styled-components";
import LongButton from "../../components/LongButton";
import { H2Text, theme } from "../../styles/theme";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

const EditName = () => {
  const dismissKeyBoard = () => {
    Keyboard.dismiss();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      name: "구남규",
    },
  });

  const handleGoToNext = () => {
    const data = getValues("name");
    console.log(data);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyBoard}>
      <Container>
        <HeaderTitle>이름 변경</HeaderTitle>
        <NameInput
          defaultValue="구남규"
          onChangeText={(text) => setValue("name", text)}
          onSubmitEditing={handleSubmit(handleGoToNext)}
        />
        <LongButton
          handleGoToNext={handleGoToNext}
          disabled={getValues("name") === "구남규"}
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

const NameChange = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
`;

export default EditName;
