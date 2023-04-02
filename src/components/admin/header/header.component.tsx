import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Menu, MenuProps, notification, Row } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthAdminApi, endpoint } from "../../../configs/Api";
import { logoutAdmin } from "../../../store/slices/user-admin.slice";
import { RootState, useAppDispatch } from "../../../store/store";







const HeaderAdmin = () => {

  const [current, setCurrent] = useState('mail');
  const nav = useNavigate()
  const user = useSelector((state: RootState) => state.userAdmin.user)
  const dispatch = useAppDispatch()
  const [api, contextHolder] = notification.useNotification();
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  // setup header
  const items: MenuProps['items'] = [
    {
      label: `${user.firstName} ${user.lastName}`,
      key: 'username',
      icon: <UserOutlined />,
      style: {
        fontWeight: 'bold'
      }
    },
    user.userName ? {
      label: `Đăng xuất`,
      key: 'logout',
      icon: <SettingOutlined />,
      style: {
        fontWeight: 'bold'
      },
      onClick: () => {
        dispatch(logoutAdmin())
        api.success({
          message: `Thông báo`,
          description:
            'Đăng xuất thành công',
        });
        setTimeout(() => {
          nav("/admin/login")
        },600)
      }
    } : null
  ]

  const items2: MenuProps['items'] = [
    {
      label: (<h1>ADMIN MANAGER</h1>),
      key: 'title',
    }
  ]

  return (
    <div>
      {contextHolder}
      <Row>
        <Col span={18}>
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items2} />
        </Col>
        <Col span={6}>
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </Col>
      </Row>
    </div>
  )
}

export default HeaderAdmin