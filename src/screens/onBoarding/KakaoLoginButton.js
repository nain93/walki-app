import React from "react";
import {
  Image,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from "@react-native-seoul/kakao-login";
import kakaoLogo from "../../../assets/icons/kakaotalkLogo.png";
import { Caption, H4Text, theme } from "../../styles/theme";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { logUserIn } from "../../../apollo";

const KakaoLoginButton = ({ navigation }) => {
  const SIGN_UP_MUTATION = gql`
    mutation signUp($social: Social!, $token: String!) {
      signUp(social: $social, token: $token)
    }
  `;

  const SIGN_IN_QUERY = gql`
    query signIn($social: Social!, $token: String!) {
      signIn(social: $social, token: $token) {
        accessToken
      }
    }
  `;
  const onCompleted = (data) => {
    const {
      signIn: { accessToken },
    } = data;
    if (accessToken) {
      logUserIn(accessToken);
    }
  };

  const [signInQuery, { loading }] = useLazyQuery(SIGN_IN_QUERY, {
    onCompleted,
  });

  const [signUpMutation, data] = useMutation(SIGN_UP_MUTATION, {
    onError: (error) => {
      if (error.message.includes("이미 가입된 유저")) {
        // * 가입된 유저가 로그인화면 접근했을때 에러 처리 로직
      }
    },
  });

  // refreshToken?
  const handleKakaoLogin = async () => {
    const token = await login();
    const { accessToken } = token;
    signUpMutation({
      variables: {
        social: "KAKAO",
        token: accessToken,
      },
    });
    signInQuery({
      variables: {
        social: "KAKAO",
        token: accessToken,
      },
    });
    navigation.reset({ routes: [{ name: "CoachSelect" }] });
  };

  return (
    <Container>
      <KakaoButton onPress={handleKakaoLogin}>
        {loading ? (
          <ActivityIndicator color="black" />
        ) : (
          <>
            <Image source={kakaoLogo} />
            <KakaoText>카카오로 시작하기</KakaoText>
          </>
        )}
      </KakaoButton>

      <DescWrap>
        <KakaoDesc>walki의 </KakaoDesc>
        <TouchableOpacity onPress={() => navigation.navigate("Service")}>
          <DescBtnText>이용약관</DescBtnText>
        </TouchableOpacity>
        <KakaoDesc> 과 </KakaoDesc>
        <TouchableOpacity onPress={() => navigation.navigate("Info")}>
          <DescBtnText>개인정보처리방침</DescBtnText>
        </TouchableOpacity>
        <KakaoDesc>을 읽고 이해했으며 </KakaoDesc>
      </DescWrap>
      <KakaoDesc>그에 동의합니다. </KakaoDesc>
    </Container>
  );
};

const Container = styled.View`
  align-items: center;
  padding: 30px;
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

const KakaoText = styled(H4Text)`
  margin-left: 5px;
`;

const DescWrap = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const KakaoDesc = styled(Caption)`
  color: ${theme.grayScale.gray4};
  text-align: center;
`;

const DescBtnText = styled(Caption)`
  color: ${theme.grayScale.gray4};
  text-align: center;
  text-decoration: underline;
  text-decoration-color: ${theme.grayScale.gray4};
`;

export default KakaoLoginButton;
