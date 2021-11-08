import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './authContext';
import React from 'react';
import {get} from 'immer/dist/internal';

const AuthContextProvidor = (props:any) => {
  const decodeToken = (token: string) => {
    //return decoded token
  };

  const getToken = async () => {
    const token = await AsyncStorage.getItem('@token');
    return token;
  };

  const getUserRole = () => {};

  return (
    <>
      <AuthContext.Provider
        value={{decodeToken, getToken, getUserRole}}>{props.children}</AuthContext.Provider>
    </>
  );
};

export default AuthContextProvidor;
