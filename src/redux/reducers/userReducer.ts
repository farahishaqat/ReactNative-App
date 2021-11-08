import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: <any>{}
};

const slice = createSlice({
    name: 'userReducer',
    initialState: initialState,
    reducers: {
        loginSuccess: (state = initialState, action) => {
            state.user = action.payload;
        }
    }
});

export default slice.reducer;
export const { loginSuccess } = slice.actions;