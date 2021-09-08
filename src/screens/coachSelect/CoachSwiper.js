import React from "react";
import styled from "styled-components";

import TokiBookiSelect from "./TokiBookiSelect";
import HeaderForm from "../../components/HeaderForm";

const CoachSwiper = ({ navigation }) => {
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
  padding: 30px;
  justify-content: space-around;
`;

export default CoachSwiper;
