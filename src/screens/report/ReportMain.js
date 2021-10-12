import React, { useState, useRef } from "react";
import { FlatList, Image, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { coachColorVar, monthVar, userNameVar } from "../../../apollo";
import Item from "./reportItems/Item";
import ClickedItem from "./reportItems/ClickedItem";
import AddItem from "./reportItems/AddItem";
import { useReactiveVar } from "@apollo/client";
import info from "../../../assets/icons/info.png";
import Toast from "react-native-easy-toast";
import AddBtn from "./reportItems/AddBtn";
import { getToday, month } from "../../common/getToday";

const ReportMain = ({ stepInfo }) => {
  const userName = useReactiveVar(userNameVar);
  const [selectedId, setSelectedId] = useState([]);

  const toastRef = useRef();

  const handleItemClick = (index) => {
    const data = [...stepInfo];
    data[index].selected = !data[index].selected;
    setSelectedId(data);
  };

  const renderItem = ({ item, index }) => {
    if (index === 0) {
      if (item.challengeDate === undefined) {
        return <AddBtn />;
      }
      if (item.challengeDate === getToday()) {
        return <AddItem stepGoal={item.stepGoal} />;
      }
    }

    if (item.selected) {
      return (
        <ClickedItem
          opacity={item.day === undefined}
          day={item.day}
          step={item.step}
          stepGoal={item.stepGoal}
          onPress={() => handleItemClick(index)}
        />
      );
    }
    return (
      <Item
        opacity={item.day === undefined}
        day={item.day}
        step={item.step}
        stepGoal={item.stepGoal}
        onPress={() => handleItemClick(index)}
      />
    );
  };

  return (
    <Container>
      <NameTitle>
        <Text style={{ color: coachColorVar().color.sub }}>
          {userName.name}
        </Text>
        <Text> 님의 데일리 챌린지 히스토리</Text>
        <TouchableOpacity
          onPress={() =>
            toastRef.current.show(
              "첼린지 히스토리는 오전 12시마다 업데이트됩니다.",
              2000
            )
          }
        >
          <Image
            source={info}
            style={{ width: 18, marginLeft: 5 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </NameTitle>

      <FlatList
        data={stepInfo}
        renderItem={renderItem}
        keyExtractor={(item) => item.createdAt}
        extraData={selectedId}
        numColumns={3}
      />
      <Toast
        ref={toastRef}
        style={{
          width: 350,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
        position="top"
        positionValue={60}
        fadeInDuration={300}
        fadeOutDuration={300}
        opacity={0.8}
        textStyle={{ color: "white" }}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 0 30px;
  padding-top: 30px;
`;

const NameTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default ReportMain;
