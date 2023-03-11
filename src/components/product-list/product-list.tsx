import { Col, Row } from 'antd';
import React from 'react';

import { Product } from '../../models/models';
import CardProduct from '../card-product/card.component';
interface Props {
  productList: Array<Product>;
}

const ProductList: React.FC<Props> = ({ productList }) => {
  return (
    <>
      <Row gutter={[8, 8]}>
        {productList.map((product, id) => {
          return (
            <Col span={4}>
              <CardProduct key={id} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default ProductList;
