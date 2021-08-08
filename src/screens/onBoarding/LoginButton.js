import React, { useState } from "react";
import { Image } from "react-native";
import styled from "styled-components";
import kakaoLogo from "../../../assets/icons/kakaotalkLogo.png";
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from "@react-native-seoul/kakao-login";

const LoginButton = ({ navigation }) => {
  const [result, setResult] = useState("");

  const handleKakaoLogin = async () => {
    // const token = await login();

    // setResult(JSON.stringify(token.accessToken));
    // refreshToken;

    navigation.navigate("CoachSelect");
  };

  return (
    <Container>
      <KakaoButton onPress={handleKakaoLogin}>
        <Image source={kakaoLogo} />
        <KakaoText>카카오로 시작하기</KakaoText>
      </KakaoButton>
      <KakaoDesc>
        walki의 이용약관 과 개인정보처리방침을 읽고 이해했으며 {"\n"}그에
        동의합니다.
      </KakaoDesc>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  align-items: center;
  padding: 15px 30px;
`;

const KakaoButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffe812;
  border-radius: 8px;
  width: 100%;
  height: 54px;
`;

const KakaoText = styled.Text`
  margin-left: 5px;
  font-size: 16px;
  font-weight: 700;
`;

const KakaoDesc = styled.Text`
  color: #bdbdbd;
  font-size: 10px;
  text-align: center;
  margin: 10px 0;
`;

export default LoginButton;
