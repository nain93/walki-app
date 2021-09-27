import React, { useState, useEffect, useRef } from "react"
import { Animated, TouchableOpacity } from "react-native"
import styled from "styled-components"
import * as Location from "expo-location"
import axios from "axios"
import Loading from "../../components/Loading"
import WeatherLogo from "../../../assets/icons/sun.png"
import SpaceLogo from "../../../assets/icons/bar.png"

import toki_happy from "../../../assets/images/character/toki_happy.png"
import buki_happy from "../../../assets/images/character/buki_happy.png"
import { CircularProgress } from "react-native-svg-circular-progress"
import { Body3Text, H3Text, H4Text, theme } from "../../styles/theme"
import LongButton from "../../components/LongButton"
import { coachColorVar } from "../../../apollo"
import { Pedometer } from "expo-sensors"
import { request, PERMISSIONS, check } from "react-native-permissions"

const HomeCompleted = ({ navigation }) => {
  const [state, setState] = useState([])
  const [cateState, setCateState] = useState([])
  const [ready, setReady] = useState(true)
  const [character, setCharacter] = useState("")
  const [weather, setWeather] = useState({
    temp: 1,
    condition: "맑음",
  })

  const getSteps = () => {
    Pedometer.watchStepCount(result =>
      setSteps(steps => ({
        ...steps,
        currentStepCount: result.steps,
      }))
    )
  }
  const [steps, setSteps] = useState({
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
  })

  useEffect(() => {
    request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then(granted => {
      if (granted) {
        console.log(granted)
        getSteps()
      }
    })
  }, [])

  const { currentStepCount, isPedometerAvailable } = steps

  const Location = "강남구"
  const percentage = 100
  // step/ stepgoal
  const color = coachColorVar().color.main
  const [currentDate, setcurrentDate] = useState("")
  const [currentTime, setcurrentTime] = useState("")

  useEffect(() => {
    let date = new Date().getDate()
    let month = new Date().getMonth() + 1
    let hours = new Date().getHours()
    let min = new Date().getMinutes()
    console.log(hours)
    setcurrentDate(month + "월" + " " + date + "일")
    setcurrentTime(hours + ":" + min + "PM")
    setTimeout(() => {
      setState()
      setCateState()
      getLocation()
      setReady(false)
    }, 1000)
    request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then(granted => {
      if (granted) {
        console.log(granted)
        getSteps()
      }
    })
  }, [])

  const handleGoToNext = () => {
    // swiperRef?.current.goToNext();
    navigation.navigate("ChallengeSetting")
  }

  const fadetext = useRef(new Animated.Value(0)).current
  const fadeimage = useRef(new Animated.Value(0.8)).current

  const handlepressup = () => {
    Animated.timing(fadetext, {
      toValue: 0.8,
      duration: 500,
      useNativeDriver: true,
    }).start()
    Animated.timing(fadeimage, {
      toValue: 0.2,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }
  const handlepressdown = () => {
    Animated.timing(fadetext, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
    Animated.timing(fadeimage, {
      toValue: 0.8,
      duration: 500,
      useNativeDriver: true,
    }).start()
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
          {/* <MiddleBox onpress={handlepressup}> */}
          <ProgressGoal>
            <CircularProgress
              percentage={percentage}
              donutColor={color}
              size={300}
              progressWidth={140}>
              <CharacterBox>
                <Animated.View style={[{ opacity: fadeimage }]}>
                  <CharacetrImage
                    source={
                      coachColorVar().coach === "toki" ? toki_happy : buki_happy
                    }
                    resizeMode="contain"
                  />
                </Animated.View>
              </CharacterBox>
              <Animated.View
                style={[{ opacity: fadetext, position: "absolute" }]}>
                <BlurgoalBox onpress={handlepressdown => handlepressup}>
                  <Blurgoal coachColorVar={coachColorVar().color.main}>
                    {currentStepCount}
                    {"\n"}
                  </Blurgoal>

                  <GoalText>목표를 설정해주세요</GoalText>
                </BlurgoalBox>
              </Animated.View>
            </CircularProgress>
          </ProgressGoal>
          {/* </MiddleBox> */}
        </GoalBox>
      </MiddleStatus>
      <CheerText>오예! 이제 도넛을 먹을 수 있어요!</CheerText>

      <BottomStatus>
        <LongButton
          handleGoToNext={handlepressup}
          btnBackColor={theme.grayScale.gray1}>
          와! 목표치에 도달했어요!
        </LongButton>
        <LongButton handleGoToNext={handlepressdown} btnBackColor={color}>
          test
        </LongButton>
      </BottomStatus>
    </Container>
  )
}

const MiddleBox = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`
const BlurgoalBox = styled.TouchableOpacity`
  height: 10%;
  width: 100%;
  align-items: center;
`
const Blurgoal = styled.Text`
  font-size: 52px;
  font-weight: 700;
  color: ${props => props.coachColorVar};
`
const ProgressGoal = styled(CircularProgress)`
  width: 2px;
  height: 2px;
`

const GoalBox = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const CharacterBox = styled.View`
  width: 120px;
  height: 192px;
`

const CharacetrImage = styled.Image`
  width: 120px;
  height: 192px;
`

const CheerText = styled.Text`
  font-size: 16px;
`

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
  color: ${theme.grayScale.black};
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
  padding-top: 30px;
  flex-direction: row;
`

export default HomeCompleted
