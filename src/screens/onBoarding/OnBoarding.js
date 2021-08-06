import React from "react";
import styled from "styled-components";
import Swiper from "../home/Swiper";

const OnBoarding = () => {
  return (
    <Container>
      <Swiper />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default OnBoarding;
