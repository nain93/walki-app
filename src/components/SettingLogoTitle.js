import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import setting from "../../assets/icons/setting.png";
import { useNavigation } from "@react-navigation/native";

const SettingLogoTitle = () => {
  const navigation = useNavigation();
  const handleGoSetting = () => {
    navigation.navigate("SettingScreen");
  };

  return (
    <TouchableOpacity onPress={handleGoSetting}>
      <SettingLogo source={setting} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const SettingLogo = styled.Image`
  width: 30px;
  height: 28px;
  margin-right: 20px;
`;

export default SettingLogoTitle;
