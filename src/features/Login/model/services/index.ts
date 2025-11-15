import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ILoginFormData } from "../types";
import type { IThunk } from "@/app/provider/StoreProvider";
import type { IUser } from "@/entities/User/model/types";
import { userActions } from "@/entities/User";
import type { AxiosError } from "axios";


export const fetchLogin = createAsyncThunk<void, ILoginFormData, IThunk<string>>("login/fetchLogin", async (data, { rejectWithValue, extra, dispatch }) => {
    try {
        const response = await extra.API.post<{data: IUser}>("users/login/", data)

        if(response.status !== 200) throw new Error()

        dispatch(userActions.setUser(response.data.data))
    } catch (error) {
        const err = error as AxiosError
        return rejectWithValue(err.message)
    }
})