import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../carousel/carousel.component';

import './banner.style.scss';

const style: React.CSSProperties = { padding: '0px 4px' };

const Banner = () => {
  return (
    <section className="app__banner">
      <div className="grid wide">
        <div className="row sm-gutter app__banner-content">
          <Row justify="center" align="top">
            <Col span={14} style={style}>
              <Carousel />
            </Col>
            <Col span={6}>
              <div className="row sm-gutter-tablet">
                <Link
                  to="/"
                  className="col l-12 m-6 full-home-banners__right-link"
                >
                  <div className="full-home-banners__right-img">
                    <img
                      src="https://cf.shopee.vn/file/7838079195aa34290179f39d1b496d69_xhdpi"
                      alt=""
                    />
                  </div>
                </Link>
                <Link
                  to="/"
                  className="col l-12 m-6 full-home-banners__right-link"
                >
                  <div className="full-home-banners__right-img">
                    <img
                      src="https://cf.shopee.vn/file/735586d941db9bb7dfe1afcde9179d15_xhdpi"
                      alt=""
                    />
                  </div>
                </Link>
              </div>
            </Col>
          </Row>
        </div>

        <ul className="app__banner-list">
          <li className="banner-list__item">
            <Link to="" className="banner-list__link">
              <div className="banner-list__img">
                <img
                  src="https://cf.shopee.vn/file/3820374516083447a858e6f303441170_xhdpi"
                  alt=""
                />
              </div>
              <span className="banner-list__title">Bảo vệ sức khỏe</span>
            </Link>
          </li>
          <li className="banner-list__item">
            <Link to="" className="banner-list__link">
              <div className="banner-list__img">
                <img
                  src="https://cf.shopee.vn/file/b3535d7e56c58c4ebe9a87672d38cc5e_xhdpi"
                  alt=""
                />
              </div>
              <span className="banner-list__title">
                Gì Cũng Rẻ - Mua Là Freeship
              </span>
            </Link>
          </li>
          <li className="banner-list__item">
            <Link to="" className="banner-list__link">
              <div className="banner-list__img">
                <img
                  src="https://cf.shopee.vn/file/46a2a2c810622f314d78455da5e5d926_xhdpi"
                  alt=""
                />
              </div>
              <span className="banner-list__title">Khung Giờ Săn Sale</span>
            </Link>
          </li>
          <li className="banner-list__item">
            <Link to="" className="banner-list__link">
              <div className="banner-list__img">
                <img
                  src="https://cf.shopee.vn/file/c7a2e1ae720f9704f92f72c9ef1a494a_xhdpi"
                  alt=""
                />
              </div>
              <span className="banner-list__title">Miễn Phí Vận Chuyển</span>
            </Link>
          </li>
          <li className="banner-list__item">
            <Link to="" className="banner-list__link">
              <div className="banner-list__img">
                <img
                  src="https://cf.shopee.vn/file/9da9a3acb5520d601f86a90434f455a5_xhdpi"
                  alt=""
                />
              </div>
              <span className="banner-list__title">
                Hoàn Xu 20% - Lên Đến 50K
              </span>
            </Link>
          </li>
          <li className="banner-list__item">
            <Link to="" className="banner-list__link">
              <div className="banner-list__img">
                <img
                  src="https://cf.shopee.vn/file/765ca66457ec08802f74c529f71a99b7_xhdpi"
                  alt=""
                />
              </div>
              <span className="banner-list__title">Hàng Hiệu -50%</span>
            </Link>
          </li>
          <li className="banner-list__item">
            <Link to="" className="banner-list__link">
              <div className="banner-list__img">
                <img
                  src="https://cf.shopee.vn/file/a08ab28962514a626195ef0415411585_xhdpi"
                  alt=""
                />
              </div>
              <span className="banner-list__title">Hàng Quốc Tế</span>
            </Link>
          </li>
          <li className="banner-list__item">
            <Link to="" className="banner-list__link">
              <div className="banner-list__img">
                <img
                  src="https://cf.shopee.vn/file/9df57ba80ca225e67c08a8a0d8cc7b85_xhdpi"
                  alt=""
                />
              </div>
              <span className="banner-list__title">Nạp Thẻ Dịch Vụ</span>
            </Link>
          </li>
          <li className="banner-list__item">
            <Link to="" className="banner-list__link">
              <div className="banner-list__img">
                <img
                  src="https://cf.shopee.vn/file/96385a65fa50800e096bb790fa5c1dba_xhdpi"
                  alt=""
                />
              </div>
              <span className="banner-list__title">Deal Sốc Từ 1K</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Banner;
