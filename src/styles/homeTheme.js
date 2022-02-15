import styled from "styled-components";
import { d2p, h2p } from "../common/utils";

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
  padding-bottom: ${h2p(20)}px;
`;

export const CharacetrImage = styled.Image`
  width:  ${h2p(189)}px;
  height: ${h2p(192)}px;
`;

export const Blurgoal2 = styled.Text`
  font-size: 16px;
  font-weight: 700;
`;
