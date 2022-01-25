import { Dimensions } from "react-native";
import styled from "styled-components";
import { d2p, h2p } from "../common/utils";

export const ListItem = styled.TouchableOpacity`
  flex: 1;
  max-width: ${(Dimensions.get("window").width - d2p(56)) / 3}px;
  height: ${d2p(110)}px;
  justify-content: space-around;
  align-items: center;
  padding: ${d2p(10)}px 0px;
  border-radius: 16px;
`;
