import styled from "styled-components";
import { d2p } from "../common/utils";

export const GoalContainer = styled.View`
  flex: 1;
`;

export const Blurgoal = styled.Text`
  font-size: 35px;
  font-weight: 700;
  color: ${props => props.coachColorVar};
`;

export const GoalBox = styled.View`
  flex: 1;
  align-items: center;
`;

export const CharacetrImage = styled.Image`
  width:  ${d2p(120)};
  height: ${d2p(192)};
`;

export const Blurgoal2 = styled.Text`
  font-size: 16px;
  font-weight: 700;
`;
