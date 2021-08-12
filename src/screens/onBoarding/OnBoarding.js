import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import LoginButton from "./LoginButton";
import HomeSwiper from "./Swiper";

const OnBoarding = ({ navigation }) => {
  return (
    <Container>
      <HomeSwiper />
      <LoginButton navigation={navigation} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${theme.grayScale.white};
  padding-top: 60px;
`;

export default OnBoarding;
