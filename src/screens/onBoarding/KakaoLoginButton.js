import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity, Platform } from "react-native";
import styled from "styled-components";
import { login } from "@react-native-seoul/kakao-login";
import appleAuth, {
  AppleButton,
} from "@invertase/react-native-apple-authentication";
import kakaoLogo from "../../../assets/icons/kakaotalkLogo.png";
import { Caption, H4Text, theme } from "../../styles/theme";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { logUserIn } from "../../../apollo";
import { d2p, h2p } from "../../common/utils";
import { getBottomSpace } from "react-native-iphone-x-helper";

const KakaoLoginButton = ({ navigation }) => {
  const GET_ACCESS_TOKEN_QUERY = gql`
    query getAccessToken($social: Social!, $token: String!) {
      getAccessToken(social: $social, token: $token) {
        isNew
        accessToken
      }
    }
  `;

  const [isLoading, setIsLoading] = useState(false);

  const onCompleted = (tokenData) => {
    const {
      getAccessToken: { accessToken },
    } = tokenData;
    if (accessToken) {
      logUserIn(accessToken);
    }
    setIsLoading(false);
  };

  const [getAccessToken] = useLazyQuery(GET_ACCESS_TOKEN_QUERY, {
    onCompleted
  });


  // refreshToken?
  const handleKakaoLogin = async () => {
    setIsLoading(true);
    const token = await login();
    const { accessToken } = token;
    getAccessToken({
      variables: {
        social: "KAKAO",
        token: accessToken,
      },
    });
  };

  const onAppleButtonPress = async () => {
    setIsLoading(true);

    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      // get current authentication state for user
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      );
      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
        console.log("test1", appleAuthRequestResponse);
        const token = appleAuthRequestResponse.authorizationCode;

        getAccessToken({
          variables: {
            social: "APPLE",
            token: token,
          },
        });
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <Container>
      <KakaoButton onPress={handleKakaoLogin}>
        {isLoading ? (
          <ActivityIndicator color="black" />
        ) : (
          <>
            <Image source={kakaoLogo} />
            <KakaoText>카카오로 시작하기</KakaoText>
          </>
        )}
      </KakaoButton>
      {Platform.OS === "ios" ? <AppleButton
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: 160, // You must specify a width
          height: 45, // You must specify a height
          justifyContent: "center"
        }}
        onPress={onAppleButtonPress}
      /> : <></>}

      <DescWrap style={{ marginTop: h2p(10) }}>
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
  padding:0 38px;
  padding-bottom: ${Platform.OS === "android" ? `${h2p(34)}px` : getBottomSpace()};
`;

const KakaoButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffe812;
  border-radius: 8px;
  width: 100%;
  height: ${d2p(54)}px;
`;

const KakaoText = styled(H4Text)`
  margin-left: 5px;
`;

const DescWrap = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
