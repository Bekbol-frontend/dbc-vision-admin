import { routePages } from "@/shared/config/routeConfig"
import { Link } from "react-router-dom"
import styles from "./Logo.module.css"

function Logo() {
  return (
    <Link to={routePages.home} className={styles.logo}>
        dbc vision
    </Link>
  )
}

export default Logo