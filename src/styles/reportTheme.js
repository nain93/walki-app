import { Dimensions } from "react-native";
import styled from "styled-components";
import { d2p, h2p } from "../common/utils";

export const ListItem = styled.TouchableOpacity`
  flex: 1;
  max-width: ${(Dimensions.get("window").width - d2p(56)) / 3}px;
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
`;
