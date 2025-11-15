import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser, IUserSchema } from "../types";
import { ACCESS_TOKEN_KEY_LOCAL_STORAGE, REFRESH_TOKEN_KEY_LOCAL_STORAGE, USER_KEY_LOCAL_STORAGE } from "@/shared/constants";

function getAccessToken() {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY_LOCAL_STORAGE)
    return token ? token : null
}

function getRefreshToken() {
    const token = localStorage.getItem(REFRESH_TOKEN_KEY_LOCAL_STORAGE)
    return token ? token : null
}

function getUser() {
    const user = localStorage.getItem(USER_KEY_LOCAL_STORAGE)
    return user ? JSON.parse(user) as IUser : null
}

const initialState: IUserSchema = {
    data: getUser(),
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken()
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, { payload }: PayloadAction<IUser>) {
            state.data = payload;
            state.accessToken = payload.access;
            state.refreshToken = payload.refresh;

            localStorage.setItem(USER_KEY_LOCAL_STORAGE, JSON.stringify(payload))
            localStorage.setItem(ACCESS_TOKEN_KEY_LOCAL_STORAGE, payload.access)
            localStorage.setItem(REFRESH_TOKEN_KEY_LOCAL_STORAGE, payload.refresh)
        }
    }
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice