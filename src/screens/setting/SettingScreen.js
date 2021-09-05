import React from "react";
import styled from "styled-components";

import Others from "./Others";
import Profile from "./Profile";
import Setting from "./Setting";

const SettingScreen = ({ navigation }) => {
  return (
    <Container>
      <Profile navigation={navigation} />
      <Setting navigation={navigation} />
      <Others navigation={navigation} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export default SettingScreen;
