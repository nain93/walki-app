import { Picker } from "@react-native-picker/picker";
import React from "react";
import { monthVar } from "../../apollo";
import { month, year } from "../common/getToday";

const WheelPicker = ({ selectedMonth, setSelectedMonth, setStepInfo }) => {
  return (
    <Picker
      selectedValue={selectedMonth}
      onValueChange={(itemValue, itemIndex) => {
        setSelectedMonth(itemValue);
        if (itemValue === month) {
          setStepInfo([{}]);
          return;
        }
        setStepInfo([]);
      }}
      style={{ height: 50, width: 200, color: "white" }}
      mode="dialog"
      dropdownIconColor="white"
    >
      {monthVar().walkedMonth.length === 0 ? (
        <Picker.Item label={`${year}년 ${month}월 리포트`} value={month} />
      ) : (
        monthVar().walkedMonth.map((item) => (
          <Picker.Item
            label={`${item.year}년 ${item.month}월 리포트`}
            value={item.month}
          />
        ))
      )}
    </Picker>
  );
};

export default WheelPicker;
