import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import CoachSwiper from "./Swiper";

const CoachSelect = ({ navigation }) => {
  return (
    <Container>
      <CoachSwiper navigation={navigation} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${theme.grayScale.white};
  padding-top: 60px;
`;

export default CoachSelect;
