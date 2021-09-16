import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, Text } from "react-native";
import styled from "styled-components";
import { coachColorVar } from "../../../../apollo";
import AddIcon from "../../../../assets/images/report/add_challenge.png";

const AddItem = () => {
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
  height: 110px;
  margin: 5px;
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

export default AddItem;
