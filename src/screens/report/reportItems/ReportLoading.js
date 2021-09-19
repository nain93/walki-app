import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styled from "styled-components";
import { coachColorVar } from "../../../../apollo";
import { Body1Text, Caption, theme } from "../../../styles/theme";

const ReportLoading = () => {
  return (
    <Container>
      <Header coachColor={coachColorVar().color.report}>
        <Body1Text style={{ color: "white" }}>
          이번달도 {coachColorVar().coach === "toki" ? "토키" : "부키"}와 함께
          목표를 이뤄봐요!
        </Body1Text>
        <ReportInfoWrap>
          <View>
            <ReportInfo>
              <ReportText>걸음수</ReportText>
              <CationView style={{ color: "#ffed4b" }}>
                <ReportNum style={{ color: "#ffed4b" }}>0 / 0</ReportNum>
                <Caption> 걸음</Caption>
              </CationView>
            </ReportInfo>
            <ReportInfo>
              <ReportText>달성률</ReportText>
              <CationView
                style={{
                  color:
                    coachColorVar().coach === "toki" ? "#a2d8ff" : "#C8E8FF",
                }}
              >
                <ReportNum
                  style={{
                    color:
                      coachColorVar().coach === "toki" ? "#a2d8ff" : "#C8E8FF",
                  }}
                >
                  0 / 100
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
                  0 / 0
                </ReportNum>
                <Caption> 일</Caption>
              </CationView>
            </ReportInfo>
          </View>
        </ReportInfoWrap>
      </Header>
      <Main>
        <ActivityIndicator color={coachColorVar().color.main} size="large" />
      </Main>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  flex: 0.8;
  padding: 0 30px;
  justify-content: space-around;
  background-color: ${(props) => props.coachColor};
`;

const Main = styled.View`
  flex: 1;
  padding: 0 30px;
  padding-top: 30px;
  justify-content: center;
  align-items: center;
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

export default ReportLoading;
