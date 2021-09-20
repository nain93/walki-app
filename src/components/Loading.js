import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";
import { coachColorVar } from "../../apollo";

const Loading = ({ children }) => {
  return (
    <Container>
      {children}
      {!children && (
        <ActivityIndicator color={coachColorVar().color.main} size="large" />
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #f3f3f3;
  justify-content: center;
`;

export default Loading;
