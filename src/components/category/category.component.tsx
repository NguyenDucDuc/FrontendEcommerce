import React, { useEffect, useState } from "react";

import { Col, Row } from "antd";

import "./style.scss";
import { axiosClient } from "../../lib/axios/axios.config";
import { endpoint } from "../../configs/Api";
import { Response } from "../../models/http";
import { Link } from "react-router-dom";

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
        <Link to={"categories/1"}>Xem tất cả</Link>
      </div>
      <div className="category__content">
        <Row className="category-container" gutter={[8, 8]}>
          {categories.map((item: any) => (
            <Col className="category-item" span={3}>
              <Link to={`/categories/${item.id}`}>
                <div className="category-item__img">
                  <img src={item.image} alt="Ảnh thể loại" />
                </div>
                <p className="category-item__name">{item.name}</p>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default CategoryList;
