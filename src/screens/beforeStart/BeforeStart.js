import React from "react";
import styled from "styled-components";
import HeaderForm from "../../components/HeaderForm";
import heart from "../../../assets/icons/heart.png";
import location from "../../../assets/icons/location.png";
import notification from "../../../assets/icons/notification.png";
import { coachColorVar } from "../../../apollo";
import { Body1Text, H4Text } from "../../styles/theme";
import LongButton from "../../components/LongButton";

const BeforeStart = ({ navigation }) => {
  const handleGoToNext = () => navigation.navigate("TabNavigator");
  // * reset으로 넘겨야됨?

  return (
    <Container>
      <HeaderForm
        headerChildren="시작하기 전에"
        descChildren={
          "더 나은 워키 이용을 위해 \n아래의 접근권한의 허용이 필요해요."
        }
        align="center"
      />
      <AlertSection>
        <AlertBox>
          <IconBox color={coachColorVar().color.primary.tap}>
            <Icon source={notification} resizeMode="center" />
          </IconBox>
          <IconText>
            <IconHeader>운동 응원 알람</IconHeader> 등을 {"\n"}받을 수 있어요.
            (선택)
          </IconText>
        </AlertBox>
        <AlertBox>
          <IconBox color={coachColorVar().color.primary.tap}>
            <Icon source={location} resizeMode="center" />
          </IconBox>
          <IconText>
            <IconHeader>날씨와 온도의 정확한 정보</IconHeader>를 {"\n"}제공받을
            수 있어요. (필수)
          </IconText>
        </AlertBox>
        <AlertBox>
          <IconBox color={coachColorVar().color.primary.tap}>
            <Icon source={heart} resizeMode="center" />
          </IconBox>
          <IconText>
            <IconHeader>정확한 걸음 수</IconHeader>를 {"\n"}제공받을 수 있어요.
            (필수)
          </IconText>
        </AlertBox>
      </AlertSection>
      <LongButton
        handleGoToNext={handleGoToNext}
        disabled={false}
        btnBackColor={coachColorVar().color.main}
      >
        확인
      </LongButton>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  padding: 10px 30px;
  padding-top: 30px;
`;

const AlertSection = styled.View`
  flex: 0.7;
  justify-content: space-between;
`;

const AlertBox = styled.View`
  align-items: center;
  margin: 10px 0;
`;

const IconBox = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${(props) => props.color};
  padding: 10px;
  margin-bottom: 10px;
`;

const IconText = styled(Body1Text)`
  text-align: center;
`;

const IconHeader = styled(H4Text)``;

const Icon = styled.Image`
  width: 100%;
  height: 100%;
`;

export default BeforeStart;
