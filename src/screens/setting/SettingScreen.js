import React from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Others from "./Others";
import Profile from "./Profile";
import Setting from "./Setting";

const SettingScreen = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback>
      <KeyboardAwareScrollView>
        <Container>
          <Profile navigation={navigation} />
          <Setting navigation={navigation} />
          <Others />
        </Container>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export default SettingScreen;
