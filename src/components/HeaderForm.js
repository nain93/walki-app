import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { d2p } from "../common/utils";
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
  text-align: ${(props) => props.align};
  margin-bottom: ${d2p(12)}px;
`;

const Desc = styled(Body1Text)`
  color: ${theme.TextColor};
  text-align: ${(props) => props.align};
  /* margin-bottom: 20px; */
  margin-left: ${d2p(3)}px;
`;

export default HeaderForm;
