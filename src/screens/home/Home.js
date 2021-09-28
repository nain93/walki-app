import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import Loading from "../../components/Loading";
import WeatherLogo from "../../../assets/icons/sun.png";
import SpaceLogo from "../../../assets/icons/bar.png";

import Config from "react-native-config";
import StatusHome from "./StatusHome";

const Home = ({ navigation }) => {
  const [ready, setReady] = useState(true);
  const [weather, setWeather] = useState({
    temp: 1,
    condition: "맑음",
  });
  const [weatherPic, setWeatherPic] = useState("");

  const Location = "강남구";

  const load = async () => {
    const result = await getLocation();
    WeatherSetter(result);
  };
  const WeatherSetter = () => {
    if (weather.condition === "맑음") {
      setWeatherPic(require("../../../assets/icons/sun.png"));
    } else if (weather.condition === "구름") {
      setWeatherPic(require("../../../assets/icons/cloud.png"));
    } else if (weather.condition === "비") {
      setWeatherPic(require("../../../assets/icons/rain.png"));
    } else if (weather.condition === "태풍") {
      setWeatherPic(require("../../../assets/icons/thunderstrom.png"));
    } else if (weather.condition === "눈") {
      setWeatherPic(require("../../../assets/icons/snow.png"));
    } else {
      weather.condition === "안개";
      setWeatherPic(require("../../../assets/icons/mist.png"));
    }
  };

  const [currentDate, setcurrentDate] = useState("");
  const [currentTime, setcurrentTime] = useState("");

  useEffect(() => {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    hours = hours % 12;
    hours = hours < 10 ? "0" + hours : hours;
    let ampm = hours >= 12 ? "시" : "PM";
    minutes = minutes < 10 ? "0" + minutes : minutes;
    setcurrentDate(month + "월" + " " + date + "일");
    setcurrentTime(hours + ":" + minutes + ampm);
    getLocation();
    load();
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
      console.log(weather.condition);
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
        <TimeStatus>
          <CurrentDate>{currentDate}</CurrentDate>
          <CurrentTime>{currentTime}</CurrentTime>
        </TimeStatus>
        <WeatherStatus>
          <LocationSpace>
            <CurrentTemperature>
              {weather.temp + "℃"}
              {"\n"}
            </CurrentTemperature>
            <CurrentLocation>{Location}</CurrentLocation>
          </LocationSpace>
          <BarSpace>
            <BarImage source={SpaceLogo} resizeMode={"contain"}></BarImage>
          </BarSpace>
          <WeatherSpace>
            <WeatherImage
              source={weatherPic}
              resizeMode={"contain"}></WeatherImage>
            <CurrentWeather>{weather.condition}</CurrentWeather>
          </WeatherSpace>
        </WeatherStatus>
      </TopStatus>

      <StatusHome navigation={navigation} />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;
`;

const TopStatus = styled.View`
  width: 100%;
  height: 20%;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 15px;
  padding-right: 1px;
  padding-top: 35px;
  flex-direction: row;
`;

const TimeStatus = styled.View`
  width: 40%;
  height: 90%;
  padding-left: 15px;
`;
const WeatherStatus = styled.View`
  width: 60%;
  height: 100%;
  flex-direction: row;
  padding-left: 50px;
`;
const LocationSpace = styled.View`
  width: 30%;
  align-items: center;
  justify-content: center;
`;
const WeatherSpace = styled.View`
  width: 30%;
  align-items: center;
  justify-content: center;
`;

const BarSpace = styled.View`
  width: 10%;
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
  padding-left: 30px;
  padding-right: 10px;
`;
const CurrentDate = styled.Text`
  width: 100px;
  height: 20px;
  font-weight: bold;
  font-size: 16px;
`;

const CurrentTime = styled.Text`
  width: 130px;
  height: 40px;
  font-weight: bold;
  font-size: 30px;
`;

const CurrentWeather = styled.Text`
  width: 70px;
  height: 60px;
  font-size: 12px;
  padding-left: 25px;
  padding-top: 3px;
  color: #828282;
`;
const CurrentTemperature = styled.Text`
  width: 70px;
  height: 30px;
  padding-left: 30px;
  font-size: 26px;
`;

const CurrentLocation = styled.Text`
  width: 70px;
  height: 60px;
  font-size: 12px;
  padding-left: 30px;
  padding-top: 5px;
  color: #828282;
`;

const WeatherImage = styled.Image`
  width: 33px;
  height: 33px;
  padding-top: 25px;
  align-items: center;
  justify-content: center;
`;

const BarImage = styled.Image`
  width: 50px;
  height: 28px;
  align-items: center;
  justify-content: center;
`;

export default Home;
