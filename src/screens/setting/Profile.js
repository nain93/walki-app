import React, { useState } from "react";
import styled from "styled-components";
import profileImg from "../../../assets/images/profile.png";
import { Body1Text, Body3Text, theme } from "../../styles/theme";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: "",
    profileImage: "",
  });
  const GET_MEMBER = gql`
    query getMember {
      getMember {
        name
        profileImage
      }
    }
  `;

  const onCompleted = (data) => {
    const { getMember } = data;
    setUserData({
      ...getMember,
    });
  };

  const { data, loading, error } = useQuery(GET_MEMBER, {
    onCompleted,
  });
  const { name, profileImage } = userData;

  return (
    <Container>
      <ProfileImg source={profileImg} resizeMode="contain" />

      <Name>이름</Name>
      <NameInputBox>
        <NameInput>
          <Body3Text>{name}</Body3Text>
        </NameInput>
        <NameChange
          onPress={() =>
            navigation.navigate("EditName", {
              name,
            })
          }
        >
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
