import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import ReportHeader from "./ReportHeader";
import ReportMain from "./ReportMain";

const Report = () => {
  return (
    <Container>
      <ReportHeader />
      <ReportMain />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default Report;
