import { Col, Menu, MenuProps, Row, Tabs } from 'antd';
import './promotion.style.scss'
import MenuItem from 'antd/es/menu/MenuItem';
import { AppstoreOutlined, MailOutlined, SettingOutlined, TagOutlined } from '@ant-design/icons';
import { Link, Outlet, useParams } from 'react-router-dom';


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

export const Promotion = () => {
    const {shopId} = useParams()
    const items: MenuProps['items'] = [
        getItem('Phiếu giảm giá', 'promotion', <TagOutlined />, [
            getItem(<Link to={`/promotion/${shopId}/manager`}>Quản lý phiếu giảm giá</Link>, '5'),
            getItem(<Link to={`/promotion/${shopId}/create`}>Tạo phiếu giảm giá</Link>, '6'),
        ]),
    ];
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };
    return (
        <div className='promotion'>
            <Row>
                <Col span={5}>
                    <Menu
                        onClick={onClick}
                        style={{ width: 256 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        items={items}
                    />
                </Col>
                <Col span={19}>
                    <div className='promotion-right'>
                        <Outlet />
                    </div>
                </Col>
            </Row>
        </div>
    )
}