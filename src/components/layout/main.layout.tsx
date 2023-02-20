import { AppstoreOutlined, DownOutlined, MailOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Dropdown, Menu, MenuProps, Row, Space, Typography } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { RootState } from "../../store/store";
import Header from "../header/header.component";
import "./main.style.scss"


const MainLayout = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const items: MenuProps['items'] = [
        {
            label: (<Link to="/home">Trang chủ</Link>),
            key: 'home',
            icon: <MailOutlined />,
        },
        {
            label: (<Link to="/login">Đăng nhập</Link>),
            key: 'login',
            icon: <AppstoreOutlined />
        },
        {
            label: (<Link to="/admin/home">Quản trị</Link>),
            key: 'admin',
            icon: <SettingOutlined />
        },
        {
            label: `${user.firstName} ${user.lastName === undefined ? "" : user.lastName}`,
            key: 'username',
            icon: <UserOutlined />,
            children: [
                {
                    label: "Đăng xuất",
                    key: 'logout',
                    onClick: () => {
                        localStorage.removeItem("accessToken")
                    }
                },
                {
                    label: "Đổi mật khẩu",
                    key: 'changePassword'
                }
            ]
        },
        {
            label: (<Link to="/register">Đăng ký</Link>),
            key: "register",
        },
        {
            label: (<Link to="/shop-create">Tạo shop</Link>),
            key: "shopCreate",
        }
    ];
    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };


    return (
        <div>
            <div className="header">
                <Header />
            </div>
            <Outlet />
        </div>
    )
}

export default MainLayout