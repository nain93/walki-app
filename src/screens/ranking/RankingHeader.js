import React from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components";
import { coachColorVar } from "../../../apollo";
import { H2Text, H4Text, theme } from "../../styles/theme";
import chat from "../../../assets/icons/chat.png";
import tokiHappy from "../../../assets/images/ranking/toki_happy.png";
import bukiHappy from "../../../assets/images/ranking/buki_happy.png";
import { day, getToday, getYesterday, month } from "../../common/getToday";

const RankingHeader = ({ rankingData }) => {
  return (
    <Conatiner coachColor={coachColorVar().color.report}>
      <View>
        <TextWrap>
          <Image
            source={chat}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor: "white",
              marginRight: 5,
            }}
          />
          <H4Text style={{ color: theme.grayScale.white }}>
            지난 랭킹보다{" "}
            <Text style={{ color: "#FFED4B" }}>
              {(rankingData.length === 0
                ? 0
                : rankingData.length === 1 &&
                  rankingData[0].challengeDate === getYesterday()
                ? 0
                : rankingData[0].number) -
                (rankingData.length === 0
                  ? 0
                  : rankingData.length === 1 &&
                    rankingData[0].challengeDate === getYesterday()
                  ? rankingData[0].number
                  : rankingData[1].number)}
              위 상승
            </Text>
            했어요!
          </H4Text>
        </TextWrap>
        <RankingWrap>
          <RankingBox style={{ opacity: 0.6, marginRight: 8 }}>
            <Text>
              {month}/{day - 2}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <H2Text style={{ color: coachColorVar().color.main }}>
                {rankingData.length === 0
                  ? 0
                  : rankingData.length === 1 &&
                    rankingData[0].challengeDate === getYesterday()
                  ? 0
                  : rankingData[0].number}
              </H2Text>
              <Text> 위</Text>
            </View>
          </RankingBox>
          <RankingBox>
            <Text>
              {month}/{day - 1}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <H2Text style={{ color: coachColorVar().color.main }}>
                {rankingData.length === 0
                  ? 0
                  : rankingData.length === 1 &&
                    rankingData[0].challengeDate === getYesterday()
                  ? rankingData[0].number
                  : rankingData[1].number}
              </H2Text>
              <Text> 위</Text>
            </View>
          </RankingBox>
        </RankingWrap>
      </View>

      <Image
        source={coachColorVar().coach === "toki" ? tokiHappy : bukiHappy}
        resizeMode="contain"
        style={{ width: 90 }}
      />
    </Conatiner>
  );
};

const Conatiner = styled.View`
  flex: 0.5;
  flex-direction: row;
  align-items: center;
  padding: 0 30px;
  justify-content: space-between;
  background-color: ${(props) => props.coachColor};
`;

const TextWrap = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 10px;
`;

const RankingWrap = styled.View`
  flex-direction: row;
`;

const RankingBox = styled.View`
  flex: 1;
  align-items: center;
  padding: 10px;
  background-color: ${theme.grayScale.white};
  border-radius: 8px;
`;

export default RankingHeader;
