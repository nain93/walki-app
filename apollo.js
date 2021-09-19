import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import Config from "react-native-config";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");
export const coachColorVar = makeVar({
  coach: "",
  color: {
    main: "",
    sub: "",
    report: "",
    character: {
      main: "",
      sub: "",
    },
    chart: {
      main: "",
      sub: "",
    },
    primary: {
      tap: "",
      disable: "",
    },
  },
});
export const userNameVar = makeVar({
  name: "",
  profileImage: "",
});
export const alertTimeVar = makeVar({
  ampm: "",
  hour: 0,
  minute: 0,
});

export const stepVar = makeVar({
  step: "",
});

const TOKEN = "token";

export const logUserIn = async (token) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  userNameVar({});
  tokenVar("");
};

export const ChallengeStart = stepVar({});

const httpLink = createHttpLink({
  uri: Config.BACKEND_URL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${tokenVar()}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
