import { Layout } from "antd"
import styles from "./HeaderNav.module.css"
import { Logo } from "@/shared/ui/Logo"

const { Header } = Layout

function HeaderNav() {
  return (
    <Header className={styles.headerNav}>
      <Logo />
    </Header>
  )
}

export default HeaderNav