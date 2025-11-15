import type { ReactNode } from "react"
import { AntdMessageContext } from "../config"
import { message } from "antd";

interface IProps {
    children: ReactNode
}

function AtndMessageContext({ children }: IProps) {
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <AntdMessageContext value={messageApi}>
            {contextHolder}
            {children}
        </AntdMessageContext>
    )
}

export default AtndMessageContext