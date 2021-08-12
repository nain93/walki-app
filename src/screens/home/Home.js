import React, { useState, useEffect } from "react"
import { View, Text } from "react-native"
import styled from "styled-components"
import * as Location from "expo-location"
import axios from "axios"
import Loading from "../../components/Loading"

const Home = () => {
  const [state, setState] = useState([])
  const [cateState, setCateState] = useState([])
  const [ready, setReady] = useState(true)

  const [weather, setWeather] = useState({
    temp: 0,
    condition: "",
  })

  const [currentDate, setcurrentDate] = useState("")
  const [currentTime, setcurrentTime] = useState("")

  useEffect(() => {
    var date = new Date().getDate()
    var month = new Date().getMonth() + 1
    var year = new Date().getFullYear()
    var hours = new Date().getHours()
    var min = new Date().getMinutes()
    var sec = new Date().getSeconds()
    setcurrentDate(month + "월" + date + "일")
    setcurrentTime(hours + ":" + min)
    setTimeout(() => {
      setState()
      setCateState()
      getLocation()
      setReady(false)
    }, 1000)
  }, [])

  const getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync()
      const locationData = await Location.getCurrentPositionAsync()
      const latitude = locationData["coords"]["latitude"]
      const longitude = locationData["coords"]["longitude"]
      const API_KEY = "cfc258c75e1da2149c33daffd07a911d"
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
    <TopStatus>
      <CurrentTime>
        {currentDate}
        {"\n"}
        {currentTime}
      </CurrentTime>
      <CurrentWeather>날씨 :{weather.temp + weather.condition}</CurrentWeather>
    </TopStatus>
  )
}

const TopStatus = styled.View`
  width: 100%;
  align-items: center;
  padding: 15px 30px;
`
const CurrentTime = styled.Text`
  width: 100px;
  height: 40px;
`

const CurrentWeather = styled.Text`
  width: 100px;
  height: 40px;
`
export default Home
