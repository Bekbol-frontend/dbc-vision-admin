import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ILoginSchema } from "../types";
import { fetchLogin } from "../services";

const initialState: ILoginSchema = {
    loading: false,
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchLogin.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(fetchLogin.rejected, (state, { payload }: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = payload
            })
    }
})

export const { reducer: loginReducer } = loginSlice
export const { actions: loginActions } = loginSlice