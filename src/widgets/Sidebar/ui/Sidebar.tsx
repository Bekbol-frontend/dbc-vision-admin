import { Layout, Menu, type MenuProps } from "antd"
import styles from "./Sidebar.module.css"
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { routePages } from "@/shared/config/routeConfig";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: routePages.home,
        label: 'Home',
        icon: <HomeOutlined />
    },
    {
        key: routePages.users,
        label: 'Users',
        icon: <UserOutlined />,
    }
];

function Sidebar() {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key)
    };

    return (
        <Sider collapsible width={260} className={styles.sidebar}>
            <div className={styles.menuWrapper}>
                <Menu
                    onClick={onClick}
                    mode="inline"
                    items={items}
                    selectedKeys={[pathname]}
                    className={styles.menu}
                />
            </div>
        </Sider>
    )
}

export default Sidebar