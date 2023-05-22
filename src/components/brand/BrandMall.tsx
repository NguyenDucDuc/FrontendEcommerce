import { RightOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React from "react";
import Carousel from "../carousel/carousel.component";

import "./brand-mall.style.scss";

const listBrand = [
  {
    img: "https://down-vn.img.susercontent.com/file/00413fcf230d45da42838f70129559e5_xhdpi",
    title: "Ưu đãi đến 40%",
  },
  {
    img: "https://down-vn.img.susercontent.com/file/ee98c39797a226f6528a154a36303104_xhdpi",
    title: "Siêu ưu đãi",
  },
  {
    img: "https://down-vn.img.susercontent.com/file/vn-50009109-4210b557322d28674213fc3861e04386_xhdpi",
    title: "Sale chào hè 50%",
  },
  {
    img: "https://down-vn.img.susercontent.com/file/vn-50009109-d7045d8c9499164a22660066866bde21_xhdpi",
    title: "Mua là có quà",
  },
  {
    img: "https://down-vn.img.susercontent.com/file/vn-50009109-48a9ecd44badf003581a0cdb2e569f57_xhdpi",
    title: "Mua 2 tặng 1",
  },
  {
    img: "https://down-vn.img.susercontent.com/file/ec8dc30ba0c5ba95f90021fe74ef076b_xhdpi",
    title: "Voucher đến 1 triệu",
  },
  {
    img: "https://down-vn.img.susercontent.com/file/be691f1a5b5a715c933e55f7fd2d7f0b_xhdpi",
    title: "Nhân đôi ưu đãi",
  },
  {
    img: "https://cf.shopee.vn/file/vn-50009109-e7fbf21fc692b89e7a7293f2099eadef_xhdpi",
    title: "Mua là có quà",
  },
];

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
                <img
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/6c502a2641457578b0d5f5153b53dd5d.png"
                  alt="Ảnh khuyến mãi"
                />
                7 ngày miễn phí trả hàng
              </div>
              <div className="section-simple__header-title__img">
                <img
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/511aca04cc3ba9234ab0e4fcf20768a2.png"
                  alt="Ảnh khuyến mãi"
                />
                Hàng chính hãng 100%
              </div>
              <div className="section-simple__header-title__img">
                <img
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/16ead7e0a68c3cff9f32910e4be08122.png"
                  alt="Ảnh khuyến mãi"
                />
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
                        src="https://down-vn.img.susercontent.com/file/00413fcf230d45da42838f70129559e5_xhdpi"
                        alt="Ảnh hàng hiệu"
                      />
                    </div>
                  </a>
                  <div className="ofs-carousel__item__text">Ưu đãi đến 40%</div>
                </div>

                <div className="ofs-carousel__item">
                  <a
                    className="ofs-carousel__shop-cover-image"
                    href="/unilever-hb"
                  >
                    <div className="ofs-carousel__cover-image">
                      <img
                        src="https://down-vn.img.susercontent.com/file/ee98c39797a226f6528a154a36303104_xhdpi"
                        alt="Ảnh hàng hiệu"
                      />
                    </div>
                  </a>
                  <div className="ofs-carousel__item__text">Siêu ưu đãi</div>
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
                        src="https://down-vn.img.susercontent.com/file/vn-50009109-4210b557322d28674213fc3861e04386_xhdpi"
                        alt="Ảnh hàng hiệu"
                      />
                    </div>
                  </a>
                  <div className="ofs-carousel__item__text">
                    Sale chào hè 50%
                  </div>
                </div>

                <div className="ofs-carousel__item">
                  <a
                    className="ofs-carousel__shop-cover-image"
                    href="/unilever-hb"
                  >
                    <div className="ofs-carousel__cover-image">
                      <img
                        src="https://down-vn.img.susercontent.com/file/vn-50009109-d7045d8c9499164a22660066866bde21_xhdpi"
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
                        src="https://down-vn.img.susercontent.com/file/vn-50009109-48a9ecd44badf003581a0cdb2e569f57_xhdpi"
                        alt="Ảnh hàng hiệu"
                      />
                    </div>
                  </a>
                  <div className="ofs-carousel__item__text">Mua 2 tặng 1</div>
                </div>

                <div className="ofs-carousel__item">
                  <a
                    className="ofs-carousel__shop-cover-image"
                    href="/unilever-hb"
                  >
                    <div className="ofs-carousel__cover-image">
                      <img
                        src="https://down-vn.img.susercontent.com/file/ec8dc30ba0c5ba95f90021fe74ef076b_xhdpi"
                        alt="Ảnh hàng hiệu"
                      />
                    </div>
                  </a>
                  <div className="ofs-carousel__item__text">
                    Voucher đến 1 triệu
                  </div>
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
                        src="https://down-vn.img.susercontent.com/file/be691f1a5b5a715c933e55f7fd2d7f0b_xhdpi"
                        alt="Ảnh hàng hiệu"
                      />
                    </div>
                  </a>
                  <div className="ofs-carousel__item__text">
                    Nhân đôi ưu đãi
                  </div>
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
                  <div className="ofs-carousel__item__text"> Mua là có quà</div>
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
