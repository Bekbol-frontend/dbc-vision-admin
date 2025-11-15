import { Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "../../ProtectedRoute"
import { HomePageAsync } from "@/pages/HomePage"
import { UsersPageAsync } from "@/pages/UsersPage"
import { LoginPage } from "@/pages/LoginPage"
import { RootLayout } from "../../RootLayout"
import { routePages } from "@/shared/config/routeConfig"

function AppRouter() {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route element={<RootLayout />}>
                    <Route path={routePages.home} element={<HomePageAsync />} />
                    <Route path={routePages.users} element={<UsersPageAsync />} />
                </Route>
            </Route>
            <Route path={routePages.login} element={<LoginPage />} />
        </Routes>
    )
}

export default AppRouter