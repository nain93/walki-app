import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { coachColorVar, userNameVar } from "../../../apollo";
import Item from "./reportItems/Item";
import ClickedItem from "./reportItems/ClickedItem";
import AddItem from "./reportItems/AddItem";
import { useQuery, gql, useReactiveVar } from "@apollo/client";
import info from "../../../assets/icons/info.png";

const DATA = [
  {
    id: "bd7acbea-zzzzzz",
    day: "Day 12",
    challengeDate: "2021-04-04",
    step: 10000,
    stepGoal: 2000000,
    selected: false,
  },
  {
    id: "bd7acbea-aaaaaa",
    day: "Day 11",
    challengeDate: "2021-04-04",
    step: 300,
    stepGoal: 300,
    selected: false,
  },
  {
    id: "bd7acbea-c1as28ba",
    day: "Day 10",
    challengeDate: "2021-04-04",
    step: 12100,
    stepGoal: 2000000,
    selected: false,
  },
  {
    id: "bd7acbea-c1b1-4as53abb28ba",
    day: "Day 9",
    challengeDate: "2021-04-04",
    step: 11240,
    stepGoal: 2000000,
    selected: false,
  },
  {
    id: "bd7acbea-c1b1csad53abb28ba",
    day: "Day 8",
    challengeDate: "2021-04-04",
    step: 12000,
    stepGoal: 12000,
    selected: false,
  },
  {
    id: "bd7acbea-c1b1vvvbb28ba",
    day: "Day 7",
    challengeDate: "2021-04-04",
    step: 20000,
    stepGoal: 2000000,
    selected: false,
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    day: "Day 6",
    challengeDate: "2021-04-04",
    step: 350000,
    stepGoal: 2000000,
    selected: false,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    day: "Day 5",
    challengeDate: "2021-04-04",
    step: 240000,
    stepGoal: 2000000,
    selected: false,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    day: "Day 4",
    challengeDate: "2021-04-04",
    step: 12000,
    stepGoal: 2000000,
    selected: false,
  },
  {
    id: "58694a0f-3asd-145571e29d72",
    day: "Day 3",
    challengeDate: "2021-04-04",
    step: 10000,
    stepGoal: 10000,
    selected: false,
  },
  {
    id: "58694asd45571e29d72",
    day: "Day 2",
    challengeDate: "2021-04-04",
    step: 50000,
    stepGoal: 2000000,
    selected: false,
  },
  {
    id: "58asd29d72",
    day: "Day 1",
    challengeDate: "2021-04-04",
    step: 124000,
    stepGoal: 2000000,
    selected: false,
  },
];

const ReportMain = () => {
  const GET_REPORT = gql`
    query getReport($yearMonth: YearMonthInput!) {
      getReport(yearMonth: $yearMonth) {
        challenges {
          challengeDate
          step
          stepGoal
          createdAt
        }
      }
    }
  `;
  const {} = useQuery(GET_REPORT, {
    variables: {
      yearMonth: {
        year: 2021,
        month: 3,
      },
    },
    onCompleted: (data) => {
      console.log(data.challenges, "data");
    },
    onError: (e) => {
      console.log(e);
    },
  });

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

  const editedUserName = useReactiveVar(userNameVar);
  const [selectedId, setSelectedId] = useState([]);

  const handleItemClick = (index) => {
    const res = DATA.map((item) => ({
      ...item,
      day: `Day ${item.challengeDate.substr(9, 2)}`,
      selected: false,
    }));
    const data = [...DATA];
    data[index].selected = !data[index].selected;
    setSelectedId(data);
  };

  const renderItem = ({ item, index }) => {
    if (index === 0) {
      return <AddItem />;
    }
    if (item.selected) {
      return (
        <ClickedItem
          day={item.day}
          step={item.step}
          stepGoal={item.stepGoal}
          onPress={() => handleItemClick(index)}
        />
      );
    }
    return (
      <Item
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
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
