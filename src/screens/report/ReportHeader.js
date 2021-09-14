import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { coachColorVar } from "../../../apollo";
import { Body1Text, Caption, theme } from "../../styles/theme";
import * as Progress from "react-native-progress";

const ReportHeader = () => {
  const coachColor = coachColorVar();
  return (
    <Container coachColor={coachColor.color.sub}>
      <Body1Text style={{ color: "white" }}>
        이번달도 {coachColor.coach === "toki" ? "토키" : "부키"}와 함께 목표를
        이뤄봐요!
      </Body1Text>
      <ReportInfoWrap>
        <View>
          <ReportInfo>
            <ReportText>걸음수</ReportText>
            <ReportNum style={{ color: "#ffed4b" }}>
              90,000 / 300,000 걸음
            </ReportNum>
          </ReportInfo>
          <ReportInfo>
            <ReportText>달성률</ReportText>
            <ReportNum style={{ color: "#a2d8ff" }}>70 / 100 % </ReportNum>
          </ReportInfo>
          <ReportInfo>
            <ReportText>달성일 수</ReportText>
            <ReportNum style={{ color: theme.booki.color.main }}>
              15 / 20 일
            </ReportNum>
          </ReportInfo>
        </View>
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <Progress.Circle
            style={{
              position: "absolute",
              right: 0,
              width: 120,
            }}
            size={120}
            progress={0.3}
            borderWidth={0}
            thickness={13}
            color={"#ffed4b"}
            unfilledColor={"rgba(255,255,255,0.1)"}
          />
          <Progress.Circle
            style={{
              position: "absolute",
              right: 0,
              width: 105,
            }}
            size={90}
            progress={0.7}
            borderWidth={0}
            thickness={13}
            color={"#a2d8ff"}
            unfilledColor={"rgba(255,255,255,0.1)"}
          />
          <Progress.Circle
            style={{
              position: "absolute",
              right: 0,
              width: 90,
            }}
            size={60}
            progress={0.6}
            borderWidth={0}
            thickness={13}
            color={theme.booki.color.main}
            unfilledColor={"rgba(255,255,255,0.1)"}
          />
        </View>
      </ReportInfoWrap>
    </Container>
  );
};

const Container = styled.View`
  flex: 0.4;
  padding: 30px;
  justify-content: space-around;
  background-color: ${(props) => props.coachColor};
`;

const ReportInfoWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ReportText = styled(Caption)`
  color: ${theme.grayScale.white};
`;

const ReportInfo = styled.View`
  margin-bottom: 10px;
`;

const ReportNum = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

export default ReportHeader;
