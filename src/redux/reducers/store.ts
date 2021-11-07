import { TypeofTypeAnnotation } from '@babel/types';
import { combineReducers } from 'redux';
import {configureStore} from '@reduxjs/toolkit'
import loadingReducers from './loadingReducers'
import userReducer from './userReducer'

//more than one reducer
const reducers= combineReducers({
    userReducer,
    loadingReducers
})

const store = configureStore({
    reducer:userReducer
});


export type IptvReducerState= ReturnType <typeof store.getState>

export default store;
