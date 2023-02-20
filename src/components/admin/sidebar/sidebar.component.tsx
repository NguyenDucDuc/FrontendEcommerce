import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd"
import { Link } from "react-router-dom";



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
  getItem('Quản lý user', 'user', <MailOutlined />, [
    getItem((<Link to="/admin/sellers">Quản lý khác hàng</Link>), '1'),
    getItem((<Link to="/admin/shops">Quản lý shop</Link>), '2'),
  ]),

  getItem('Quản lý sản phẩm', 'product', <AppstoreOutlined />, [
    getItem('Tổng quan', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),

  { type: 'divider' },

  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),

  getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
];



const SideBar = () => {
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
      };
    return (
        <div>
            <Menu
                onClick={onClick}
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
                theme="dark"
            />
        </div>
    )
}

export default SideBar