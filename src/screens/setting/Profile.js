import React from "react";
import styled from "styled-components";
import profileImg from "../../../assets/images/profile.png";
import { Body1Text, Body3Text, theme } from "../../styles/theme";

const Profile = ({ navigation }) => {
  const handleGoToEditName = () => navigation.navigate("EditName");

  return (
    <Container>
      <ProfileImg source={profileImg} resizeMode="contain" />

      <Name>이름</Name>
      <NameInputBox>
        <NameInput>
          <Body3Text>구남규</Body3Text>
        </NameInput>
        <NameChange onPress={handleGoToEditName}>
          <ChangeText>변경</ChangeText>
        </NameChange>
      </NameInputBox>
    </Container>
  );
};

const Container = styled.View`
  padding: 0 40px;
  align-items: center;
`;

const ProfileImg = styled.Image`
  width: 100px;
  height: 100px;
  margin: 10px 0;
`;

const NameInputBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Name = styled(Body3Text)`
  color: ${theme.TextColor};
  text-align: left;
  width: 100%;
`;

const NameInput = styled.View`
  width: 100%;
  height: 48px;
  justify-content: center;
  background-color: ${theme.grayScale.gray7};
  border-radius: 8px;
  margin: 5px 0;
  border: 1px solid ${theme.grayScale.gray5};
  padding: 0 10px;
`;

const NameChange = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
`;

const ChangeText = styled(Body1Text)`
  color: ${theme.toki.color.main};
`;

export default Profile;
