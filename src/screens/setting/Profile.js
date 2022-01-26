import React, { useCallback } from "react";
import styled from "styled-components";
import noProfileTokiImg from "../../../assets/images/noprofile_toki.png";
import noProfileBookiImg from "../../../assets/images/noprofile_booki.png";
import { Body1Text, Body3Text, theme } from "../../styles/theme";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { coachColorVar, userNameVar } from "../../../apollo";
import Loading from "../../components/Loading";
import { useFocusEffect } from "@react-navigation/native";
import { d2p, h2p } from "../../common/utils";
import { View } from "react-native";

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

  const { data, loading, error, refetch } = useQuery(GET_MEMBER, {
    onCompleted,
    onError: (e) => {
      console.log(e);
    },
  });
  const { name, profileImage } = userName;

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [userName])
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <View style={{ height: h2p(122) }}></View>
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
          <ChangeText coachColor={coachColorVar().color.main}>변경</ChangeText>
        </NameChange>
      </NameInputBox>
    </Container>
  );
};

const Container = styled.View`
  padding: 0 ${d2p(38)}px;
  align-items: center;
  margin-bottom: ${h2p(27)}px;
`;

const ProfileImg = styled.Image`
  position: absolute;
  width: ${d2p(100)}px;
  height: ${d2p(100)}px;
  border-radius: 100px;
`;

const NameInputBox = styled.View`
  flex-direction: row;
  margin-top: ${h2p(4)}px;
`;

const Name = styled(Body3Text)`
  color: ${theme.TextColor};
  text-align: left;
  width: 100%;
`;

const NameInput = styled.View`
  width: 100%;
  /* height: ${d2p(48)}px; */
  justify-content: center;
  background-color: ${theme.grayScale.gray7};
  border-radius: 8px;
  
  border: 1px solid ${theme.grayScale.gray5};
  padding: ${h2p(12)}px ${d2p(15)}px;
`;

const NameChange = styled.TouchableOpacity`
  position: absolute;
  right: ${d2p(10)}px;
  top:${h2p(12)}px;
`;

const ChangeText = styled(Body1Text)`
  color: ${(props) => props.coachColor};
`;

export default Profile;
