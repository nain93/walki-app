import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { coachColorVar, userNameVar } from "../../../apollo";
import Item from "./reportItems/Item";
import ClickedItem from "./reportItems/ClickedItem";
import AddItem from "./reportItems/AddItem";
import { useQuery, gql, useReactiveVar } from "@apollo/client";
import info from "../../../assets/icons/info.png";

const ReportMain = ({ stepInfo }) => {
  const GET_MEMBER = gql`
    query getMember {
      getMember {
        name
        profileImage
      }
    }
  `;
  const onCompleted = (data) => {
    const { getMember } = data;
    userNameVar({
      ...getMember,
    });
  };

  const {} = useQuery(GET_MEMBER, {
    onCompleted,
    onError: (e) => {
      console.log(e);
    },
  });

  const userName = useReactiveVar(userNameVar);
  const [selectedId, setSelectedId] = useState([]);

  const handleItemClick = (index) => {
    const data = [...stepInfo];
    data[index].selected = !data[index].selected;
    setSelectedId(data);
  };

  const renderItem = ({ item, index }) => {
    if (index === 0) {
      return <AddItem step={item.step} stepGoal={item.stepGoal} />;
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
        <TouchableOpacity>
          <Image
            source={info}
            style={{ width: 20, marginLeft: 5 }}
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
