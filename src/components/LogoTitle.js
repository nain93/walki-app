import React from "react";
import styled from "styled-components";
import headerLogo from "../../assets/images/logo.png";

function LogoTitle() {
  return <ImageStyle source={headerLogo} resizeMode="contain" />;
}

const ImageStyle = styled.Image`
  width: 100px;
  height: 50px;
  margin-left: 30px;
`;

export default LogoTitle;
