import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    admin: null,
};

const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.admin = action.payload.admin;
        },
        logout: state => {
            state.status = false;
            state.admin = null;
        },
    },
});

export const { login, logout } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
