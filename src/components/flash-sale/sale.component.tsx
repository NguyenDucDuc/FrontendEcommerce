import { LeftOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";

import "./style.scss";
import { Product } from "../../models/models";
import { getAllProduct } from "../../utils/product";
import { formatCurrency } from "../../utils/common";
import { Link } from "react-router-dom";

const FlashSale: React.FC = () => {
  const [position, setPosition] = useState<number>(1);

  const [productData, setProductData] = useState<Array<Product>>([]);

  const fetchData = async () => {
    const res = await getAllProduct({
      order: "desc",
      sortBy: "unitOnOrder",
      pageSize: 20,
    });
    setProductData(res?.data.listProduct);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const clickCarouselArrow = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget.classList.contains("btn-next")) {
      setPosition((prev) => prev + 1);
    }
    if (event.currentTarget.classList.contains("btn-prev")) {
      setPosition((prev) => prev - 1);
    }
  };
  return (
    <section className="flash-sale-list section-simple">
      <div className="flash-sale__header flex section-simple__header">
        <div className="flash-sale__header-title section-simple__header-title">
          <div className="flash-sale__header-img">
            <img
              src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/fb1088de81e42c4e538967ec12cb5caa.png"
              alt="Ảnh flash sale"
            />
          </div>
          <div className="timer"></div>
        </div>
        <a href="/" className="flash-sale__header-link">
          Xem tất cả
        </a>
      </div>
      <div className="flash-sale__content">
        {position === 2 ? (
          <Button
            className="carousel-arrow btn-prev"
            type="primary"
            shape="circle"
            icon={<LeftOutlined />}
            onClick={clickCarouselArrow}
          />
        ) : (
          ""
        )}

        <div className="flash-sale-wrapper">
          <Row
            className={`flash-sale-container carousel carousel-${position}`}
            gutter={[16, 16]}
          >
            {productData.map((item) => (
              <Col className="flash-sale-item" span={4}>
                <Link to={`/product-detail/${item.id}`}>
                <div className="flash-sale-item__img">
                  <img src={item.image} alt="Ảnh sản phẩm" />
                </div>
                <div className="flash-sale-info flex">
                  <div className="price">
                    <span className="">
                      {formatCurrency(item.price as number)}
                    </span>
                  </div>
                  <div className="flash-sale-info__ordered">
                    <div className="icon"></div>
                    <div className="quantity">{`Đã bán ${item.unitOnOrder}`}</div>
                    <div className="bg-process"></div>
                    <div className="process"></div>
                  </div>
                </div>
                </Link>

              </Col>
            ))}
          </Row>
        </div>
        {position === 1 ? (
          <Button
            className="carousel-arrow btn-next"
            type="primary"
            shape="circle"
            icon={<RightOutlined />}
            onClick={clickCarouselArrow}
          />
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default FlashSale;
