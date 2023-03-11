import { LeftOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React, { useState } from 'react';

import './style.scss';

const FlashSale: React.FC = () => {
  const [position, setPosition] = useState<number>(1);
  const clickCarouselArrow = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget.classList.contains('btn-next'));

    if (event.currentTarget.classList.contains('btn-next')) {
      setPosition((prev) => prev + 1);
    }
    if (event.currentTarget.classList.contains('btn-prev')) {
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
          ''
        )}

        <div className="flash-sale-wrapper">
          <Row
            className={`flash-sale-container carousel carousel-${position}`}
            gutter={[16, 16]}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <Col className="flash-sale-item" span={4}>
                <div className="flash-sale-item__img">
                  <img
                    src="https://res.cloudinary.com/de5pwc5fq/image/upload/v1662622663/t4bbsxfc0hjjkepuh7ei.jpg"
                    alt="Ảnh sản phẩm"
                  />
                </div>
                <div className="flash-sale-info flex">
                  <div className="price">
                    <span className="">₫</span>282.000
                  </div>
                  <div className="flash-sale-info__ordered">
                  <div className="icon"></div>
                    <div className="quantity">Đã bán 38</div>
                    <div className="bg-process"></div>
                    <div className="process"></div>
                  </div>
                </div>
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
          ''
        )}
      </div>
    </section>
  );
};

export default FlashSale;
