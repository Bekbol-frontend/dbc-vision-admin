import { AntdMessageContext } from "@/app/provider/AntdMessageContext";
import { useContext } from "react";

export function useMessageApi() {
    return useContext(AntdMessageContext)
}