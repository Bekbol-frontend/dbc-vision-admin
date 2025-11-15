import { Layout } from "antd"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import styles from "./RootLayout.module.css"
import { Sidebar } from "@/widgets/Sidebar"
import { HeaderNav } from "@/widgets/HeaderNav"

const { Content } = Layout

function RootLayout() {
    return (
        <Layout className={styles.layout}>
            <Sidebar />
            <Layout>
                <HeaderNav />
                <Content className={styles.content}>
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </Content>
            </Layout>
        </Layout>
    )
}

export default RootLayout