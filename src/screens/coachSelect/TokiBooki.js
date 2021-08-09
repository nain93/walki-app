import React from "react";
import styled from "styled-components";
import { Text, View } from "react-native";
import tokiImg from "../../../assets/images/toki_character.png";
import bookiImg from "../../../assets/images/booki_character.png";
import { theme } from "../../styles/theme";

const TokiBooki = () => {
  return (
    <Container>
      <View>
        <TokiBookiStyle>
          <Wrapper>
            <TokiBookiImg source={tokiImg} resizeMode="contain" />
            <TitleBox>
              <NameTitle>토키 코치</NameTitle>
              <Text style={{ color: theme.grayScale.gray3 }}>
                뛰기와 스피드를 즐긴다면?
              </Text>
            </TitleBox>
          </Wrapper>
        </TokiBookiStyle>
        <TokiBookiStyle>
          <Wrapper>
            <TokiBookiImg source={bookiImg} resizeMode="contain" />
            <TitleBox>
              <NameTitle>부키 코치</NameTitle>
              <Text style={{ color: theme.grayScale.gray3 }}>
                걷기와 여유를 즐긴다면?
              </Text>
            </TitleBox>
          </Wrapper>
        </TokiBookiStyle>
      </View>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const TokiBookiStyle = styled.TouchableOpacity`
  width: 100%;
  height: 122px;
  background-color: ${theme.grayScale.gray7};
  margin: 10px 0;
  border-radius: 16px;
  padding: 10px 40px;
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
  color: ${theme.grayScale.gray1};
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export default TokiBooki;
