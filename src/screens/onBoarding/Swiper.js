import React from "react";
import styled from "styled-components";
import Swiper from "react-native-web-swiper";
import onboarding01 from "../../../assets/images/img01.png";
import onboarding02 from "../../../assets/images/img02.png";
import onboarding03 from "../../../assets/images/img03.png";
import { HeaderText, theme } from "../../styles/theme";
import { View } from "react-native";

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
            <View>
              <Header>코치와 함께 {"\n"}러닝해보세요!</Header>
              <Desc>토키와 부키가 당신의 데일리 러닝을 {"\n"}도와줘요!</Desc>
            </View>
            <SlideImg source={onboarding01} resizeMode="contain" />
          </SlideBox>
        </SlideContainer>
        <SlideContainer>
          <SlideBox>
            <View>
              <Header>챌린지를 생성하고 {"\n"}달성해보세요!</Header>
              <Desc>
                매일 챌린지를 달성하다보면 {"\n"}어느새 러닝이 습관으로 자리잡아
                있을거예요!
              </Desc>
            </View>
            <SlideImg source={onboarding02} resizeMode="contain" />
          </SlideBox>
        </SlideContainer>
        <SlideContainer>
          <SlideBox>
            <View>
              <Header>메달을 차지해보세요!</Header>
              <Desc>
                오늘 메달을 차지하지 못해도 낙심하지마세요! {"\n"}매일 기회가
                주어져요!
              </Desc>
            </View>
            <SlideImg source={onboarding03} resizeMode="contain" />
          </SlideBox>
        </SlideContainer>
      </Swiper>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  margin-top: 80px;
`;

const Header = styled(HeaderText)`
  margin: 20px 30px;
`;

const Desc = styled.Text`
  margin: 0 30px;
  font-size: 16px;
  color: ${theme.TextColor};
`;

const SlideContainer = styled.View`
  flex: 1;
  justify-content: center;
  text-align: left;
`;

const SlideBox = styled.View`
  flex: 0.8;
  justify-content: space-around;
`;

const SlideImg = styled.Image`
  opacity: 1;
  width: 100%;
  height: 332px;
  margin-top: 50px;
`;

export default HomeSwiper;
