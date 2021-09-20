import React, { useState } from "react";
import styled from "styled-components";
import ReportHeader from "./ReportHeader";
import ReportMain from "./ReportMain";
import { useQuery, gql } from "@apollo/client";
import Loading from "../../components/Loading";
import ReportLoading from "./reportItems/ReportLoading";
import { userNameVar } from "../../../apollo";

const Report = ({ selectedMonth, stepInfo, setStepInfo }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [stepTotal, setStepTotal] = useState({
    stepGoal: 0,
    stepAchievement: 0,
    challengeGoal: 0,
    challengeAchievement: 0,
  });
  const GET_REPORT = gql`
    query getReport($yearMonth: YearMonthInput!) {
      getReport(yearMonth: $yearMonth) {
        stepGoal
        stepAchievement
        challengeGoal
        challengeAchievement
        challenges {
          challengeDate
          step
          stepGoal
          createdAt
        }
      }
    }
  `;
  const { loading } = useQuery(GET_REPORT, {
    variables: {
      yearMonth: {
        year: 2021,
        month: Number(selectedMonth),
      },
    },
    onCompleted: (data) => {
      let res = data.getReport.challenges.map((item) => ({
        ...item,
        day: `Day ${item.challengeDate.substr(8, 2)}`,
        selected: false,
      }));

      const { stepAchievement, stepGoal, challengeAchievement, challengeGoal } =
        data.getReport;
      setStepTotal({
        stepGoal,
        stepAchievement,
        challengeGoal,
        challengeAchievement,
      });
      if (res.length % 3 === 1) {
        res = res.concat([{}, {}]);
      }
      if (res.length % 3 === 2) {
        res = res.concat([{}]);
      }

      setStepInfo(
        res.sort((a, b) => {
          return (
            Number(b?.challengeDate?.substr(8, 2)) -
            Number(a?.challengeDate?.substr(8, 2))
          );
        })
      );
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
    setIsLoading(false);
  };

  const {} = useQuery(GET_MEMBER, {
    onCompleted,
    onError: (e) => {
      console.log(e);
    },
  });

  if (loading || isLoading) {
    return <Loading children={<ReportLoading />} />;
  }
  return (
    <Container>
      <ReportHeader stepTotal={stepTotal} />
      <ReportMain stepInfo={stepInfo} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default Report;
