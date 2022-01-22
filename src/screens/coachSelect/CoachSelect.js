import React from "react";
import styled from "styled-components";
import { d2p, h2p } from "../../common/utils";
import HeaderForm from "../../components/HeaderForm";
import TokiBookiSelect from "./TokiBookiSelect";

const CoachSelect = ({ navigation }) => {
  return (
    <Container>
      <HeaderForm
        headerChildren={"나의 걷기를 도와줄 \n코치를 선택해주세요!"}
        descChildren={
          "나의 걷기 패턴에 맞는 코치를 선택하고 \n서비스를 이용해보세요"
        }
        align="left"
      />
      <TokiBookiSelect navigation={navigation} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 0 ${d2p(38)}px;
  padding-top: ${h2p(14)}px;
  padding-bottom: ${Platform.OS === "android" ? `${h2p(40)}px` : getBottomSpace() + `${h2p(40)}}px`};
`;

export default CoachSelect;
