import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoggedIn: false
}

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload.user;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.user = null;
            state.isLoggedIn = false
        }
    }
})

export default authenticationSlice