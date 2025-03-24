import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    state: false,
    moderator: null,
};

const moderatorAuthSlice = createSlice({
    name: "moderatorAuth",
    initialState,
    reducers: {
        loginModerator: (state, action) => {
            state.state = true;
            state.moderator = action.payload.moderator;
        },
        logoutModerator: state => {
            (state.state = false), (state.moderator = null);
        },
    },
});

export const { loginModerator, logoutModerator } = moderatorAuthSlice.actions;

export default moderatorAuthSlice.reducer;
