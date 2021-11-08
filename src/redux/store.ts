import { combineReducers, configureStore } from "@reduxjs/toolkit";

import loadingReducer from "./reducers/loadingReducer";
import userReducer from "./reducers/userReducer";

const reducers = combineReducers({
    userReducer,
    loadingReducer
})

const store = configureStore({
    reducer: reducers
});

export type IptvReducerState
    = ReturnType<typeof store.getState>;

export default store;