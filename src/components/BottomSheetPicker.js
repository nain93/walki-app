import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { monthVar } from "../../apollo";
import { gql, useQuery } from "@apollo/client";
import { theme } from "../styles/theme";
import { month, year } from "../common/getToday";

const BottomSheetPicker = ({ selectedMonth, bottomSheetRef }) => {
  const GET_CHALLENGES_QUERY = gql`
    query getChallenges {
      getChallenges {
        challengeDate
      }
    }
  `;

  const {} = useQuery(GET_CHALLENGES_QUERY, {
    onCompleted: (data) => {
      const arr = [];
      data.getChallenges.map((item, idx) => {
        if (arr[idx - 1]?.month === Number(item.challengeDate.slice(5, 7))) {
          return;
        }
        arr.push({
          year: Number(item.challengeDate.slice(0, 4)),
          month: Number(item.challengeDate.slice(5, 7)),
        });
      });
      console.log(arr, "arr");
      if (arr[0]?.month !== month) {
        monthVar([{ year, month }, ...arr]);
      } else {
        monthVar([...arr]);
      }
    },
    fetchPolicy: "cache-and-network",
  });

  const handleBottomSheet = () => {
    bottomSheetRef.current.expand();
    bottomSheetRef.current.close();
  };

  return (
    <TouchableOpacity onPress={handleBottomSheet}>
      <Text
        style={{ color: theme.grayScale.white, fontSize: 16 }}
      >{`${selectedMonth.year}년 ${selectedMonth.month}월 리포트`}</Text>
    </TouchableOpacity>
  );
};

export default BottomSheetPicker;
