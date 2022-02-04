import React from "react";
import styled from "styled-components";
import RankingHeader from "./RankingHeader";
import RankingMain from "./RankingMain";
import { gql, useQuery } from "@apollo/client";
import { getBeforeYesterday, getToday, getYesterday } from "../../common/getToday";
import Loading from "../../components/Loading";
import ReportLoading from "../report/reportItems/ReportLoading";
import RankingLoading from "./RankingLoading";
import STOARGE from "../../constants/stoarge";

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

  const { data, loading, refetch } = useQuery(GET_MY_RANKINGS_QUERY, {
    variables: {
      start: getBeforeYesterday().date,
      end: getYesterday().date,
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

  // * 다음날 되면 리패치
  useFocusEffect(
    useCallback(() => {
      const refetchCheck = async () => {
        const todayCheck = await AsyncStorage.getItem(STOARGE.RANKING_CHECK)
        if (todayCheck) {
          if (todayCheck !== getToday()) {
            refetch()
            AsyncStorage.removeItem(STOARGE.RANKING_CHECK)
          }
        }
      }
      refetchCheck()
    }, [])
  );

  if (loading) {
    return <Loading children={<RankingLoading />} />;
  }

  return (
    <Container>
      <RankingHeader rankingData={data?.getMyRankings} />
      <RankingMain myId={data?.getMyRankings[0]?.member.id} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default Ranking;
