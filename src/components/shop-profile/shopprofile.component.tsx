import './shopprofile.style.scss';
import '../style-commond/commond.style.scss';
import { Button, Col, Input, Menu, MenuProps, Pagination, Row } from 'antd';
import {
  AppstoreOutlined,
  CloseOutlined,
  MailOutlined,
  SendOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import CardProduct from '../card-product/card.component';

const ShopProfile = () => {
  // set up nav category
  const items: MenuProps['items'] = [
    {
      label: 'Tất cả sản phẩm',
      key: 'all',
      icon: <StarOutlined />,
    },
    {
      label: 'Quần áo',
      key: 'clothes',
      icon: <AppstoreOutlined />,
    },
    {
      label: 'Giày dép',
      key: 'footweart',
      icon: <AppstoreOutlined />,
    },
  ];
  const [current, setCurrent] = useState('all');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  //
  // sample
  const arr = [1, 2,3,4,5, 6, 7];
  //
  const [showChatBox, setShowChatBox] = useState<boolean>(false);
  const handleShowChatBox = () => {
    setShowChatBox(true);
  };
  const handleHideChatBox = () => {
    setShowChatBox(false);
  };
  const handleChangePageSize = (page: number, pageSize: number) => {
    console.log(page);
    console.log(pageSize);
  };
  return (
    <div className="shop-profile mgt-40">
      <Row align="middle">
        <Col span={8}>
          <div className="shop-profile-stats shop-profile-stats-left ">
            <Row align="middle">
              <Col span={7}>
                <div className="avt-shop mgl-10">
                  <img src="https://res.cloudinary.com/djbju13al/image/upload/v1676826995/Avatar/1676826993120.jpg" />
                </div>
              </Col>
              <Col span={17} style={{ marginTop: '20px' }}>
                <h3>Hades Studio</h3>
                <Button
                  className="btn-color txt-btn-color"
                  onClick={handleShowChatBox}
                >
                  Chat ngay
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={1}></Col>
        <Col span={15}>
          <div className="shop-profile-stats shop-profile-stats-right">
            <Row className="shop-stats">
              <Col span={12}>
                <h4>
                  Sản phẩm: <span className="txt-red">150</span>
                </h4>
                <h4>
                  Đang theo dõi: <span className="txt-red">2</span>
                </h4>
                <h4>
                  Ngày tham gia: <span className="txt-red">23-09-2022</span>
                </h4>
              </Col>
              <Col span={12}>
                <h4>
                  Số đánh giá: <span className="txt-red">420</span>
                </h4>
                <h4>
                  Tỷ lệ đánh giá: <span className="txt-red">4/5</span>
                </h4>
                <h4>
                  Số lượt thích: <span className="txt-red">1.290</span>
                </h4>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      {/* Chat box */}
      {showChatBox === true ? (
        <div className="message" style={{ zIndex: 10 }}>
          <Row className="mgt-10">
            <Col span={22}>
              <h4 className="mgl-40">Hades studio</h4>
            </Col>
            <Col span={2}>
              <CloseOutlined
                style={{ color: 'red', fontWeight: 'bold' }}
                className="cs-pointer"
                onClick={handleHideChatBox}
              />
            </Col>
          </Row>
          <div className="message-content"></div>
          <Row className="message-input">
            <Col span={17}>
              <Input type="text" />
            </Col>
            <Col span={1}></Col>
            <Col span={3}>
              <Button
                className="btn-color"
                style={{ color: 'white' }}
                icon={<SendOutlined />}
              >
                Gửi
              </Button>
            </Col>
          </Row>
        </div>
      ) : null}
      {/* Nav category */}
      <div className="shop-profile-nav nav-category">
        <Row className="mgt-40">
          <Col span={24}>
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={items}
            />
          </Col>
        </Row>
      </div>
      {/* Products */}
      <div className="shop-profile-products">
        <Row>
          {arr.map((item, idx) => (
            <Col span={4}>
              <CardProduct key={idx} />
            </Col>
          ))}
        </Row>
      </div>
      {/* Pagination */}
      <Row className="mgt-40">
        <Col span={9}></Col>
        <Col span={6}>
          <Pagination
            defaultCurrent={1}
            pageSize={12}
            total={50}
            onChange={handleChangePageSize}
          />
        </Col>
        <Col span={9}></Col>
      </Row>
    </div>
  );
};

export default ShopProfile;
