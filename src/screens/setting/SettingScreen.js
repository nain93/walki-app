import React from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Others from "./Others";
import Profile from "./Profile";
import Setting from "./Setting";
import { theme } from "../../styles/theme";

const SettingScreen = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <Container>
          <Profile navigation={navigation} />
          <Setting navigation={navigation} />
          <Line />
          <Others navigation={navigation} />
        </Container>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: space-around;
`;

const Line = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${theme.grayScale.gray7};
`;

export default SettingScreen;
