import React from 'react';
import './style.scss';
import { Carousel, Row, Col } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
const style: React.CSSProperties = { padding: '0px 4px' };

const CarouselCustom: React.FC = () => {
  return (
    <div className="carousel__main">
      <div className="carousel carousel__main-inner">
        <Carousel autoplay>
          <div className="carousel__main-img">
            <img
              src="https://cf.shopee.vn/file/8da7a277ab0b311b9152070ac7e2c217_xxhdpi"
              alt=""
            />
          </div>
          <div className="carousel__main-img">
            <img
              src="https://cf.shopee.vn/file/cbd678911fdabb577ec97dcb7efd7141_xxhdpi"
              alt=""
            />
          </div>
          <div className="carousel__main-img">
            <img
              src="https://cf.shopee.vn/file/6da82e01627122bf22b8bcc014fc90af_xxhdpi"
              alt=""
            />
          </div>
          <div className="carousel__main-img">
            <img
              src="https://cf.shopee.vn/file/a2fbff9877089bcc52674d5a4215d9c7_xxhdpi"
              alt=""
            />
          </div>
        </Carousel>
      </div>

      <div className="carousel__main-controls">
        <i className="carosel-btn-left fa-solid fa-angle-left">
          <LeftOutlined />
        </i>
        <i className="carosel-btn-right fa-solid fa-angle-right">
          <RightOutlined />
        </i>
      </div>
    </div>
  );
};

export default CarouselCustom;
