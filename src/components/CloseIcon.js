import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Image } from "react-native";
import closeIcon from "../../assets/icons/close.png";

const CloseIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={closeIcon}
        resizeMode="contain"
        style={{ width: 24, height: 24, marginRight: 20 }}
      />
    </TouchableOpacity>
  );
};

export default CloseIcon;
