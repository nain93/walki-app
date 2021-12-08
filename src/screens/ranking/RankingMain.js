import React, {  useEffect, useRef, useState } from "react";
import { Text, FlatList, Image, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { Body3Text, H2Text, H4Text, theme } from "../../styles/theme";
import info from "../../../assets/icons/info.png";
import Toast from "react-native-easy-toast";
import { gql, useQuery } from "@apollo/client";
import Loading from "../../components/Loading";
import { getYesterday } from "../../common/getToday";
import tokiDefault from "../../../assets/images//toki_default.png";
import bukiDefault from "../../../assets/images/buki_default.png";

const Item = ({ name, profile, rank, numberColor,rankingStep,coach,myId,userId }) => (
  <RankContainer myId={myId} userId={userId} coach={coach}>
    <UserProfile>
      <H2Text
        style={{
          color: numberColor ? `${numberColor}` : theme.grayScale.black,
          width: 30,
        }}
      >
        {rank}
      </H2Text>
      <ProfileImg
        source={{ uri: profile }}
        resizeMode="cover"
        style={{ marginRight: 10 }}
      />
      <H4Text style={{ color: theme.grayScale.gray1 }}>{name}</H4Text>
    </UserProfile>
    <View style={{flexDirection:"row", alignItems:"center"}}>
      <Image style={{width:18,height:18,marginRight:4}} source={coach === "부키" ? bukiDefault: tokiDefault} />
      <Body3Text style={{color:theme.grayScale.gray1}}>
        {String(rankingStep).length>3 ?
        String(rankingStep).slice(0,String(rankingStep).length-3)
        + "," + 
        String(rankingStep).slice(String(rankingStep).length-3,String(rankingStep).length):rankingStep}
        </Body3Text>
    </View>
  </RankContainer>
);

const RankContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  margin: 12px 0;
  background-color: ${props=>props.myId===props.userId ? props.coach === "부키" ? "#DCF2B6" : "#FCBFD1" : "transparent" };
`;

const UserProfile = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileImg = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const RankingMain = ({myId}) => {
  const [rankingStep,setRankingStep] = useState(0)
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
      // date: "2021-10-24",
    },
  });

  const GET_CHALLENGE_QUERY = gql`
    query getChallenge($challengeDate: LocalDate) {
      getChallenge(challengeDate: $challengeDate) {
        step
        stepGoal
        challengeDate
      }
    }
  `;

  const {refetch} = useQuery(GET_CHALLENGE_QUERY,{
    variables:{
      challengeDate:getYesterday()
    },
    onCompleted:(data)=>{
      if(data){
        setRankingStep(data.getChallenge.step)
      }
     
    }
  })

  useEffect(()=>{
    refetch()
  },[])


  // todo getChallenge query로 어제 step 가져와야함
  const renderItem = ({ item, index }) => {
    return (
      <Item
        rankingStep={rankingStep}
        numberColor={
          index === 0
            ? "#FFA319"
            : index === 1
            ? "#BDBDBD"
            : index === 2
            ? "#C67855"
            : theme.grayScale.black
        }
        userId={item.member.id}
        myId={myId}
        name={item.member.name}
        coach={item.member.coach.name}
        profile={item.member.profileImage}
        rank={item.number}
      />
    );
  };

  const toastRef = useRef();
  if (loading) {
    return <Loading />;
  }
  return (
    <Container>
      <Title>
        <H2Text style={{marginHorizontal:20}}>TOP 10</H2Text>
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
  padding-top: 30px;
`;

const Title = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default RankingMain;
