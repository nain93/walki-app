import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import RankingHeader from "./RankingHeader";
import RankingMain from "./RankingMain";

const Ranking = () => {
  return (
    <Container>
      <RankingHeader />
      <RankingMain />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default Ranking;
