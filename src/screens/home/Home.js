import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import axios from "axios";
import Loading from "../../components/Loading";
import WeatherLogo from "../../../assets/icons/sun.png";
import SpaceLogo from "../../../assets/icons/bar.png";

import Config from "react-native-config";
import StatusHome from "./StatusHome";
import { Animated } from "react-native";
import { theme } from "../../styles/theme";

const Home = ({ navigation }) => {
  const [ready, setReady] = useState(true);
  const [weather, setWeather] = useState({
    temp: 1,
    condition: "맑음",
  });

  const Location = "강남구";

  const [currentDate, setcurrentDate] = useState("");
  const [currentTime, setcurrentTime] = useState("");

  useEffect(() => {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let hours = new Date().getHours();
    let min = new Date().getMinutes();
    setcurrentDate(month + "월" + " " + date + "일");
    setcurrentTime(hours + ":" + min + "PM");
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const locationData = await Location.getCurrentPositionAsync();
      const latitude = locationData["coords"]["latitude"];
      const longitude = locationData["coords"]["longitude"];

      const API_KEY = Config.API_KEY;
      const result = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      const temp = result.data.main.temp;
      const condition = result.data.weather[0].main;
      console.log(result);
      console.log(temp);
      console.log(condition);

      setWeather({
        temp,
        condition,
      });
    } catch (error) {
      // Alert.alert("위치를 찾을 수가 없습니다.", "앱을 껏다 켜볼까요?")
    } finally {
      setReady(false);
    }
  };

  return ready ? (
    <Loading />
  ) : (
    <Container>
      <TopStatus>
        <View>
          <CurrentDate>{currentDate}</CurrentDate>
          <CurrentTime>{currentTime}</CurrentTime>
        </View>
        <WeatherStatus>
          <LocationSpace>
            <CurrentTemperature>{weather.temp}</CurrentTemperature>
            <CurrentText>{Location}</CurrentText>
          </LocationSpace>
          <Text style={{ fontSize: 36 }}>°</Text>
          <BarSpace>
            <WeatherImage
              source={SpaceLogo}
              resizeMode={"contain"}
            ></WeatherImage>
          </BarSpace>
          <WeatherSpace>
            <WeatherImage source={WeatherLogo} resizeMode={"contain"} />
            <CurrentText>{weather.condition}</CurrentText>
          </WeatherSpace>
        </WeatherStatus>
      </TopStatus>

      <StatusHome navigation={navigation} />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 30px;
  background-color: #f3f3f3;
`;

const TopStatus = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const WeatherStatus = styled.View`
  flex-direction: row;
`;
const LocationSpace = styled.View`
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 5px;
`;
const WeatherSpace = styled.View`
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;
  padding-top: 3px;
`;

const BarSpace = styled.View`
  justify-content: center;
  margin: 0 10px;
`;
const CurrentDate = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

const CurrentTime = styled.Text`
  font-weight: bold;
  font-size: 36px;
`;

const CurrentText = styled.Text`
  font-size: 12px;
  color: ${theme.grayScale.gray3};
`;
const CurrentTemperature = styled.Text`
  font-size: 36px;
`;

const WeatherImage = styled.Image`
  width: 40px;
  height: 40px;
`;

export default Home;
