import React, { useRef } from "react"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import LongButton from "../../components/LongButton"
import { Body1Text, H1Text, theme } from "../../styles/theme"
import { coachColorVar } from "../../../apollo"
import { useReactiveVar } from "@apollo/client"

const ChallengeSetting = ({ swiperRef, navigation }) => {
  const walkRef = useRef()
  const coachColor = useReactiveVar(coachColorVar)
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
  })

  const inputWatch = watch("walkingNum")

  const handleGoToNext = () => {
    if (inputWatch < 200) {
      return
    }
    swiperRef?.current.goToNext()
    navigation.navigate("TabNavigator")
  }

  return (
    <>
      <TodayChallengeBox>
        <WalkiText>
          우리 오늘은 얼마나 걸어볼까요? {"\n"}
          200걸음 이상 설정해보세요!
        </WalkiText>
      </TodayChallengeBox>
      <InputBox>
        <WalkTextInput
          coachColor={coachColor}
          ref={walkRef}
          keyboardType="number-pad"
          defaultValue="200"
          onChangeText={text => setValue("walkingNum", text)}
          onSubmitEditing={handleSubmit(handleGoToNext)}
          caretHidden={true}
          returnKeyType="next"
          {...register("walkingNum", {
            required: true,
          })}
        />
        <WalkiText>걸음</WalkiText>
      </InputBox>
      <LongBox>
        <LongButton
          handleGoToNext={handleSubmit(handleGoToNext)}
          disabled={inputWatch < 200}
          btnBackColor={coachColorVar()?.color?.main}>
          선택 완료
        </LongButton>
      </LongBox>
    </>
  )
}

const InputBox = styled.View`
  width: 100%;
  height: 35%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
  border-width: 1px;
`
const LongBox = styled.View`
  width: 80%;
  height: 15%;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  border-width: 1px;
`

const TodayChallengeBox = styled.View`
  width: 100%;
  height: 20%;
  flex-direction: column;
`

const TodayChallenge = styled.Text`
  width: 100%;
  height: 15%;
`

const WalkTextInput = styled.TextInput`
  font-size: 64px;
  font-weight: 700;
  text-align: center;
  width: 50%;
  border-bottom-color: ${props => props.coachColor.color.main};
  border-bottom-width: 2px;
  margin-right: 10px;
`
const challengeText = styled(H1Text)`
  text-align: center;
  color: ${theme.grayScale.gray1};
`
const WalkiText = styled(Body1Text)`
  text-align: center;
  color: ${theme.TextColor};
`

export default ChallengeSetting
