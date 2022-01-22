import React from "react";
import styled from "styled-components";
import Swiper from "react-native-web-swiper";
import onboarding01 from "../../../assets/images/img01.png";
import onboarding02 from "../../../assets/images/img02.png";
import onboarding03 from "../../../assets/images/img03.png";
import { theme } from "../../styles/theme";
import HeaderForm from "../../components/HeaderForm";
import { d2p, h2p } from "../../common/utils";
import { SafeAreaView, Image, View } from "react-native";

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
          dotsWrapperStyle: {
            marginTop: h2p(30),
          },
          dotActiveStyle: {
            backgroundColor: theme.toki.color.main,
          },
        }}
      >
        <View style={{ textAlign: "left", paddingHorizontal: h2p(38), marginTop: h2p(74) }}>
          <HeaderForm
            headerChildren={"코치와 함께 \n러닝해보세요!"}
            descChildren={"토키와 부키가 당신의 데일리 러닝을 \n도와줘요!"}
            align="left"
          />
          <View style={{ alignItems: "center", marginTop: h2p(36), marginBottom: h2p(48) }}>
            <Image source={onboarding01} style={{ width: h2p(330), height: h2p(332) }} />
          </View>
        </View>
        <View style={{ textAlign: "left", paddingHorizontal: h2p(38), marginTop: h2p(74) }}>
          <HeaderForm
            headerChildren={"챌린지를 생성하고 \n달성해보세요!"}
            descChildren={
              "매일 챌린지를 달성하다보면 \n어느새 러닝이 습관으로 자리잡아 있을거예요!"
            }
            align="left"
          />
          <View style={{ alignItems: "center", marginTop: h2p(36), marginBottom: h2p(48) }}>
            <Image source={onboarding02} style={{ width: h2p(330), height: h2p(332) }} />
          </View>
        </View>
        <View style={{ textAlign: "left", paddingHorizontal: h2p(38), marginTop: h2p(74) }}>
          <HeaderForm
            headerChildren={"메달을 \n차지해보세요!"}
            descChildren={
              "오늘 메달을 차지하지 못해도 낙심하지마세요! \n매일 기회가 주어져요!"
            }
            align="left"
          />
          <View style={{ alignItems: "center", marginTop: h2p(36), marginBottom: h2p(48) }}>
            <Image source={onboarding03} style={{ width: h2p(330), height: h2p(332) }} />
          </View>
        </View>
      </Swiper>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex:1;
`;





export default HomeSwiper;
