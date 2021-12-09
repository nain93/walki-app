import React, { useState } from "react";
import styled from "styled-components";
import { Body3Text, H3Text, theme } from "../../styles/theme";
import { View } from "react-native";
import tokiImg from "../../../assets/images/toki_character.png";
import bookiImg from "../../../assets/images/booki_character.png";
import LongButton from "../../components/LongButton";
import { useMutation, gql, useQuery } from "@apollo/client";
import { coachSelect } from "../../../apollo";

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

  const GET_MEMBER_QUERY = gql`
  query getMember{
    getMember{
      coach{
        name
      }
    }
  }
`

  const [putMemberMutation] = useMutation(PUT_MEMBER_MUTATION, {
    onCompleted: (data) => console.log(data, "data"),
  });
  const { data, loading } = useQuery(GET_COACHES_QUERY);

  const {} = useQuery(GET_MEMBER_QUERY,{
    onCompleted:(data)=>{
      if(data.getMember.coach.name==="토키"){
        coachSelect("toki")
        navigation.reset({ routes: [{ name: "TabNavigator" }] });
      }
      else if(data.getMember.coach.name==="부키"){
        coachSelect("booki")
        navigation.reset({ routes: [{ name: "TabNavigator" }] });
      }
    }
  })

  const handleTokiSelect = () => {
    setIsClick("toki");
    if (!loading) {
      putMemberMutation({
        variables: {
          member: {
            coachId: data?.getCoaches[0].id,
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
            coachId: data?.getCoaches[1].id,
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
    <Container>
      <View>
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
      </View>
      <LongButton
        handleGoToNext={handleGoToNext}
        disabled={!isClick}
        btnBackColor={theme.grayScale.black}
      >
        선택 완료
      </LongButton>
    </Container>
  );
};

const Container = styled.View``;

const TokiBookiStyle = styled.TouchableOpacity`
  width: 100%;
  height: 122px;
  background-color: ${theme.grayScale.gray7};
  margin: 10px 0;
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
  margin-bottom: 100px;
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
