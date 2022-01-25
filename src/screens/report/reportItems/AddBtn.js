import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Text, Image, Dimensions } from "react-native";
import styled from "styled-components";
import { coachColorVar } from "../../../../apollo";
import AddIcon from "../../../../assets/images/report/add_challenge.png";
import { d2p, h2p } from "../../../common/utils";

const AddBtn = () => {
  const navigation = useNavigation();
  return (
    <AddList onPress={() => navigation.navigate("ChallengeSetting")}>
      <Text style={{ color: coachColorVar().color.report, fontWeight: "600" }}>
        Today
      </Text>
      <AddIconStyle
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 2,
        }}
      >
        <Image
          style={{
            width: 40,
            height: 40,
            tintColor: coachColorVar().color.report,
          }}
          source={AddIcon}
          resizeMode="contain"
        />
      </AddIconStyle>
    </AddList>
  );
};

const AddList = styled.TouchableOpacity`
  flex: 1;
  max-width: ${(Dimensions.get("window").width - d2p(60)) / 3}px;
  height: ${d2p(110)}px;
  margin-right: ${d2p(8)}px;
  border-radius: 16px;
  align-items: center;
  justify-content: space-around;
  padding: 5px 0px;
`;

const AddIconStyle = styled.View`
  border-radius: 30px;
  padding: 10px;
  background-color: white;
`;

export default AddBtn;
