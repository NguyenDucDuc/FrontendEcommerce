import { AppstoreOutlined, DownOutlined, MailOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu, MenuProps, Space, Typography } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store/store";
import "./header.scss"



const Header = () => {
    
    const user = useSelector((state: RootState) => state.user.user)
    const items: MenuProps['items'] = [
        {
            label: (<Link to="/">Trang chủ</Link>),
            key: 'home',
            icon: <MailOutlined />,
        },
        {
            label: (<Link to="/login">Đăng nhập</Link>),
            key: 'login',
            icon: <AppstoreOutlined />
        },
        {
            label: `${user.firstName} ${user.lastName}`,
            key: 'username',
            icon: <UserOutlined />,
            children: [
                {
                    label: (<Link to="/">Đăng xuất</Link>),
                    key: 'logout'
                },
                {
                    label: "Đổi mật khẩu",
                    key: 'changePassword'
                }
            ]
        }
    ];
    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}

export default Header