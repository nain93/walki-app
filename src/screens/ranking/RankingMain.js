import React, { useRef } from "react";
import { Text, FlatList, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { H2Text, H4Text, theme } from "../../styles/theme";
import info from "../../../assets/icons/info.png";
import Toast from "react-native-easy-toast";
import { gql, useQuery } from "@apollo/client";
import { getYesterday } from "../../common/getToday";
import Loading from "../../components/Loading";

const Item = ({ name, profile, rank }) => (
  <RankContainer>
    <UserProfile>
      <H2Text>{rank}</H2Text>
      <ProfileImg
        source={{ uri: profile }}
        resizeMode="cover"
        style={{ marginLeft: 30, marginRight: 10 }}
      />
      <H4Text style={{ color: theme.grayScale.gray1 }}>{name}</H4Text>
    </UserProfile>
    <Text>232,631</Text>
  </RankContainer>
);

const RankContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const UserProfile = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileImg = styled.Image`
  width: 40px;
  height: 40px;
  margin: 10px 0;
  border-radius: 20px;
`;

const RankingMain = () => {
  const GET_TOP10_RANKINGS_QUERY = gql`
    query getTop10Rankings($date: LocalDate) {
      getTop10Rankings(date: $date) {
        member {
          id
          name
          profileImage
          coach {
            name
          }
        }
        number
        challengeDate
      }
    }
  `;
  const { data, loading } = useQuery(GET_TOP10_RANKINGS_QUERY, {
    variables: {
      date: getYesterday(),
    },
  });

  // todo getChallenge query로 어제 step 가져와야함
  const renderItem = ({ item }) => (
    <Item
      name={item.member.name}
      profile={item.member.profileImage}
      rank={item.number}
    />
  );

  const toastRef = useRef();
  if (loading) {
    return <Loading />;
  }
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
        data={data.getTop10Rankings}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.member.id)}
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
