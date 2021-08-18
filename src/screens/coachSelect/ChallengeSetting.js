import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import LongButton from "../../components/LongButton";
import { Body1Text, theme } from "../../styles/theme";
import { coachColorVar } from "../../../apollo";

const ChallengeSetting = ({ swiperRef }) => {
  const walkRef = useRef();

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

  const handleGoToNext = () => {
    if (inputWatch < 200) {
      return;
    }
    swiperRef?.current.goToNext();
  };

  return (
    <>
      <InputBox>
        <WalkTextInput
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

      <LongButton
        handleGoToNext={handleSubmit(handleGoToNext)}
        disabled={inputWatch < 200}
        btnBackColor={coachColorVar()?.color?.main}
      >
        선택 완료
      </LongButton>
    </>
  );
};

const InputBox = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 100px;
`;

const WalkTextInput = styled.TextInput`
  font-size: 64px;
  font-weight: 700;
  text-align: center;
  width: 80%;
  border-bottom-color: ${theme.toki.color.main};
  border-bottom-width: 2px;
  margin-right: 10px;
`;

const WalkiText = styled(Body1Text)``;

export default ChallengeSetting;
