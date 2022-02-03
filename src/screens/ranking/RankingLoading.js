import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";
import { coachColorVar } from "../../../apollo";
import { h2p } from "../../common/utils";
import { theme } from "../../styles/theme";

const RankingLoading = () => {
    return (
        <Container>
            <Header coachColor={coachColorVar().color.report}></Header>
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
  height: ${h2p(152)}px;
  background-color: ${(props) => props.coachColor};
`;

const Main = styled.View`
  flex: 1;
  padding-top: ${h2p(24)}px;
  background-color: ${theme.grayScale.white};
`;

export default RankingLoading;
