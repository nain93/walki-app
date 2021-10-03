import React, { useState } from "react";
import { View, Text } from "react-native";
import Picker from "@gregfrench/react-native-wheel-picker";
import { theme } from "../styles/theme";

let PickerItem = Picker.Item;
const WheelPicker = () => {
  const [selectedItem, setSelectedItem] = useState(2);
  const [itemList, setItemList] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
  ]);

  return (
    <Picker
      style={{ width: 150, height: 80 }}
      lineColor="rgba(0,0,0,0)" //to set top and bottom line color (Without gradients)
      selectedValue={selectedItem}
      itemStyle={{
        color: theme.grayScale.white,
        fontSize: 16,
        fontWeight: 700,
      }}
      onValueChange={(index) => setSelectedItem(index)}
    >
      {itemList.map((value, i) => (
        <PickerItem label={value} value={i} key={i} />
      ))}
    </Picker>
  );
};

export default WheelPicker;
