import React from "react";
import styled from "styled-components";
import Swiper from "react-native-web-swiper";
import onboarding01 from "../../../assets/images/img01.png";
import onboarding02 from "../../../assets/images/img02.png";
import onboarding03 from "../../../assets/images/img03.png";
import { Body1Text, H1Text, theme } from "../../styles/theme";
import { View } from "react-native";
import HeaderForm from "../../components/HeaderForm";

const HomeSwiper = () => {
  return (
    <Container>
      <Swiper
        controlsProps={{
          dotsPos: "top",
          nextPos: false,
          prevPos: false,
          nextTitleStyle: { display: "none" },
          prevTitleStyle: { display: "none" },
          dotActiveStyle: {
            backgroundColor: theme.toki.color.main,
          },
        }}
      >
        <SlideContainer>
          <SlideBox>
            <HeaderForm
              headerChildren={"코치와 함께 \n러닝해보세요!"}
              descChildren={"토키와 부키가 당신의 데일리 러닝을 \n도와줘요!"}
              align="left"
            />
            <SlideImg source={onboarding01} resizeMode="contain" />
          </SlideBox>
        </SlideContainer>
        <SlideContainer>
          <SlideBox>
            <HeaderForm
              headerChildren={"챌린지를 생성하고 \n달성해보세요!"}
              descChildren={
                "매일 챌린지를 달성하다보면 \n어느새 러닝이 습관으로 자리잡아 있을거예요!"
              }
              align="left"
            />
            <SlideImg source={onboarding02} resizeMode="contain" />
          </SlideBox>
        </SlideContainer>
        <SlideContainer>
          <SlideBox>
            <HeaderForm
              headerChildren={"메달을 차지해보세요!"}
              descChildren={
                "오늘 메달을 차지하지 못해도 낙심하지마세요! \n매일 기회가 주어져요!"
              }
              align="left"
            />
            <SlideImg source={onboarding03} resizeMode="contain" />
          </SlideBox>
        </SlideContainer>
      </Swiper>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const SlideContainer = styled.View`
  flex: 1;
  justify-content: center;
  text-align: left;
`;

const SlideBox = styled.View`
  flex: 0.8;
  justify-content: space-around;
  padding: 0 30px;
`;

const SlideImg = styled.Image`
  opacity: 1;
  width: 100%;
  height: 332px;
  margin-top: 50px;
`;

export default HomeSwiper;
