import React, { useRef } from "react";
import styled from "styled-components";
import Swiper from "react-native-web-swiper";
import { Body1Text, H1Text, theme } from "../../styles/theme";
import { TouchableOpacity, View } from "react-native";
import LeftArrow from "react-native-vector-icons/AntDesign";
import TokiBookiSelect from "./TokiBookiSelect";
import ChallengeSetting from "./ChallengeSetting";
import HeaderForm from "../../components/HeaderForm";

const CoachSwiper = ({ navigation }) => {
  const swiperRef = useRef(null);

  return (
    <Container>
      <Swiper
        ref={swiperRef}
        gesturesEnabled={() => false}
        controlsProps={{
          dotsPos: "top-right",
          nextPos: false,
          prevPos: "top-left",
          // firstPrevElement: () => {
          //   return (
          //     <TouchableOpacity onPress={() => navigation.goBack()}>
          //       <LeftArrow
          //         name="left"
          //         size={30}
          //         color={theme.grayScale.black}
          //       />
          //     </TouchableOpacity>
          //   );
          // },
          PrevComponent: () => {
            return (
              <TouchableOpacity onPress={() => swiperRef?.current.goToPrev()}>
                <LeftArrow
                  name="left"
                  size={30}
                  color={theme.grayScale.black}
                />
              </TouchableOpacity>
            );
          },

          dotActiveStyle: {
            backgroundColor: theme.toki.color.main,
          },
        }}
      >
        <SlideContainer>
          <HeaderForm
            headerChildren={"나의 걷기를 도와줄 \n코치를 선택해주세요!"}
            descChildren={
              "나의 걷기 패턴에 맞는 코치를 선택하고 \n서비스를 이용해보세요"
            }
            align="left"
          />
          <TokiBookiSelect swiperRef={swiperRef} navigation={navigation} />
        </SlideContainer>

        <SlideContainer>
          <View>
            <Header>오늘의 챌린지 세우기</Header>
            <Desc>
              우리 오늘은 얼마나 걸어볼까요? {"\n"}200걸음 이상 설정해보세요!
            </Desc>
          </View>
          <ChallengeSetting swiperRef={swiperRef} />
        </SlideContainer>

        <SlideContainer>
          <View>
            <Header>알림 시간 설정</Header>
            <Desc>
              당신을 응원하기 위해 토키가 매일 {"\n"}알림을 보내드려요! 시간은
              나중에 변경할 수 있어요.
            </Desc>
          </View>
        </SlideContainer>
      </Swiper>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Header = styled(H1Text)`
  margin: 20px 0;
`;

const Desc = styled(Body1Text)`
  color: ${theme.TextColor};
`;

const SlideContainer = styled.View`
  flex: 1;
  text-align: left;
  margin: 0 30px;
  padding: 40px 0;
  justify-content: space-between;
`;

export default CoachSwiper;
