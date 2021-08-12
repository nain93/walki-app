import React from "react"
import styled from "styled-components"
import headerLogo from "../../assets/images/logo.png"
import Icon from "react-native-vector-icons/Ionicons"

const SettingIcon = styled(Icon)`
  width: 100%;
  padding: 15px 180px;
  margin-right: auto;
`

const ImageStyle = styled.Image`
  width: 100px;
  height: 50px;
`

const View = styled.View`
  width: 380px;
  height: 60px;
  flex-direction: row;
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
