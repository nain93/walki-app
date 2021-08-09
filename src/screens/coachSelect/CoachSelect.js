import React from "react";
import styled from "styled-components";
import CoachSwiper from "./Swiper";

const CoachSelect = () => {
  return (
    <Container>
      <CoachSwiper />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 20px 30px;
`;

export default CoachSelect;
