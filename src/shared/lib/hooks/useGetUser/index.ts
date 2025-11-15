import { useAppSelector } from "../useAppSelector";

export function useGetUser() {
    return useAppSelector(state => state.user.data)
}