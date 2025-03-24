import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    moderator: null,
};

const moderatorAuthSlice = createSlice({
    name: "moderatorAuth",
    initialState,
    reducers: {
        loginModerator: (state, action) => {
            state.status = true;
            state.moderator = action.payload.moderator;
        },
        logoutModerator: state => {
            state.status = false;
            state.moderator = null;
        },
    },
});

export const { loginModerator, logoutModerator } = moderatorAuthSlice.actions;

export default moderatorAuthSlice.reducer;
