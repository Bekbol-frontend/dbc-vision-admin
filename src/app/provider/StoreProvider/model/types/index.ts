import type { AxiosInstance } from "axios"


interface IExtra {
    API: AxiosInstance
}

export interface IThunk<T> {
    extra: IExtra
    rejectValue: T
}