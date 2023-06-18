import { EyeOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./shopinfo.style.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Shop } from "../../../models/models";
import { formatDateString } from "../../../utils/common";

interface IProps {
  handleShowChatBox: any;
  shop: Shop;
}

const ShopInfo: React.FC<IProps> = ({ handleShowChatBox, shop }) => {
  const {
    id,
    shopName,
    rate,
    totalPrice,
    desc,
    image,
    createdAt,
    updatedAt,
    isBlock,
    sellerId,
    amountProduct,
  } = shop;
  
  const nav = useNavigate();
  const handleOnChangeRate = (values: number) => {
    console.log(values);
  };
  return (
    <div className="shop-info">
      <Row className="mgl-25">
        <Col span={8}>
          <Row>
            <Col span={7}>
              <div className="avt-shop">
                <LazyLoadImage src="https://res.cloudinary.com/djbju13al/image/upload/v1676826995/Avatar/1676826993120.jpg" />
              </div>
            </Col>
            <Col span={17}>
              <p style={{ marginTop: "25px", fontWeight: "bold" }}>
                {shopName}
              </p>
              <Row className="mgt-20">
                <Col span={12}>
                  <Button
                    className="btn-color"
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleShowChatBox}
                  >
                    Nhắn tin
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    className="btn-color"
                    type="primary"
                    icon={<EyeOutlined />}
                    onClick={() => nav(`/shop/${id}`)}
                  >
                    Xem shop
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={2}></Col>
        <Col span={14}>
          <Row className="shop-info-stats">
            <Col span={8}>
              <h4>
                Điểm đánh giá: <span style={{ color: "red" }}>{rate}</span>
              </h4>
            </Col>
            <Col span={8}>
              <h4>
                Tỷ lệ phản hồi: <span style={{ color: "red" }}>40.5K</span>
              </h4>
            </Col>
            <Col span={8}>
              <h4>
                Ngày tham gia:{" "}
                <span style={{ color: "red" }}>
                  {formatDateString(createdAt as string)}
                </span>
              </h4>
            </Col>
            <Col span={8}>
              <h4>
                Số sản phẩm:{" "}
                <span style={{ color: "red" }}>{amountProduct}</span>
              </h4>
            </Col>
            <Col span={8}>
              <h4>
                Số lượt thích:<span style={{ color: "red" }}>40.5K</span>{" "}
              </h4>
            </Col>
            <Col span={8}>
              <h4>
                Người theo dõi: <span style={{ color: "red" }}>40.5K</span>
              </h4>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ShopInfo;
