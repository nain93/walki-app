import React, { useState } from "react";
import styled from "styled-components";
import noProfileTokiImg from "../../../assets/images/noprofile_toki.png";
import noProfileBookiImg from "../../../assets/images/noprofile_booki.png";
import { Body1Text, Body3Text, theme } from "../../styles/theme";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { coachColorVar, userNameVar } from "../../../apollo";

const Profile = ({ navigation }) => {
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
    userNameVar({
      ...getMember,
    });
  };
  const userName = useReactiveVar(userNameVar);

  const { data, loading, error } = useQuery(GET_MEMBER, {
    onCompleted,
  });
  const { name, profileImage } = userName;
  const coachColor = useReactiveVar(coachColorVar);

  return (
    <Container>
      <ProfileImg
        source={
          profileImage
            ? { uri: profileImage }
            : coachColorVar().coach === "toki"
            ? noProfileTokiImg
            : noProfileBookiImg
        }
        resizeMode="cover"
      />
      <Name>이름</Name>
      <NameInputBox>
        <NameInput>
          <Body3Text>{name ? name : "이름을 설정해 주세요"}</Body3Text>
        </NameInput>
        <NameChange
          onPress={() =>
            navigation.navigate("EditName", {
              name,
              profileImage,
            })
          }
        >
          <ChangeText coachColor={coachColor}>변경</ChangeText>
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
  border-radius: 50px;
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
  color: ${(props) => props.coachColor.color.main};
`;

export default Profile;
