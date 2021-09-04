import React, { useState, useEffect } from "react"
import { View, Text } from "react-native"
import styled from "styled-components"
import * as Location from "expo-location"
import axios from "axios"
import Loading from "../../components/Loading"
import WeatherLogo from "../../../assets/icons/sun.png"
import SpaceLogo from "../../../assets/icons/bar.png"
import tokiImg from "../../../assets/images/toki_character.png"
import buki from "../../../assets/images/character/buki.png"
import { CircularProgress } from "react-native-svg-circular-progress"
import { Body3Text, H3Text, H4Text, theme } from "../../styles/theme"
import LongButton from "../../components/LongButton"
import { coachColorVar } from "../../../apollo"

const Home = ({ navigation }) => {
  const [state, setState] = useState([])
  const [cateState, setCateState] = useState([])
  const [ready, setReady] = useState(true)
  const [character, setCharacter] = useState("")
  const [weather, setWeather] = useState({
    temp: 1,
    condition: "맑음",
  })

  const Location = "강남구"
  const percentage = 66
  const color = coachColorVar().color.main

  const [currentDate, setcurrentDate] = useState("")
  const [currentTime, setcurrentTime] = useState("")

  useEffect(() => {
    var date = new Date().getDate()
    var month = new Date().getMonth() + 1
    var hours = new Date().getHours()
    var min = new Date().getMinutes()

    setcurrentDate(month + "월" + " " + date + "일")
    setcurrentTime(hours + ":" + min + "PM")
    setTimeout(() => {
      setState()
      setCateState()
      getLocation()
      setReady(false)
    }, 1000)
  }, [])

  const handleGoToNext = () => {
    // swiperRef?.current.goToNext();
    navigation.navigate("ChallengeSetting")
  }

  const getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync()
      const locationData = await Location.getCurrentPositionAsync()
      const latitude = locationData["coords"]["latitude"]
      const longitude = locationData["coords"]["longitude"]

      // const API_KEY = "cfc258c75e1da2149c33daffd07a911d"
      const API_KEY = "5f45ba75e045a8cb44f05067fb179d01"
      const result = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      )

      const temp = result.data.main.temp
      const condition = result.data.weather[0].main
      console.log(result)
      console.log(temp)
      console.log(condition)

      setWeather({
        temp,
        condition,
      })
    } catch (error) {
      // Alert.alert("위치를 찾을 수가 없습니다.", "앱을 껏다 켜볼까요?")
    }
  }
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
              source={WeatherLogo}
              resizeMode={"contain"}></WeatherImage>
            <CurrentWeather>{weather.condition}</CurrentWeather>
          </WeatherSpace>
        </WeatherStatus>
      </TopStatus>
      <MiddleStatus>
        <GoalBox>
          <ProgressGoal>
            <CircularProgress
              percentage={percentage}
              donutColor={color}
              size={300}
              progressWidth={140}>
              <CharacterBox>
                <CharacetrImage
                  source={coachColorVar().coach === "toki" ? tokiImg : buki}
                  resizeMode="contain"
                />
              </CharacterBox>
            </CircularProgress>
          </ProgressGoal>
        </GoalBox>
      </MiddleStatus>
      <BottomStatus>
        <LongButton handleGoToNext={handleGoToNext} btnBackColor={color}>
          오늘의 목표를 세워보세요!
        </LongButton>
      </BottomStatus>
    </Container>
  )
}

const ProgressGoal = styled(CircularProgress)`
  width: 100px;
  height: 100px;
`

const GoalBox = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const CharacterBox = styled.View`
  width: 100px;
  height: 100px;
`

const CharacetrImage = styled.Image`
  width: 96px;
  height: 111px;
`

const GoalStep = styled.Text``

const Container = styled.SafeAreaView`
  align-items: center;
  width: 100%;
  height: 100%;
`

const GoalContainer = styled.TouchableOpacity`
  width: 300px;
  height: 54px;
  justify-content: center;
  align-items: center;
  color: ${theme.grayScale.white};
  background-color: ${theme.toki.color.main};
  border-radius: 8px;
`

const GoalText = styled(H4Text)`
  color: ${theme.grayScale.white};
  text-align: center;
`

const TopStatus = styled.View`
  width: 100%;
  height: 20%;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 15px;
  padding-right: 1px;
  padding-top: 35px;
  flex-direction: row;
`

const TimeStatus = styled.View`
  width: 40%;
  height: 90%;
  padding-left: 15px;
`
const WeatherStatus = styled.View`
  width: 60%;
  height: 100%;
  flex-direction: row;
  padding-left: 50px;
`
const LocationSpace = styled.View`
  width: 30%;
  align-items: center;
  justify-content: center;
`
const WeatherSpace = styled.View`
  width: 30%;
  align-items: center;
  justify-content: center;
`

const BarSpace = styled.View`
  width: 10%;
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
  padding-left: 30px;
  padding-right: 10px;
`
const CurrentDate = styled.Text`
  width: 100px;
  height: 20px;
  font-weight: bold;
  font-size: 16px;
`

const CurrentTime = styled.Text`
  width: 130px;
  height: 40px;
  font-weight: bold;
  font-size: 30px;
`

const CurrentWeather = styled.Text`
  width: 70px;
  height: 60px;
  font-size: 12px;
  padding-left: 25px;
  padding-top: 5px;
  color: #828282;
`
const CurrentTemperature = styled.Text`
  width: 70px;
  height: 30px;
  padding-left: 30px;
  font-size: 26px;
`

const CurrentLocation = styled.Text`
  width: 70px;
  height: 60px;
  font-size: 12px;
  padding-left: 30px;
  padding-top: 5px;
  color: #828282;
`

const WeatherImage = styled.Image`
  width: 100px;
  height: 50px;
  padding-top: 40px;
  align-items: center;
  justify-content: center;
`

const BarImage = styled.Image`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`
const MiddleStatus = styled.View`
  width: 100%;
  height: 60%;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 15px;
  padding-right: 1px;
  padding-top: 15px;
  flex-direction: row;
`
const BottomStatus = styled.View`
  width: 80%;
  height: 20%;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 35px;
  flex-direction: row;
`

export default Home
