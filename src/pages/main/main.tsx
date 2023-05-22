import React from "react";
import "./main.style.scss";
import { Col, Row } from "antd";
import ProductAll from "./product/product-all";
import SideBar from "./sidebar/sidebar";
const Main = () => {
  return (
    <section className="product__container-main">
      <Row gutter={8} style={{margin: 0}}>
        <Col span={4}>
          <SideBar />
        </Col>
        <Col span={20}>
          <ProductAll />
        </Col>
      </Row>
    </section>
  );
};

export default Main;
