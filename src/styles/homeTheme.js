import styled from "styled-components";
import { CircularProgress } from "react-native-svg-circular-progress";
import { H4Text, theme } from "./theme";

export const BlurgoalBox = styled.View`
  height: 10%;
  width: 100%;
  align-items: center;
`;

export const Blurgoal = styled.Text`
  font-size: 25px;
  font-weight: 700;
  color: ${(props) => props.coachColorVar};
`;
export const ProgressGoal = styled(CircularProgress)`
  width: 292px;
  height: 292px;
`;

export const GoalBox = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const CharacterBox = styled.View`
  width: 120px;
  height: 192px;
`;

export const CharacetrImage = styled.Image`
  width: 120px;
  height: 192px;
`;

export const CheerText = styled.Text`
  font-size: 16px;
`;

export const Container = styled.SafeAreaView`
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;
`;

export const GoalContainer = styled.TouchableOpacity`
  width: 300px;
  height: 54px;
  justify-content: center;
  align-items: center;
  color: ${theme.grayScale.white};
  background-color: ${theme.toki.color.main};
  border-radius: 8px;
`;

export const MiddleStatus = styled.View`
  width: 100%;
  height: 60%;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 15px;
  padding-right: 1px;
  padding-top: 15px;
  flex-direction: row;
`;
export const BottomStatus = styled.View`
  width: 80%;
  height: 20%;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 30px;
  flex-direction: row;
`;

export const GoalText = styled(H4Text)`
  color: ${theme.grayScale.black};
  text-align: center;
`;
