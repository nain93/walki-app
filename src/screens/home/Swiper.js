import React from "react";
import styled from "styled-components";
import Swiper from "react-native-web-swiper";
import onboarding01 from "../../../assets/images/img01.png";
import onboarding02 from "../../../assets/images/img02.png";
import onboarding03 from "../../../assets/images/img03.png";
import { HeaderText, theme } from "../../styles/theme";
import { Text, TouchableOpacity } from "react-native";

const HomeSwiper = () => {
  const handleSkip = () => {
    console.log("skip");
  };

  return (
    <Container>
      <Swiper
        controlsProps={{
          dotsPos: "top",
          nextTitle: "다음",
          prevTitleStyle: { display: "none" },
          firstPrevElement: () => {
            return (
              <TouchableOpacity onPress={handleSkip}>
                <Text style={{ marginBottom: 200, fontSize: 16 }}>
                  건너뛰기
                </Text>
              </TouchableOpacity>
            );
          },
          nextTitleStyle: { color: "black", marginBottom: 200, fontSize: 16 },
          dotActiveStyle: {
            backgroundColor: theme.toki.color.main,
          },
          dotsWrapperStyle: {
            marginTop: 180,
          },
        }}
      >
        <SlideContainer>
          <Header>코치와 함께 러닝해보세요!</Header>
          <Desc>토키와 부키가 당신의 데일리 러닝을 {"\n"}도와줘요!</Desc>
          <SlideImg source={onboarding01} resizeMode="stretch" />
        </SlideContainer>
        <SlideContainer>
          <Header>챌린지를 생성하고 달성해보세요!</Header>
          <Desc>
            매일 챌린지를 달성하다보면 {"\n"}어느새 러닝이 습관으로 자리잡아
            있을거예요!
          </Desc>
          <SlideImg source={onboarding02} resizeMode="contain" />
        </SlideContainer>
        <SlideContainer>
          <Header>메달을 차지해보세요!</Header>
          <Desc>
            오늘 메달을 차지하지 못해도 낙심하지마세요! {"\n"}매일 기회가
            주어져요!
          </Desc>
          <SlideImg source={onboarding03} resizeMode="contain" />
        </SlideContainer>
      </Swiper>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Header = styled(HeaderText)``;

const Desc = styled.Text`
  margin: 0 10px;
  font-size: 16px;
`;

const SlideContainer = styled.View`
  flex: 1;
  justify-content: center;
  background-color: white;
  text-align: left;
`;

const SlideImg = styled.Image`
  width: 100%;
  flex: 0.6;
  margin: 50px 0;
`;

export default HomeSwiper;
