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
  getItem(<Link to="/admin/home">Tổng quan</Link>, "home", <HomeOutlined />),

  getItem("Quản lý user", "user", <MailOutlined />, [
    getItem(<Link to="/admin/sellers">Quản lý khách hàng</Link>, "1"),
    getItem(<Link to="/admin/shops">Quản lý shop</Link>, "2"),
  ]),

  getItem("Quản lý sản phẩm", "product", <AppstoreOutlined />, []),

  getItem("Thống kê doanh thu", "stats", <BarChartOutlined />, [
    getItem(
      <Link to="stats?type=total_product">Thống kê theo sản phẩm</Link>,
      "3"
    ),
    getItem(<Link to="stats?type=frequency">Thống kê tần suất</Link>, "4"),
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
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
        theme="light"
      />
    </div>
  );
};

export default SideBar;
