import React, { useState } from "react";
import styled from "styled-components";
import upload from "../../../../assets/icons/upload.png";
import { Body1Text, theme } from "../../../styles/theme";
import DeleteUser from "./DeleteUser";
import LogOut from "./LogOut";
import Share from "react-native-share";
import { d2p, h2p } from "../../../common/utils";

const Others = () => {
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
        <Body1Text>이 앱 공유하기</Body1Text>
      </SettingBox>
      <SettingBox onPress={handleLogOutModal}>
        <Body1Text>로그아웃</Body1Text>
      </SettingBox>
      <LogOut
        handleLogOutModal={handleLogOutModal}
        logOutModalOpen={logOutModalOpen}
      />
      <SettingBox style={{ borderBottomWidth: 0 }} onPress={handleDeleteModal}>
        <Body1Text>탈퇴하기</Body1Text>
      </SettingBox>
      <DeleteUser
        handleDeleteModal={handleDeleteModal}
        deleteModalOpen={deleteModalOpen}
      />
    </Container>
  );
};

const Container = styled.View`
  min-height: ${h2p(180)}px;
  padding: 0 ${d2p(30)}px;
  margin-top: ${h2p(16)}px;
  border-bottom-color: ${theme.grayScale.gray7};
`;

const SettingBox = styled.TouchableOpacity`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.grayScale.gray7};
  padding: ${h2p(18)}px 0;
`;

const SettingImg = styled.Image`
  width: ${d2p(24)}px;
  height: ${d2p(24)}px;
  margin-right: ${d2p(12)}px;
`;

export default Others;
