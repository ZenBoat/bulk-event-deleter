import React, {useState, useEffect} from 'react';
import {NavigationNativeContainer} from '@react-navigation/native';

import {ThemeProvider} from 'react-native-elements';
import Tabs from './src/containers/Tabs';
import Login from './src/screens/Login';
import {
  GoogleSignin,
  User,
  statusCodes,
} from '@react-native-community/google-signin';
import {UserContext, UserContextInterface} from './src/store/Context';
import {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [axiosInstance, setAxiosInstance] = useState<AxiosInstance | undefined>(
    undefined,
  );

  const emptyState = () => {
    AsyncStorage.removeItem('userLoggedIn');
    setUser(undefined);
    setToken(undefined);
    setAxiosInstance(undefined);
  };

  const fetchUserFromStorage = async () => {
    // TODO change to realmDb or encrypt storage?
    const userCredentialString = await AsyncStorage.getItem('userLoggedIn');
    if (userCredentialString) {
      try {
        const userInfo = await GoogleSignin.signInSilently();
        const {accessToken} = await GoogleSignin.getTokens();
        setToken(accessToken);
        setUser(userInfo);
      } catch (error) {
        console.log({error});
        setToken(undefined);
        setUser(undefined);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/calendar'],
      webClientId:
        '947382191204-hb3cgjut9fa55la0dkncen2ljnstombr.apps.googleusercontent.com',
      offlineAccess: true,
      iosClientId:
        '947382191204-g0dgrhs41lqrrgig7qq86j0umthnl1qe.apps.googleusercontent.com',
    });
    fetchUserFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const UserContextValue: UserContextInterface = {
    user,
    setUser,
    axiosInstance,
    setAxiosInstance,
    accessToken: token,
    emptyState,
  };

  return (
    <ThemeProvider>
      <NavigationNativeContainer>
        <UserContext.Provider value={UserContextValue}>
          {!loading && !user ? <Login /> : <Tabs />}
        </UserContext.Provider>
      </NavigationNativeContainer>
    </ThemeProvider>
  );
};

export default App;
