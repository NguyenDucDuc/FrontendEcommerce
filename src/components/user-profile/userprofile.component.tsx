import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Col, Menu, MenuProps, Row } from "antd"
import { Link, Outlet } from "react-router-dom";
import "./userprofile.style.scss"


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


const items: MenuProps['items'] = [
    getItem((<Link to="/user/profile">Hồ sơ</Link>), '1'),
    getItem((<Link to="/user/address">Địa chỉ</Link>), '2'),
    getItem((<Link to="/user/address-manager">Quản lý địa chỉ</Link>), '7'),
    getItem('Quản lý đơn hàng', 'order', <AppstoreOutlined />, [
        getItem((<Link to="orders">Tất cả</Link>), '3'),
        getItem((<Link to="orders?state=3">Đang giao hàng</Link>), '4'),
        getItem((<Link to="orders?state=4">Hoàn tất</Link>), '5'),
        getItem((<Link to="orders?state=0">Đã hủy</Link>), '6'),
        ]),
];


const UserProfile = () => {
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };
    return (
        <div className="user-account">
            <Row>
                <Col span={5}>
                    <Menu
                        onClick={onClick}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        items={items}
                    />
                </Col>
                <Col span={18}>
                    <Outlet />
                </Col>
            </Row>
        </div>
    )
}

export default UserProfile