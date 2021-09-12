import React from "react"
import styled from "styled-components"
import { theme } from "../../styles/theme"
import KakaoLoginButton from "./KakaoLoginButton"
import HomeSwiper from "./Swiper"

const OnBoarding = ({ navigation }) => {
  return (
    <Container>
      <HomeSwiper />
      <KakaoLoginButton navigation={navigation} />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`

export default OnBoarding
