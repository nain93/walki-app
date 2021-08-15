import React from "react";
import styled from "styled-components";
import CoachSwiper from "./CoachSwiper";

const CoachSelect = ({ navigation }) => {
  return (
    <Container>
      <CoachSwiper navigation={navigation} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default CoachSelect;
