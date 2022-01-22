import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components";
import axios from "axios";
import Loading from "../../components/Loading";
import WeatherLogo from "../../../assets/icons/sun.png";
import SpaceLogo from "../../../assets/icons/bar.png";
import { theme } from "../../styles/theme";
import Config from "react-native-config";
import StatusHome from "./StatusHome";
import * as Location from 'expo-location';
import translate from 'translate-google-api';
import { d2p, h2p } from "../../common/utils";
import { wDescEngToKor } from "../../common/weatherTrans";



const Home = ({ navigation }) => {
  const [ready, setReady] = useState(true);
  const [weather, setWeather] = useState({
    temp: 0,
    condition: '',
  });
  const [city, setCity] = useState("")
  const [weatherPic, setWeatherPic] = useState("")


  const load = async () => {
    const result = await getLocation();
    WeatherSetter(result);
  };
  const WeatherSetter = () => {
    if (weather.condition === "맑음") {
      setWeatherPic(require("../../../assets/icons/cloud.png"));
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
    setInterval(() => {
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
    }, 1000)
    // getLocation();
    load();
  }, []);

  const getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const locationData = await Location.getCurrentPositionAsync();
      const latitude = locationData["coords"]["latitude"];
      const longitude = locationData["coords"]["longitude"];

      const API_KEY = Config.API_KEY;
      const result = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)

      const temp = Math.round(result.data.main.temp);
      const city = result.data.name
      const coWeather = weather.condition
      const resultt = await translate([city, coWeather], {
        from: "en",
        to: "ko",
      });
      const condition = wDescEngToKor(result.data.weather[0].id)

      setCity(resultt[0])
      setWeather({
        temp,
        condition,
      });
    } catch (error) {
      console.error(error)
    } finally {
      setReady(false);
    }
  };

  if (ready) {
    return (
      <Container style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
        <Loading />
      </Container>
    );
  }

  return (
    <Container style={{ paddingHorizontal: d2p(31) }}>
      <TopStatus style={{ marginTop: h2p(34), marginBottom: h2p(46) }}>
        <View>
          <CurrentDate>{currentDate}</CurrentDate>
          <CurrentTime>{currentTime}</CurrentTime>
        </View>
        <WeatherStatus>
          <LocationSpace>
            <CurrentTemperature>{weather.temp}</CurrentTemperature>
            <CurrentCity>{city}</CurrentCity>
          </LocationSpace>
          <Text style={{ fontSize: 36 }}>°</Text>
          <BarSpace>
            <WeatherImage source={SpaceLogo} resizeMode={"contain"} />
          </BarSpace>
          <WeatherSpace>
            {!!weatherPic &&
              <WeatherImage source={weatherPic} resizeMode={"contain"} />}
            <CurrentText>{weather.condition}</CurrentText>
          </WeatherSpace>
        </WeatherStatus>
      </TopStatus>
      <StatusHome navigation={navigation} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #f3f3f3;
`;

const TopStatus = styled.View`
  flex-direction: row;
  justify-content: space-between;
  max-height: ${h2p(66)}px;
`;

const WeatherStatus = styled.View`
  flex-direction: row;
`;
const LocationSpace = styled.View`
align-items: flex-end;
  padding-bottom: ${h2p(5)}px;
  justify-content: space-between;

`;
const WeatherSpace = styled.View`
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${h2p(5)}px;
  padding-top:${h2p(5)}px;
`;

const BarSpace = styled.View`
  justify-content: center;
  margin: 0px;
`;

const CurrentDate = styled.Text`
  font-size: 16px;
  font-weight: bold;

`;

const CurrentTime = styled.Text`
  font-size: 36px;
  font-weight: bold;

`;

const CurrentText = styled.Text`
  font-size: 12px;
  color: ${theme.grayScale.gray3};
`;
const CurrentCity = styled.Text`
font-size: 12px;
justify-content: center;
color: ${theme.grayScale.gray3};
`
const CurrentTemperature = styled.Text`
  font-size: 36px;
`;

const WeatherImage = styled.Image`
  width: ${h2p(40)}px;
  height: ${h2p(40)}px;
`;

export default Home;
