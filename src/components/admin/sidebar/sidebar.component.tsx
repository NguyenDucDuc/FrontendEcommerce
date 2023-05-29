import {
  AppstoreOutlined,
  BarChartOutlined,
  HomeOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem(<Link to="/admin/home">Tổng quan</Link>, "0", <HomeOutlined />),

  getItem("Quản lý người dùng", "user", <MailOutlined />, [
    getItem(<Link to="/admin/sellers">Quản lý khách hàng</Link>, "1"),
    getItem(<Link to="/admin/shops">Quản lý cửa hàng</Link>, "2"),
    getItem(<Link to="/admin/confirm-seller">Xác nhận đối tác</Link>, "3"),
  ]),

  getItem("Quản lý sản phẩm", "product", <AppstoreOutlined />, [
    getItem(<Link to="products">Tất cả sản phẩm</Link>, "4"),
  ]),

  getItem("Thống kê doanh thu", "stats", <BarChartOutlined />, [
    getItem(
      <Link to="stats?type=total_product">Thống kê theo sản phẩm</Link>,
      "5"
    ),
    getItem(<Link to="stats?type=frequency">Thống kê tần suất</Link>, "6"),
  ]),
];

const SideBar = () => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  return (
    <div>
      <Menu
        onClick={onClick}
        style={{ width: 300, marginTop: 50 }}
        defaultSelectedKeys={["0"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
        theme="light"
      />
    </div>
  );
};

export default SideBar;
