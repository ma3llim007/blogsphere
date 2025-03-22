import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    admin: null,
};

const writerAuthSlice = createSlice({
    name: "writerAuth",
    initialState,
    reducers: {
        loginWriter: (state, action) => {
            state.status = true;
            state.writer = action.payload.writer;
        },
        logoutWriter: state => {
            state.status = false;
            state.writer = null;
        },
    },
});

export const { loginWriter, logoutWriter } = writerAuthSlice.actions;

export default writerAuthSlice.reducer;
