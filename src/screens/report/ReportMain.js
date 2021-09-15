import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { coachColorVar } from "../../../apollo";
import info from "../../../assets/icons/info.png";
import { H4Text, theme } from "../../styles/theme";
import tokiGood from "../../../assets/images/report/toki_good_head.png";
import tokiFail from "../../../assets/images/report/toki_fail_head.png";
import bukiGood from "../../../assets/images/report/buki_good_head.png";
import bukiFail from "../../../assets/images/report/buki_fail_head.png";

const DATA = [
  {
    id: "bd7acbea-zzzzzz",
    day: "Day 12",
    challengeDate: "2021-04-04",
    step: 10000,
    stepGoal: 2000000,
  },
  {
    id: "bd7acbea-aaaaaa",
    day: "Day 11",
    challengeDate: "2021-04-04",
    step: 300,
    stepGoal: 300,
  },
  {
    id: "bd7acbea-c1as28ba",
    day: "Day 10",
    challengeDate: "2021-04-04",
    step: 12100,
    stepGoal: 2000000,
  },
  {
    id: "bd7acbea-c1b1-4as53abb28ba",
    day: "Day 9",
    challengeDate: "2021-04-04",
    step: 11240,
    stepGoal: 2000000,
  },
  {
    id: "bd7acbea-c1b1csad53abb28ba",
    day: "Day 8",
    challengeDate: "2021-04-04",
    step: 12000,
    stepGoal: 12000,
  },
  {
    id: "bd7acbea-c1b1vvvbb28ba",
    day: "Day 7",
    challengeDate: "2021-04-04",
    step: 20000,
    stepGoal: 2000000,
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    day: "Day 6",
    challengeDate: "2021-04-04",
    step: 350000,
    stepGoal: 2000000,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    day: "Day 5",
    challengeDate: "2021-04-04",
    step: 240000,
    stepGoal: 2000000,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    day: "Day 4",
    challengeDate: "2021-04-04",
    step: 12000,
    stepGoal: 2000000,
  },
  {
    id: "58694a0f-3asd-145571e29d72",
    day: "Day 3",
    challengeDate: "2021-04-04",
    step: 10000,
    stepGoal: 10000,
  },
  {
    id: "58694asd45571e29d72",
    day: "Day 2",
    challengeDate: "2021-04-04",
    step: 50000,
    stepGoal: 2000000,
  },
  {
    id: "58asd29d72",
    day: "Day 1",
    challengeDate: "2021-04-04",
    step: 124000,
    stepGoal: 2000000,
  },
];

const ClickedItem = ({ day, step, stepGoal, onPress }) => {
  return (
    <ListItem
      onPress={onPress}
      style={{
        backgroundColor:
          step === stepGoal
            ? coachColorVar().color.report
            : theme.grayScale.gray6,
      }}
    >
      <Image
        source={coachColorVar().coach === "toki" ? tokiGood : bukiGood}
        resizeMode="contain"
        style={{ width: 60, height: 60 }}
      />
      <H4Text style={{ color: theme.grayScale.white }}>잘했어요!</H4Text>
    </ListItem>
  );
};

const Item = ({ day, step, stepGoal, onPress }) => {
  return (
    <ListItem
      onPress={onPress}
      style={{
        backgroundColor:
          step === stepGoal
            ? coachColorVar().color.report
            : theme.grayScale.gray6,
      }}
    >
      <Text
        style={{
          marginBottom: 5,
          color:
            step === stepGoal ? theme.grayScale.gray6 : theme.grayScale.gray4,
          fontSize: 14,
        }}
      >
        {day}
      </Text>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color:
              step === stepGoal ? theme.grayScale.white : theme.grayScale.gray3,
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          {step}
        </Text>
        <Text
          style={{
            color:
              step === stepGoal ? theme.grayScale.gray5 : theme.grayScale.gray4,
            fontSize: 12,
          }}
        >
          /{stepGoal}
        </Text>
      </View>
    </ListItem>
  );
};

const ReportMain = () => {
  const [selectedId, setSelectedId] = useState([]);
  const handleItemClick = (id) => {
    setSelectedId((selectedId) => [...selectedId, id]);
  };

  const renderItem = ({ item }) => {
    if (item.id === selectedId) {
      return (
        <ClickedItem
          day={item.day}
          step={item.step}
          stepGoal={item.stepGoal}
          onPress={() => handleItemClick(item.id)}
        />
      );
    }

    return (
      <Item
        day={item.day}
        step={item.step}
        stepGoal={item.stepGoal}
        onPress={() => handleItemClick(item.id)}
      />
    );
  };
  return (
    <Container>
      <NameTitle>
        <Text style={{ color: coachColorVar().color.sub }}>디즈니덕후후후</Text>
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
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        numColumns={3}
        nestedScrollEnabled
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

const ListContainer = styled.View`
  flex-direction: row;
`;

const ListItem = styled.TouchableOpacity`
  flex: 1;
  height: 110px;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0px;
  margin: 5px;
  border-radius: 16px;
`;

export default ReportMain;
