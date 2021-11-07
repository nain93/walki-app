import React from "react";
import styled from "styled-components";
import RankingHeader from "./RankingHeader";
import RankingMain from "./RankingMain";
import { gql, useMutation, useQuery } from "@apollo/client";
import { getToday, getYesterday } from "../../common/getToday";
import { Text } from "react-native";
import Loading from "../../components/Loading";

const Ranking = () => {
  const CREATE_RANKINGS_MUTATION = gql`
    mutation createRankings($date: LocalDate) {
      createRankings(date: $date)
    }
  `;

  const [createRankingMutation, {}] = useMutation(CREATE_RANKINGS_MUTATION, {
    onCompleted: (data) => {},
  });

  const GET_MY_RANKINGS_QUERY = gql`
    query getMyRankings($start: LocalDate!, $end: LocalDate!) {
      getMyRankings(start: $start, end: $end) {
        member {
          name
          profileImage
        }
        number
        challengeDate
      }
    }
  `;

  const { data, loading } = useQuery(GET_MY_RANKINGS_QUERY, {
    variables: {
      start: getYesterday(),
      end: getToday(),
    },
    onCompleted: ({ getMyRankings }) => {
      const {
        number,
        challengeDate,
        member: { profileImage, name },
      } = getMyRankings[0];
    },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <RankingHeader rank={data?.member?.name} />
      <RankingMain />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default Ranking;
