import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './trend-search.style.scss';

const TrendSearch: React.FC = () => {
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
    <section className="trend-search-list section-simple">
      <div className="flex section-simple__header ">
        <h4 className=" section-simple__header-title">tìm kiếm hàng đầu</h4>
      </div>
      <div className="trend-search__content">
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

        <div className="trend-search-wrapper">
          <Row
            className={`trend-search-container carousel carousel-${position}`}
            gutter={[16, 16]}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <Col className="trend-search-item" span={4}>
                <Link
                  className="trend-search-item__link"
                  to="/top_products?catId=VN_BITL0_1467%3Atop_sold"
                >
                  <div className="container-item">
                    <div className="trend-tag"></div>
                    <div className="trend-image">
                      <img
                        src="https://cf.shopee.vn/file/b746397953b962663a74567a7ed20da5"
                        alt="Ảnh minh họa sản phẩm"
                      />
                    </div>
                    <div className="quantity-ordered">Bán 2k+ / tháng</div>
                  </div>
                  <div className="keyword">Rong Biển Cơm</div>
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
          ''
        )}
      </div>
    </section>
  );
};
export default TrendSearch;
