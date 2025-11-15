import { routePages } from "@/shared/config/routeConfig";
import { useGetUser } from "@/shared/lib/hooks/useGetUser";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const user = useGetUser()

    return user ? <Outlet /> : <Navigate to={routePages.login} replace />
}

export default ProtectedRoute