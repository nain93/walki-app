import React from "react";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import Swiper from "./Swiper";

const OnBoarding = ({ navigation }) => {
  return (
    <Container>
      <Swiper />
      <LoginButton navigation={navigation} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
  justify-content: space-between;
`;

export default OnBoarding;
