import React from "react";
import styled from "styled-components";
import Swiper from "react-native-web-swiper";
import { HeaderText, theme } from "../../styles/theme";
import TokiBooki from "./TokiBooki";

const CoachSwiper = () => {
  return (
    <Container>
      <Swiper
        controlsProps={{
          dotsPos: "top-right",
          nextPos: "top-left",
          prevPos: false,
          nextTitleStyle: { display: "none" },
          prevTitleStyle: { display: "none" },
          dotActiveStyle: {
            backgroundColor: theme.toki.color.main,
          },
        }}
      >
        <SlideContainer>
          <Header>나의 걷기를 도와줄 {"\n"}코치를 선택해주세요!</Header>
          <Desc>
            나의 걷기 패턴에 맞는 코치를 선택하고 {"\n"}서비스를 이용해보세요
          </Desc>
          <TokiBooki />
        </SlideContainer>
        <SlideContainer>
          <Header>오늘의 챌린지 세우기</Header>
          <Desc>
            우리 오늘은 얼마나 걸어볼까요? {"\n"}200걸음 이상 설정해보세요!
          </Desc>
        </SlideContainer>
        <SlideContainer>
          <Header>알림 시간 설정</Header>
          <Desc>
            당신을 응원하기 위해 토키가 매일 {"\n"}알림을 보내드려요! 시간은
            나중에 변경할 수 있어요.
          </Desc>
        </SlideContainer>
      </Swiper>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
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
  text-align: left;
  justify-content: center;
`;

export default CoachSwiper;
