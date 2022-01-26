import React from "react";
import { Text } from "react-native";
import { monthVar } from "../../apollo";
import { gql, useQuery } from "@apollo/client";
import { headerTitleStyle, theme } from "../styles/theme";
import DownIcon from "react-native-vector-icons/AntDesign";
import styled from "styled-components";

const BottomSheetPicker = ({ selectedMonth, bottomSheetRef }) => {
  const GET_REPORT_MONTH = gql`
    query getReportMonth {
      getReportMonth {
        yearMonthList
      }
    }
  `;

  const { } = useQuery(GET_REPORT_MONTH, {
    onCompleted: (data) => {
      const months = [];
      data.getReportMonth.yearMonthList.map((item, idx) => {
        months.push({
          year: Number(item.slice(0, 4)),
          month: Number(item.slice(5, 7)),
        });
      });
      monthVar([...months]);
    },
  });

  const handleBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <MonthButton onPress={handleBottomSheet}>
      <Text style={[headerTitleStyle, { color: theme.grayScale.white }]}>
        {`${selectedMonth.year}년 ${selectedMonth.month}월 리포트`}
      </Text>
      <DownIcon
        name="down"
        size={18}
        style={{ marginLeft: 5, color: theme.grayScale.white }}
      />
    </MonthButton>
  );
};

const MonthButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export default BottomSheetPicker;
