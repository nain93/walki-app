import React from "react"
import styled from "styled-components"
import headerLogo from "../../assets/images/logo.png"
import Icon from "react-native-vector-icons/Ionicons"

const SettingIcon = styled(Icon)`
  width: 60%;
  padding-left: 200px;
`

const ImageStyle = styled.Image`
  width: 100px;
  height: 50px;
  padding-left: 50px;
`

const View = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

function LogoTitle() {
  return (
    <View>
      <ImageStyle source={headerLogo} resizeMode={"contain"}></ImageStyle>

      <SettingIcon>
        <Icon name="settings" color="#4F4F4F" />
      </SettingIcon>
    </View>
  )
}

export default LogoTitle
