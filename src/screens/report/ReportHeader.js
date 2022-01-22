import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { coachColorVar } from "../../../apollo";
import { Body1Text, Caption, theme } from "../../styles/theme";
import * as Progress from "react-native-progress";
import { d2p, h2p } from "../../common/utils";

const ReportHeader = ({ stepTotal }) => {
  const { stepGoal, stepAchievement, challengeGoal, challengeAchievement } =
    stepTotal;

  return (
    <Container coachColor={coachColorVar().color.report}>
      <Body1Text style={{ color: "white", marginTop: h2p(18), marginBottom: h2p(26) }}>
        이번달도 {coachColorVar().coach === "toki" ? "토키" : "부키"}와 함께
        목표를 이뤄봐요!
      </Body1Text>
      <ReportInfoWrap>
        <View>
          <ReportInfo>
            <ReportText>걸음수</ReportText>
            <CationView style={{ color: "#ffed4b" }}>
              <ReportNum style={{ color: "#ffed4b" }}>
                {stepAchievement} / {stepGoal}
              </ReportNum>
              <Caption> 걸음</Caption>
            </CationView>
          </ReportInfo>
          <ReportInfo>
            <ReportText>달성률</ReportText>
            <CationView
              style={{
                color: coachColorVar().coach === "toki" ? "#a2d8ff" : "#C8E8FF",
              }}
            >
              <ReportNum
                style={{
                  color:
                    coachColorVar().coach === "toki" ? "#a2d8ff" : "#C8E8FF",
                }}
              >
                {challengeAchievement === 0
                  ? 0
                  : (
                    (challengeAchievement * 100) /
                    challengeGoal
                  ).toFixed()}{" "}
                / 100
              </ReportNum>
              <Caption> %</Caption>
            </CationView>
          </ReportInfo>
          <ReportInfo>
            <ReportText>달성일 수</ReportText>
            <CationView
              style={{
                color:
                  coachColorVar().coach === "toki"
                    ? theme.booki.color.main
                    : theme.toki.color.main,
              }}
            >
              <ReportNum
                style={{
                  color:
                    coachColorVar().coach === "toki"
                      ? theme.booki.color.main
                      : theme.toki.color.main,
                }}
              >
                {challengeAchievement} / {challengeGoal}
              </ReportNum>
              <Caption> 일</Caption>
            </CationView>
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
              width: d2p(120),
            }}
            size={d2p(120)}
            progress={
              stepAchievement === 0
                ? 0
                : (stepAchievement * 100) / stepGoal / 100
            }
            borderWidth={0}
            thickness={13}
            color={"#FFED4B"}
            unfilledColor={"rgba(255,255,255,0.1)"}
          />
          <Progress.Circle
            style={{
              position: "absolute",
              right: 0,
              width: d2p(105),
            }}
            size={d2p(90)}
            progress={
              challengeAchievement === 0
                ? 0
                : (challengeAchievement * 100) / challengeGoal / 100
            }
            borderWidth={0}
            thickness={13}
            color={"#6BBEFB"}
            unfilledColor={"rgba(255,255,255,0.1)"}
          />
          <Progress.Circle
            style={{
              position: "absolute",
              right: 0,
              width: d2p(90,)
            }}
            size={d2p(60)}
            progress={
              challengeAchievement === 0
                ? 0
                : (challengeAchievement * 100) / challengeGoal / 100
            }
            borderWidth={0}
            thickness={13}
            color={
              coachColorVar().coach === "toki"
                ? theme.booki.color.main
                : theme.toki.color.main
            }
            unfilledColor={"rgba(255,255,255,0.1)"}
          />
        </View>
      </ReportInfoWrap>
    </Container>
  );
};

const Container = styled.View`
  height: ${h2p(246)}px;
  padding: 0 ${d2p(20)}px;
  background-color: ${(props) => props.coachColor};
`;

const ReportInfoWrap = styled.View`
  margin-bottom: ${h2p(36)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ReportText = styled(Caption)`
  color: ${theme.grayScale.white};
`;

const CationView = styled(Caption)`
  flex-direction: row;
  align-items: center;
`;

const ReportInfo = styled.View`
  margin-bottom: ${h2p(8)}px;
`;

const ReportNum = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

export default ReportHeader;
