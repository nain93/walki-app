import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { Body1Text, H1Text, theme } from "../styles/theme";

const HeaderForm = ({ headerChildren, descChildren, align }) => {
  return (
    <View>
      <Header align={align}>{headerChildren}</Header>
      <Desc align={align}>{descChildren}</Desc>
    </View>
  );
};

const Header = styled(H1Text)`
  margin: 30px 0;
  text-align: ${(props) => props.align};
`;

const Desc = styled(Body1Text)`
  color: ${theme.TextColor};
  text-align: ${(props) => props.align};
`;

export default HeaderForm;
