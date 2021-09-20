import React, { useRef } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { H2Text } from "../../styles/theme";
import info from "../../../assets/icons/info.png";
import Toast from "react-native-easy-toast";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ title }) => (
  <View>
    <Text>{title}</Text>
  </View>
);

const RankingMain = () => {
  const renderItem = ({ item }) => <Item title={item.title} />;

  const toastRef = useRef();
  return (
    <Container>
      <Title>
        <H2Text>TOP 10</H2Text>
        <TouchableOpacity
          onPress={() =>
            toastRef.current.show(
              "랭킹은 오전 12시마다 업데이트됩니다. \n(어제 걸음 수 기준)",
              2000
            )
          }
        >
          <Image
            source={info}
            resizeMode="contain"
            style={{ width: 18, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </Title>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        // extraData={selectedId}
      />
      <Toast
        ref={toastRef}
        style={{
          width: 350,
          height: 60,
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

const Title = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default RankingMain;
