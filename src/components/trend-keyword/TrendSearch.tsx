import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './trend-search.style.scss';

const searchSample = [
  {
    label: 'Iphone',
    image:
      'https://res.cloudinary.com/de5pwc5fq/image/upload/v1686754418/ProductImage/ip14__0_oife0d.jpg',
  },
  {
    label: 'Sách kinh tế',
    image:
      'https://res.cloudinary.com/de5pwc5fq/image/upload/v1686844326/chientrangtinte__0_cmljbg.webp',
  },
  {
    label: 'Áo',
    image:
      'https://res.cloudinary.com/de5pwc5fq/image/upload/v1686754417/ProductImage/adidas__0_ljb4fy.jpg',
  },
  {
    label: 'Lens máy ảnh',
    image:
      'https://res.cloudinary.com/de5pwc5fq/image/upload/v1686754420/ProductImage/mayanh__0_h5bmkd.webp',
  },
  {
    label: 'Xe máy',
    image:
      'https://res.cloudinary.com/de5pwc5fq/image/upload/v1686754421/ProductImage/sh__0_nyzwmf.webp',
  },
  {
    label: 'Kinh doanh',
    image:
      'https://res.cloudinary.com/de5pwc5fq/image/upload/v1686760829/ProductImage/kinhdoanh__0_zpszdu.webp',
  },
  {
    label: 'Tư duy',
    image:
      'https://res.cloudinary.com/de5pwc5fq/image/upload/v1686760830/ProductImage/luathapdan_o2zgkp.webp',
  },
  {
    label: 'Đồng hồ rẻ',
    image:
      'https://res.cloudinary.com/de5pwc5fq/image/upload/v1686754418/ProductImage/dongho__0_lhrlk1.png',
  },
];

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
            {searchSample.map((item) => (
              <Col className="trend-search-item" span={4}>
                <Link
                  className="trend-search-item__link"
                  to={`/categories/1?kw=${item.label}`}
                >
                  <div className="container-item">
                    <div className="trend-tag"></div>
                    <div className="trend-image">
                      <img
                        src={item.image}
                        alt="Ảnh minh họa sản phẩm"
                      />
                    </div>
                    <div className="quantity-ordered">Bán 123+ / tháng</div>
                  </div>
                  <div className="keyword">{item.label}</div>
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
