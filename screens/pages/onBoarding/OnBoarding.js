import React from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components";
import { HeaderText } from "../../../styles/theme";
import onboarding01 from "../../../assets/images/img01.png";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  text-align: left;
  background-color: white;
`;

const Header = styled(HeaderText)``;

const ImgStyle = styled.Image`
  width: 100%;
  margin-top: 50px;
  margin-bottom: 25px;
`;

const OnBoarding = () => {
  return (
    <Container>
      <Header>코치와 함께 러닝해보세요!</Header>
      <Text style={{ marginLeft: 10 }}>
        토키와 부키가 당신의 데일리 러닝을 도와줘요!
      </Text>
      <ImgStyle source={onboarding01} resizeMode="stretch" />
    </Container>
  );
};

export default OnBoarding;
