import React, { useState } from "react";
import styled from "styled-components";
import { Body3Text, H3Text, theme } from "../../styles/theme";
import { View } from "react-native";
import tokiImg from "../../../assets/images/toki_character.png";
import bookiImg from "../../../assets/images/booki_character.png";
import LongButton from "../../components/LongButton";
import { coachColorVar } from "../../../apollo";

const TokiBookiSelect = ({ navigation }) => {
  const [coachSelect, setCoachSelect] = useState("");

  const handleTokiSelect = () => {
    setCoachSelect("toki");
    coachColorVar({ coach: "toki", ...theme.toki });
  };

  const handleBookiSelect = () => {
    setCoachSelect("booki");
    coachColorVar({ coach: "booki", ...theme.booki });
  };

  const handleGoToNext = () => {
    // swiperRef?.current.goToNext();
    navigation.navigate("BeforeStart");
  };

  return (
    <Container>
      <View>
        <TokiBox selected={coachSelect === "toki"} onPress={handleTokiSelect}>
          <Wrapper>
            <TokiBookiImg source={tokiImg} resizeMode="contain" />
            <TitleBox>
              <TokiTitle selected={coachSelect === "toki"}>토키 코치</TokiTitle>
              <Desc>뛰기와 스피드를 즐긴다면?</Desc>
            </TitleBox>
          </Wrapper>
        </TokiBox>
        <BookiBox
          selected={coachSelect === "booki"}
          onPress={handleBookiSelect}
        >
          <Wrapper>
            <TokiBookiImg source={bookiImg} resizeMode="contain" />
            <TitleBox>
              <BookiTitle selected={coachSelect === "booki"}>
                부키 코치
              </BookiTitle>
              <Desc>걷기와 여유를 즐긴다면?</Desc>
            </TitleBox>
          </Wrapper>
        </BookiBox>
      </View>
      <LongButton
        handleGoToNext={handleGoToNext}
        disabled={!coachSelect}
        btnBackColor={theme.grayScale.black}
      >
        선택 완료
      </LongButton>
    </Container>
  );
};

const Container = styled.View``;

const TokiBookiStyle = styled.TouchableOpacity`
  width: 100%;
  height: 122px;
  background-color: ${theme.grayScale.gray7};
  margin: 10px 0;
  border-radius: 16px;
  padding: 10px 40px;
`;

const TokiBox = styled(TokiBookiStyle)`
  border: ${(props) =>
    props.selected ? `2px solid ${theme.toki.color.main}` : "none"};
`;

const BookiBox = styled(TokiBookiStyle)`
  border: ${(props) =>
    props.selected ? `2px solid ${theme.booki.color.main}` : "none"};
  margin-bottom: 100px;
`;

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TokiBookiImg = styled.Image`
  width: 80px;
  height: 91px;
`;

const TitleBox = styled.View`
  width: 60%;
`;

const NameTitle = styled(H3Text)`
  margin-bottom: 10px;
`;

const Desc = styled(Body3Text)`
  color: ${theme.grayScale.gray3};
`;

const TokiTitle = styled(NameTitle)`
  color: ${(props) =>
    props.selected ? theme.toki.color.main : theme.grayScale.gray1};
`;

const BookiTitle = styled(NameTitle)`
  color: ${(props) =>
    props.selected ? theme.booki.color.main : theme.grayScale.gray1};
`;

export default TokiBookiSelect;
