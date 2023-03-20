import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Menu, MenuProps, Row } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthAdminApi, endpoint } from "../../../configs/Api";
import { RootState } from "../../../store/store";







const HeaderAdmin = () => {

  const [current, setCurrent] = useState('mail');
  const nav = useNavigate()
  const user = useSelector((state: RootState) => state.userAdmin.user)
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
    }
  ]

  const items2: MenuProps['items'] = [
    {
      label: (<h1>ADMIN MANAGER</h1>),
      key: 'username',

    }
  ]

  return (
    <div>
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