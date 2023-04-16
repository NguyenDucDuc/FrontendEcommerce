import React, { useEffect, useState } from "react";

import { Col, Row } from "antd";

import "./style.scss";
import { axiosClient } from "../../lib/axios/axios.config";
import { endpoint } from "../../configs/Api";
import { Response } from "../../models/http";

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    const res: Response = await axiosClient.get(endpoint.category.getAll);
    setCategories(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section className="home-category-list section-simple">
      <div className="category__header flex section-simple__header ">
        <h4 className="category__header__title section-simple__header-title">
          Danh mục
        </h4>
      </div>
      <div className="category__content">
        <Row className="category-container" gutter={[8, 8]}>
          {categories.map((item: any) => (
            <Col className="category-item" span={3}>
              <div className="category-item__img">
                <img
                  src="https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn"
                  alt="image"
                />
              </div>
              <p className="category-item__name">{item.name}</p>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default CategoryList;
