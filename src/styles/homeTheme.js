import styled from "styled-components";

export const GoalContainer = styled.View`
  flex: 1;
`;

export const Blurgoal = styled.Text`
  font-size: 25px;
  font-weight: 700;
  color: ${props => props.coachColorVar};
`;


export const GoalBox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;


export const CharacetrImage = styled.Image`
  width: 150px;
  height: 200px;
`;
