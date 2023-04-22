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
  getItem('Quản lý sản phẩm', 'product', <MailOutlined />, [
    getItem((<Link to="products">Tất cả sản phẩm</Link>), '1'),
    getItem((<Link to="add-product">Thêm sản phẩm </Link>), '2'),
  ]),

  getItem('Quản lý đơn hàng', 'order', <AppstoreOutlined />, [
    getItem((<Link to="orders">Tất cả</Link>), '3'),
    getItem((<Link to="orders?state=3">Đang giao hàng</Link>), '4'),
    getItem((<Link to="orders?state=4">Hoàn tất</Link>), '5'),
    getItem((<Link to="orders?state=0">Đã hủy</Link>), '6'),
  ]),

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
                theme="light"
            />
        </div>
    )
}

export default SideBar