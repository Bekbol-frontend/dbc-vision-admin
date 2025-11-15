import { ConfigProvider } from "antd"
import type { ReactNode } from "react"

interface IProps {
    children: ReactNode
}

function AntdConfig({ children }: IProps) {
    return (
        <ConfigProvider theme={{
            token: {
                fontFamily: '"Roboto", sans-serif'
            },
            components: {
                Layout: {
                    headerBg: "var(--color-white)",
                    headerHeight: 90,
                    siderBg: "var(--color-white)",
                },
                Button: {
                    controlHeight: 35
                },
                Input: {
                    controlHeight: 35
                },
                Select: {
                    controlHeight: 35
                }
            }
        }}>
            {children}
        </ConfigProvider>
    )
}

export default AntdConfig