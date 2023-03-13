import { RightOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React from 'react';
import Carousel from '../carousel/carousel.component';

import './brand-mall.style.scss';

const BrandMall: React.FC = () => {
  return (
    <section className=" section-simple">
      <div className="flex section-simple__header brand-mall__header underline">
        <div className="section-simple__header-title ">
          <div className="section-simple__header-title__container">
            <a className="link" href="/mall">
              Shopee Mall
            </a>
            <div className="logo-delivery">
              <div className="section-simple__header-title__img">
                <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/6c502a2641457578b0d5f5153b53dd5d.png" />
                7 ngày miễn phí trả hàng
              </div>
              <div className="section-simple__header-title__img">
                <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/511aca04cc3ba9234ab0e4fcf20768a2.png" />
                Hàng chính hãng 100%
              </div>
              <div className="section-simple__header-title__img">
                <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/16ead7e0a68c3cff9f32910e4be08122.png" />
                Miễn phí vận chuyển
              </div>
            </div>
          </div>
        </div>
        <a href="/" className="brand-mall__header-link flex">
          Xem tất cả
          <Button
            className="btn-show-all"
            size="small"
            type="primary"
            shape="circle"
            icon={<RightOutlined />}
          />
        </a>
      </div>
      <div className="brand-mall__content">
        <Row className="brand-mall-container">
          <Col span={8}>
            <Carousel />
          </Col>
          <Col span={4} className="brand-mall__content-right">
            <ul>
              <li className="image-carousel__item">
                <div className="ofs-carousel__item">
                  <a
                    className="ofs-carousel__shop-cover-image"
                    href="/unilever-hb"
                  >
                    <div className="ofs-carousel__cover-image">
                      <img
                        src="https://cf.shopee.vn/file/vn-50009109-e7fbf21fc692b89e7a7293f2099eadef_xhdpi"
                        alt="Ảnh hàng hiệu"
                      />
                    </div>
                  </a>
                  <div className="ofs-carousel__item__text">Mua là có quà</div>
                </div>

                <div className="ofs-carousel__item">
                  <a
                    className="ofs-carousel__shop-cover-image"
                    href="/unilever-hb"
                  >
                    <div className="ofs-carousel__cover-image">
                      <img
                        src="https://cf.shopee.vn/file/vn-50009109-e7fbf21fc692b89e7a7293f2099eadef_xhdpi"
                        alt="Ảnh hàng hiệu"
                      />
                    </div>
                  </a>
                  <div className="ofs-carousel__item__text">Mua là có quà</div>
                </div>
              </li>
            </ul>
          </Col>
          <Col span={4} className="brand-mall__content-right">
            <ul>
              <li className="image-carousel__item">
                <div className="ofs-carousel__item">
                  <a
                    className="ofs-carousel__shop-cover-image"
                    href="/unilever-hb"
                  >
                    <div className="ofs-carousel__cover-image">
                      <img
                        src="https://cf.shopee.vn/file/vn-50009109-e7fbf21fc692b89e7a7293f2099eadef_xhdpi"
                        alt="Ảnh hàng hiệu"
                      />
                    </div>
                  </a>
                  <div className="ofs-carousel__item__text">Mua là có quà</div>
                </div>

                <div className="ofs-carousel__item">
                  <a
                    className="ofs-carousel__shop-cover-image"
                    href="/unilever-hb"
                  >
                    <div className="ofs-carousel__cover-image">
                      <img
                        src="https://cf.shopee.vn/file/vn-50009109-e7fbf21fc692b89e7a7293f2099eadef_xhdpi"
                        alt="Ảnh hàng hiệu"
                      />
                    </div>
                  </a>
                  <div className="ofs-carousel__item__text">Mua là có quà</div>
                </div>
              </li>
            </ul>
          </Col>
          <Col span={4} className="brand-mall__content-right">
            <ul>
              <li className="image-carousel__item">
                <div className="ofs-carousel__item">
                  <a
                    className="ofs-carousel__shop-cover-image"
                    href="/unilever-hb"
                  >
                    <div className="ofs-carousel__cover-image">
                      <img
                        src="https://cf.shopee.vn/file/vn-50009109-e7fbf21fc692b89e7a7293f2099eadef_xhdpi"
                        alt="Ảnh hàng hiệu"
                      />
                    </div>
                  </a>
                  <div className="ofs-carousel__item__text">Mua là có quà</div>
                </div>

                <div className="ofs-carousel__item">
                  <a
                    className="ofs-carousel__shop-cover-image"
                    href="/unilever-hb"
                  >
                    <div className="ofs-carousel__cover-image">
                      <img
                        src="https://cf.shopee.vn/file/vn-50009109-e7fbf21fc692b89e7a7293f2099eadef_xhdpi"
                        alt="Ảnh hàng hiệu"
                      />
                    </div>
                  </a>
                  <div className="ofs-carousel__item__text">Mua là có quà</div>
                </div>
              </li>
            </ul>
          </Col>
          <Col span={4} className="brand-mall__content-right">
            <ul>
              <li className="image-carousel__item">
                <div className="ofs-carousel__item">
                  <a
                    className="ofs-carousel__shop-cover-image"
                    href="/unilever-hb"
                  >
                    <div className="ofs-carousel__cover-image">
                      <img
                        src="https://cf.shopee.vn/file/vn-50009109-e7fbf21fc692b89e7a7293f2099eadef_xhdpi"
                        alt="Ảnh hàng hiệu"
                      />
                    </div>
                  </a>
                  <div className="ofs-carousel__item__text">Mua là có quà</div>
                </div>

                <div className="ofs-carousel__item">
                  <a
                    className="ofs-carousel__shop-cover-image"
                    href="/unilever-hb"
                  >
                    <div className="ofs-carousel__cover-image">
                      <img
                        src="https://cf.shopee.vn/file/vn-50009109-e7fbf21fc692b89e7a7293f2099eadef_xhdpi"
                        alt="Ảnh hàng hiệu"
                      />
                    </div>
                  </a>
                  <div className="ofs-carousel__item__text">Mua là có quà</div>
                </div>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default BrandMall;
