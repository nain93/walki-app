import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";
import { coachColorVar } from "../../../../apollo";
import { theme } from "../../../styles/theme";

const ReportLoading = () => {
  return (
    <Container>
      <Header coachColor={coachColorVar().color.report}></Header>
      <Main>
        <ActivityIndicator color={coachColorVar().color.main} size="large" />
      </Main>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  flex: 0.8;
  padding: 0 30px;
  justify-content: space-around;
  background-color: ${(props) => props.coachColor};
`;

const Main = styled.View`
  flex: 1;
  padding: 0 30px;
  padding-top: 30px;
  justify-content: center;
  align-items: center;
  background-color: ${theme.grayScale.white};
`;

export default ReportLoading;
