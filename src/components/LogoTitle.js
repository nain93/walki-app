import React from "react";
import styled from "styled-components";
import headerLogo from "../../assets/images/logo.png";

const ImageStyle = styled.Image`
  width: 100px;
  height: 50px;
`;

function LogoTitle() {
  return <ImageStyle source={headerLogo} resizeMode={"contain"} />;
}

export default LogoTitle;
