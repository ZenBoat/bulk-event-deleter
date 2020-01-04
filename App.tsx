import React, {useState, useEffect} from 'react';
import {NavigationNativeContainer} from '@react-navigation/native';

import {ThemeProvider} from 'react-native-elements';
import Tabs from './src/containers/Tabs';
import Login from './src/screens/Login';
import {GoogleSignin, User} from '@react-native-community/google-signin';
import {UserContext, UserContextInterface} from './src/store/Context';
import {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [axiosInstance, setAxiosInstance] = useState<AxiosInstance | undefined>(
    undefined,
  );

  const fetchUserFromStorage = async () => {
    const userCredentialString = await AsyncStorage.getItem('userCredentials');
    if (userCredentialString) {
      setUser(JSON.parse(userCredentialString));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserFromStorage();
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/calendar'],
      webClientId:
        '947382191204-hb3cgjut9fa55la0dkncen2ljnstombr.apps.googleusercontent.com',
      offlineAccess: true,
      iosClientId:
        '947382191204-g0dgrhs41lqrrgig7qq86j0umthnl1qe.apps.googleusercontent.com',
    });
  }, []);

  const UserContextValue: UserContextInterface = {
    user,
    setUser,
    axiosInstance,
    setAxiosInstance,
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
