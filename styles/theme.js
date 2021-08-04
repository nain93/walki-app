import styled from "styled-components";

export const HeaderText = styled.Text`
  font-weight: 700;
  font-size: 24px;
  margin: 10px;
`;

const grayScale = {
  black: "#000000",
  gray1: "#333333",
  gray2: "#4f4f4f",
  gray3: "#828282",
  gray4: "#bdbdbd",
  gray5: "#e0e0e0",
  gray6: "#f2f2f2",
  white: "#ffffff",
};

const toki = {
  color: {
    main: "#f22764",
    sub: "#f8638b",
    character: {
      main: "#f2aacb",
      sub: "#ffcfe5",
    },
    chart: {
      main: "#51b5ff",
      sub: "#8ec9f5",
    },
    ...grayScale,
  },
};

const booki = {
  color: {
    main: "#8ad10a",
    sub: "#ade051",
    character: {
      main: "#b1d66e",
      sub: "#d9edb4",
    },
    chart: {
      main: "#51b5ff",
      sub: "#8ec9f5",
    },
    ...grayScale,
  },
};

export const theme = {
  toki,
  booki,
};
