import React, { useState } from "react";
import styled from "styled-components";
import upload from "../../../../assets/icons/upload.png";
import { Body1Text, theme } from "../../../styles/theme";
import DeleteUser from "./DeleteUser";
import LogOut from "./LogOut";
import Share from "react-native-share";

const Others = ({ navigation }) => {
  const [logOutModalOpen, setLogOutModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleShare = () => {
    Share.open({
      message: "message",
      // todo: 앱 출시후 url입력
      // * https://react-native-share.github.io/react-native-share/docs/share-open
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  const handleLogOutModal = () => {
    setLogOutModalOpen(!logOutModalOpen);
  };
  const handleDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  return (
    <Container>
      <SettingBox onPress={handleShare}>
        <SettingImg
          source={upload}
          resizeMode="contain"
          style={{ tintColor: theme.grayScale.gray4 }}
        />
        <SettingText>이 앱 공유하기</SettingText>
      </SettingBox>
      <SettingBox onPress={handleLogOutModal}>
        <SettingText>로그아웃</SettingText>
      </SettingBox>
      <LogOut
        navigation={navigation}
        handleLogOutModal={handleLogOutModal}
        logOutModalOpen={logOutModalOpen}
      />
      <SettingBox style={{ borderBottomWidth: 0 }} onPress={handleDeleteModal}>
        <SettingText>탈퇴하기</SettingText>
      </SettingBox>
      <DeleteUser
        navigation={navigation}
        handleDeleteModal={handleDeleteModal}
        deleteModalOpen={deleteModalOpen}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 0.4;
  justify-content: space-around;
  padding: 0 30px;
  border-bottom-color: ${theme.grayScale.gray7};
`;

const SettingBox = styled.TouchableOpacity`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.grayScale.gray7};
  align-items: center;
  padding: 20px 10px;
`;

const SettingText = styled(Body1Text)``;

const SettingImg = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

export default Others;
