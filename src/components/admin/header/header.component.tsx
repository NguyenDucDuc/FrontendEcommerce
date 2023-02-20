import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Menu, MenuProps, Row } from "antd";
import { useState } from "react";



const items: MenuProps['items'] = [
    {
      label: 'Nguyễn Đức Đức',
      key: 'username',
      icon: <UserOutlined />,
    }
  ]

  const items2: MenuProps['items'] = [
    {
      label: (<h1>ADMIN MANAGER</h1>),
      key: 'username',
     
    }
  ]



const HeaderAdmin = () => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
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