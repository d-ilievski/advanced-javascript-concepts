import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";



interface UserState {
    name: string
}

const initialState: UserState = {
    name: ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state: UserState, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        logout: () => {
            return initialState;
        },
    }
})

export const { login, logout } = userSlice.actions;

export const reduxStore = configureStore({
    reducer: {
        user: userSlice.reducer,
    }
})