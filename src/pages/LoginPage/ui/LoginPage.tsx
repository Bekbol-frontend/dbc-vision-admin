import { Login } from "@/features/Login"
import styles from "./LoginPage.module.css"
import { useGetUser } from "@/shared/lib/hooks/useGetUser"
import { Navigate } from "react-router-dom"
import { routePages } from "@/shared/config/routeConfig"

function LoginPage() {
  const user = useGetUser()

  if (user) {
    return <Navigate to={routePages.home} replace />
  }

  return (
    <div className={styles.login}>
      <Login />
    </div>
  )
}

export default LoginPage