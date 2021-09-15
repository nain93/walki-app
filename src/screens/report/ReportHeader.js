import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { coachColorVar } from "../../../apollo";
import { Body1Text, Caption, theme } from "../../styles/theme";
import * as Progress from "react-native-progress";

const ReportHeader = () => {
  return (
    <Container coachColor={coachColorVar().color.report}>
      <Body1Text style={{ color: "white" }}>
        이번달도 {coachColorVar().coach === "toki" ? "토키" : "부키"}와 함께
        목표를 이뤄봐요!
      </Body1Text>
      <ReportInfoWrap>
        <View>
          <ReportInfo>
            <ReportText>걸음수</ReportText>
            <CationView style={{ color: "#ffed4b" }}>
              <ReportNum style={{ color: "#ffed4b" }}>
                90,000 / 300,000
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
                70 / 100
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
                15 / 20
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
              width: 120,
            }}
            size={120}
            progress={0.3}
            borderWidth={0}
            thickness={13}
            color={"#FFED4B"}
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
            color={"#6BBEFB"}
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
  flex: 0.8;
  padding: 0 30px;
  justify-content: space-around;
  background-color: ${(props) => props.coachColor};
`;

const ReportInfoWrap = styled.View`
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
  margin-bottom: 10px;
`;

const ReportNum = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

export default ReportHeader;
