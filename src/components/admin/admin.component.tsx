import { AppstoreOutlined, ContainerOutlined, DesktopOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined } from "@ant-design/icons"
import { Button, Col, Menu, MenuProps, Row, Spin } from "antd"
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthAdminApi, endpoint } from "../../configs/Api";
import { updateUserAdmin } from "../../store/slices/user-admin.slice";
import { useAppDispatch } from "../../store/store";
import "./admin.style.scss"
import HeaderAdmin from "./header/header.component";
import SideBar from "./sidebar/sidebar.component";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Quản lý người dùng', '1', <PieChartOutlined />, [
        getItem(<Link to="sellers">Quản lý người bán</Link>, '5'),
        getItem('Quản lý người bán', '6'),
        getItem('Quản lý khách hàng', '7'),
    ]),
    getItem('Quản lý customer', '2', <DesktopOutlined />),
    getItem('Quản lý shop', '3', <ContainerOutlined />),

    getItem('Navigation One', 'sub1', <MailOutlined />, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Option 7', '7'),
        getItem('Option 8', '8'),
    ]),

    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),

        getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    ]),
]


const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const nav = useNavigate()
    const [show, setShow] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await AuthAdminApi().get(endpoint.user.roleAdmin)
                dispatch(updateUserAdmin(res.data.data))
            } catch (error: any) {
                console.log(error.response)
                if (error.response.status !== 200) {
                    nav("/admin/login")
                }
            }
            setShow(true)
        }
        checkLogin()
    }, [])

    if (show === false) {
        return (
            <Spin tip="Loading..." size="large">
                <div style={{ height: 500 }}>

                </div>
            </Spin>
        )
    }
    return (
        <div className="admin" style={{ width: '100%' }}>
            <Row>
                <Col span={4} >
                    <SideBar />
                </Col>
                <Col span={1}>

                </Col>
                <Col span={19}>
                    <HeaderAdmin />
                    <Outlet />
                </Col>
            </Row>
        </div>
    )
}

export default Admin