import React, { useState, useCallback, useMemo, useEffect } from "react";
import styled from "styled-components";
import ReportHeader from "./ReportHeader";
import ReportMain from "./ReportMain";
import { useQuery, gql, useReactiveVar } from "@apollo/client";
import Loading from "../../components/Loading";
import ReportLoading from "./reportItems/ReportLoading";
import { monthVar, userNameVar } from "../../../apollo";
import { useFocusEffect } from "@react-navigation/native";
import {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Button, Text, TouchableWithoutFeedback } from "react-native";
import { getToday, month } from "../../common/getToday";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STOARGE from "../../constants/stoarge";

const Report = ({
  selectedMonth,
  setSelectedMonth,
  stepInfo,
  setStepInfo,
  bottomSheetRef,
}) => {
  const monthV = useReactiveVar(monthVar);
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

  const handleMonthClick = (item) => {
    console.log(item);
    setSelectedMonth({
      ...item,
    });
  };

  const { loading, data, refetch } = useQuery(GET_REPORT, {
    variables: {
      yearMonth: {
        year: selectedMonth.year,
        month: selectedMonth.month,
      },
    },
    onCompleted: (data) => {
      let res = data.getReport.challenges
        .map((item) => ({
          ...item,
          day: `Day ${item.challengeDate.substr(8, 2)}`,
          selected: false,
        }))
        .sort((a, b) => {
          return (
            Number(b?.challengeDate?.substr(8, 2)) -
            Number(a?.challengeDate?.substr(8, 2))
          );
        });
      const { stepAchievement, stepGoal, challengeAchievement, challengeGoal } =
        data.getReport;
      setStepTotal({
        ...stepTotal,
        stepGoal,
        stepAchievement,
        challengeGoal,
        challengeAchievement,
      });

      if (res.length === 0) {
        setStepInfo([{}]);
        return;
      }
      if (selectedMonth.month === month) {
        if (res[0].challengeDate === getToday()) {
          setStepInfo([...res]);
        } else {
          setStepInfo([{}, ...res]);
        }
      } else {
        setStepInfo([...res]);
      }
    },
    // fetchPolicy: "cache-and-network",
    onError: (e) => {
      console.log(e);
    },
    notifyOnNetworkStatusChange: true
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

  const { } = useQuery(GET_MEMBER, {
    onCompleted,
    onError: (e) => {
      console.log(e);
    },
  });

  useFocusEffect(
    useCallback(() => {
      const refetchCheck = async () => {
        const todayCheck = await AsyncStorage.getItem(STOARGE.TODAY)
        if (todayCheck) {
          if (todayCheck !== getToday()) {
            refetch()
            AsyncStorage.removeItem(STOARGE.TODAY)
          }
        }
      }
      refetchCheck()
    }, [])
  );


  useEffect(() => {
    bottomSheetRef?.current?.close();
  }, []);

  const snapPoints = useMemo(() => ["50%"], []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  if (loading || isLoading) {
    return <Loading children={<ReportLoading />} />;
  }
  return (
    <TouchableWithoutFeedback onPress={() => bottomSheetRef.current.close()}>
      <Container>
        <ReportHeader stepTotal={stepTotal} />
        <ReportMain stepInfo={stepInfo}>
          <BottomSheetModalProvider>
            <BottomSheetModal
              enablePanDownToClose
              ref={bottomSheetRef}
              index={0}
              snapPoints={snapPoints}
              backdropComponent={renderBackdrop}
            >
              <BottomSheetScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{
                  alignItems: "center",
                }}
              >
                <FlatList
                  style={{ width: "100%" }}
                  data={monthV}
                  keyExtractor={() => Math.random()}
                  renderItem={({ item }) =>
                    <MonthItem onPress={() => handleMonthClick(item)}>
                      <Text>{`${item.year}년 ${item.month}월 리포트`}</Text>
                    </MonthItem>
                  }
                />
              </BottomSheetScrollView>
            </BottomSheetModal>
          </BottomSheetModalProvider>
        </ReportMain>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const Container = styled.View`
  flex: 1;
`;

const MonthItem = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export default Report;
