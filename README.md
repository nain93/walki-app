## Getting started
yarn 

yarn이 설치되지 않았을 경우 -> npm install -g yarn

### Expo
expo start
폰에서 expo 설치후 QR코드 인식

#### expo 에뮬레이터 실행
![image](https://user-images.githubusercontent.com/73378472/128910402-63a7e85f-1d51-40a3-8761-fcc08bef55c5.png)

xcode(iOS) or Android studio 설치후 에뮬레이터 실행 후 Run on iOS simulator or Android 클릭

맥에서 xcode 실행 안될시
터미널에 sudo xcode-select -s /Applications/Xcode.app

Android studio 에뮬레이터 키는법
https://docs.expo.io/workflow/android-studio-emulator/

* usb로 핸드폰, 컴퓨터와 연결후 클릭해서 볼수도 있습니다
*  
Android device 연결법
https://medium.com/@psyanite/how-to-connect-expo-to-usb-android-device-16b83ff67428


### Native 실행
yarn start 이후 

#### iOS (맥에서만 가능)
npx pod install
yarn ios

#### Android
yarn android

이후 에뮬레이터나 usb 연결 후 테스트 할 수 있습니다



## 사용 라이브러리
styled-components
expo-app-loading
expo-font
expo-asset
react-native-appearance
@react-native-async-storage/async-storage
react-navigation/native
react-navigation/stack
@apollo/client graphql
react-native-web-swiper --save
@react-native-seoul/kakao-login
react-native-vector-icons
react-hook-form
@hookform/error-message

npx expo-optimize
