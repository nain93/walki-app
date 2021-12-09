import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity,Platform } from "react-native";
import styled from "styled-components";
import { login } from "@react-native-seoul/kakao-login";
import appleAuth, {
  AppleButton,
} from "@invertase/react-native-apple-authentication";
import kakaoLogo from "../../../assets/icons/kakaotalkLogo.png";
import { Caption, H4Text, theme } from "../../styles/theme";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { logUserIn } from "../../../apollo";

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
  const onCompleted = (data) => {
    const {
      getAccessToken: { accessToken },
    } = data;
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
        navigation.reset({ routes: [{ name: "CoachSelect" }] });
      }
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        // login canceled
      } else {
        // login error
      }
    }

    // const token = await appleLogin().appleAuthRequestResponse.identityToken

    // appleLogin()
    // appleAuthRequestResponse.identityToken

    // appleAuth.performRequest({
    //   requestedOperation: AppleAuthRequestOperation.LOGIN,
    //   requestedScopes: [AppleAuthRequestScope.EMAIL],
    // });
    //   const { accessToken } = token;
    //   await signUpMutation({
    //     variables: {
    //       social: "APPLE",
    //       token: accessToken,
    //     },
    //   });
    //   signInQuery({
    //     variables: {
    //       social: "APPLE",
    //       token: accessToken,
    //     },
    //   });
    //   navigation.reset({ routes: [{ name: "CoachSelect" }] });
    // }
    // const onAppleButtonPress = async () => {
    //   try {
    //     const responseObject = await appleAuth.performRequest({
    //       requestedOperation: AppleAuthRequestOperation.LOGIN,
    //       requestedScopes: [AppleAuthRequestScope.EMAIL],
    //     });
    //     console.log('responseObject:::', responseObject);
    //     const credentialState = await appleAuth.getCredentialStateForUser(
    //       responseObject.user,
    //     );
    //     if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
    //       console.log('user is authenticated');
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     if (error.code === AppleAuthError.CANCELED) {
    //       console.log('canceled');
    //     } else {
    //       console.log('error');
    //     }
    //   }
    // };

    //   const appleLogin = async() => {
    //     try {
    //         // performs login request
    //          const appleAuthRequestResponse = await appleAuth.performRequest({
    //            requestedOperation: appleAuth.Operation.LOGIN,
    //            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    //          });
    //          // get current authentication state for user
    //          const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
    //          // use credentialState response to ensure the user is authenticated
    //          if (credentialState === appleAuth.State.AUTHORIZED) {
    //            // user is authenticated
    //                 console.log(appleAuthRequestResponse);
    //          }
    //        } catch (error) {
    //            if (error.code === appleAuth.Error.CANCELED) {
    //                // login canceled
    //            } else {
    //                // login error
    //            }
    //     }
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
        }}
        onPress={onAppleButtonPress}
      /> : <></>}

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
