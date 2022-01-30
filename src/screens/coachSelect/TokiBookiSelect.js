import React, { useState } from "react";
import styled from "styled-components";
import { Body3Text, H3Text, theme } from "../../styles/theme";
import { Dimensions, View } from "react-native";
import tokiImg from "../../../assets/images/toki_character.png";
import bookiImg from "../../../assets/images/booki_character.png";
import LongButton from "../../components/LongButton";
import { useMutation, gql, useQuery } from "@apollo/client";
import { coachSelect } from "../../../apollo";
import Loading from "../../components/Loading";
import { d2p, h2p } from "../../common/utils";
import { getBottomSpace } from "react-native-iphone-x-helper";

const TokiBookiSelect = ({ navigation }) => {
  const [isClick, setIsClick] = useState("");
  const PUT_MEMBER_MUTATION = gql`
    mutation putMember($member: MemberInput) {
      putMember(member: $member) {
        coach {
          name
        }
      }
    }
  `;

  const GET_COACHES_QUERY = gql`
    query getCoaches {
      getCoaches {
        id
        name
        description
      }
    }
  `;

  const [putMemberMutation] = useMutation(PUT_MEMBER_MUTATION, {
    onCompleted: (data) => console.log(data, "data"),
  });
  const { data, loading } = useQuery(GET_COACHES_QUERY);

  const handleTokiSelect = () => {
    setIsClick("toki");
    if (!loading) {
      putMemberMutation({
        variables: {
          member: {
            coachId: 1,
          },
        },
      });
    }
  };

  const handleBookiSelect = () => {
    setIsClick("booki");
    if (!loading) {
      putMemberMutation({
        variables: {
          member: {
            coachId: 2,
          },
        },
      });
    }
  };

  const handleGoToNext = async () => {
    if (isClick === "toki") {
      await coachSelect("toki");
    } else if (isClick === "booki") {
      await coachSelect("booki");
    }
    navigation.navigate("BeforeStart");
  };


  return (
    <>
      <Container >
        <TokiBox selected={isClick === "toki"} onPress={handleTokiSelect}>
          <Wrapper>
            <TokiBookiImg source={tokiImg} resizeMode="contain" />
            <TitleBox>
              <TokiTitle selected={isClick === "toki"}>토키 코치</TokiTitle>
              <Desc>뛰기와 스피드를 즐긴다면?</Desc>
            </TitleBox>
          </Wrapper>
        </TokiBox>
        <BookiBox selected={isClick === "booki"} onPress={handleBookiSelect}>
          <Wrapper>
            <TokiBookiImg source={bookiImg} resizeMode="contain" />
            <TitleBox>
              <BookiTitle selected={isClick === "booki"}>부키 코치</BookiTitle>
              <Desc>걷기와 여유를 즐긴다면?</Desc>
            </TitleBox>
          </Wrapper>
        </BookiBox>
      </Container>
      <LongButton
        handleGoToNext={handleGoToNext}
        disabled={!isClick}
        btnBackColor={theme.grayScale.black}
      >
        선택 완료
      </LongButton>
    </>
  );
};

const Container = styled.View`
  margin-top: ${d2p(20)}px;
  background-color: red;
  margin-bottom: auto;
`;

const TokiBookiStyle = styled.TouchableOpacity`
  width: 100%;
  height: ${d2p(122)}px;
  background-color: ${theme.grayScale.gray7};
  margin-bottom: ${d2p(10)}px;
  border-radius: 16px;
  padding: 10px 40px;
`;

const TokiBox = styled(TokiBookiStyle)`
  border: ${(props) =>
    props.selected ? `2px solid ${theme.toki.color.main}` : "none"};
`;

const BookiBox = styled(TokiBookiStyle)`
  border: ${(props) =>
    props.selected ? `2px solid ${theme.booki.color.main}` : "none"};
`;

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TokiBookiImg = styled.Image`
  width: 80px;
  height: 91px;
`;

const TitleBox = styled.View`
  width: 60%;
`;

const NameTitle = styled(H3Text)`
  margin-bottom: 10px;
`;

const Desc = styled(Body3Text)`
  color: ${theme.grayScale.gray3};
`;

const TokiTitle = styled(NameTitle)`
  color: ${(props) =>
    props.selected ? theme.toki.color.main : theme.grayScale.gray1};
`;

const BookiTitle = styled(NameTitle)`
  color: ${(props) =>
    props.selected ? theme.booki.color.main : theme.grayScale.gray1};
`;

export default TokiBookiSelect;
