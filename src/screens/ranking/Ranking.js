import React from "react";
import styled from "styled-components";
import RankingHeader from "./RankingHeader";
import RankingMain from "./RankingMain";
import { gql, useQuery } from "@apollo/client";
import { getBeforeYesterday, getToday, getYesterday } from "../../common/getToday";
import Loading from "../../components/Loading";

const Ranking = () => {
  const GET_MY_RANKINGS_QUERY = gql`
    query getMyRankings($start: LocalDate!, $end: LocalDate!) {
      getMyRankings(start: $start, end: $end) {
        member {
          id
          name
          profileImage
        }
        number
        challenge{
          challengeDate
        }
      }
    }
  `;

  const { data, loading } = useQuery(GET_MY_RANKINGS_QUERY, {
    variables: {
      start: getBeforeYesterday(),
      end: getYesterday(),
    },
    onCompleted: ({ getMyRankings }) => {
      if (getMyRankings.length !== 0) {
        const {
          number,
          challengeDate,
          member: { profileImage, name, id },
        } = getMyRankings[0];
      }
    },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      {console.log(data?.getMyRankings,"data?.getMyRankings")}
      <RankingHeader rankingData={data?.getMyRankings} />
      <RankingMain myId={data?.getMyRankings[0]?.member.id}/>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default Ranking;
