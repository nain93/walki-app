import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { View, Text } from "react-native";
import { useState } from "react/cjs/react.development";
import tokiImg from "../../../assets/images/toki_character.png";
import bookiImg from "../../../assets/images/booki_character.png";

const TokiBookiSelect = ({ swiperRef }) => {
  const [coachSelect, setCoachSelect] = useState("");

  const handleTokiSelect = () => {
    setCoachSelect("toki");
  };

  const handleBookiSelect = () => {
    setCoachSelect("booki");
  };

  return (
    <>
      <View>
        <TokiBox selected={coachSelect === "toki"} onPress={handleTokiSelect}>
          <Wrapper>
            <TokiBookiImg source={tokiImg} resizeMode="contain" />
            <TitleBox>
              <TokiTitle selected={coachSelect === "toki"}>토키 코치</TokiTitle>
              <Text style={{ color: theme.grayScale.gray3 }}>
                뛰기와 스피드를 즐긴다면?
              </Text>
            </TitleBox>
          </Wrapper>
        </TokiBox>
        <BookiBox
          style={{ marginBottom: 100 }}
          selected={coachSelect === "booki"}
          onPress={handleBookiSelect}
        >
          <Wrapper>
            <TokiBookiImg source={bookiImg} resizeMode="contain" />
            <TitleBox>
              <BookiTitle selected={coachSelect === "booki"}>
                부키 코치
              </BookiTitle>
              <Text style={{ color: theme.grayScale.gray3 }}>
                걷기와 여유를 즐긴다면?
              </Text>
            </TitleBox>
          </Wrapper>
        </BookiBox>
      </View>
      <NextButton
        disabled={!coachSelect}
        onPress={() => swiperRef?.current.goToNext()}
      >
        <NextText>다음</NextText>
      </NextButton>
    </>
  );
};

const NextButton = styled.TouchableOpacity`
  width: 100%;
  height: 54px;
  background-color: ${theme.grayScale.black};
  color: ${theme.grayScale.white};
  border-radius: 8px;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};
`;

const NextText = styled.Text`
  color: ${theme.grayScale.white};
  text-align: center;
`;

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

const NameTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
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
