import PublicNavigator, {PrivateNavigation} from './navigation/routes';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContextProvidor from './context/authContext/authContextProvidor';
import {IptvReducerState} from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import ThemeContext from './context/themeContext';
import {loginSuccess} from './redux/reducers/userReducer';

const themesStyle = {
  light: {
    backGroundColor: '#ffffff',
  },
  black: {
    backGroundColor: 'black',
  },
};
const Layout = () => {
  const user = useSelector((state: IptvReducerState) => state.userReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async () => {
      await checkAuthState();
    };
  }, []);

  const checkAuthState = async () => {
    const token = await AsyncStorage.getItem('@token');
    if (token) {
      // update user
      console.log('Updating user with dispatch');
      // login success takes the payload which is the data provided by the user
      dispatch(
        loginSuccess({
          email: 'demo@demo.com',
          username: 'demouser',
        }),
      );
      // user = decode token
    }
  };

  return (
    <>
    <NavigationContainer>
      <AuthContextProvidor>
        <ThemeContext.Provider value={themesStyle.light}>
          {user && user.email ? <PrivateNavigation /> : <PublicNavigator />}
        </ThemeContext.Provider>
      </AuthContextProvidor>
    </NavigationContainer>
    </>
  );
};

export default Layout;
