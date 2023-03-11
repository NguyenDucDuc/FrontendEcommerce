import React from 'react';

import { Col, Row } from 'antd';

import './style.scss';

const CategoryList: React.FC = () => {
  return (
    <section className="home-category-list section-simple">
      <div className="category__header flex section-simple__header ">
        <h4 className="category__header__title section-simple__header-title">Danh mục</h4>
      </div>
      <div className="category__content">
        <Row className="category-container" gutter={[8, 8]}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 3].map((item) => (
            <Col className="category-item" span={3}>
              <div className="category-item__img">
                <img
                  src="https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn"
                  alt="image"
                />
              </div>
              <p className="category-item__name">Tên loại</p>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default CategoryList;
