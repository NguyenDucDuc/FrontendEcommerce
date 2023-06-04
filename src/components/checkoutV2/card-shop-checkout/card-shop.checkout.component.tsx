import React from 'react';
import './card-shop.style.scss';
import CardProductCheckout from '../card-product-checkout/card-product-checkout.component';
import { Col, Divider, Input, Row } from 'antd';
import { formatCurrency } from '../../../utils/common';
import { FEE_SHIP } from '../../../constants/order';

interface IProps {
  shopId: number;
  products: any[];
}

const CardShopCheckout: React.FC<IProps> = ({ shopId, products }) => {
  const totalPriceShop = products.reduce((acc, product) => {
    acc += Number(product.quantity * Number(product.price));
    return acc;
  }, 0);

  return (
    <div className="card__shop-container">
      <h4 className="name">{products[0].shopName}</h4>
      <Divider style={{ margin: '0', backgroundColor: '#e6e6e6' }} />
      {products.length > 0 &&
        products.map((product: any) => {
          return (
            <CardProductCheckout
              shopName={product.shopName}
              name={product.name}
              key={product.id}
              desc={product.desc}
              image={product.image}
              id={product.id}
              quantity={product.quantity}
              unitPrice={product.price}
            />
          );
        })}
      <Row align="middle" justify="space-between">
        <Col span={8}>
          <Input
            type="text"
            size="large"
            placeholder="Lời nhắn cho shop"
            style={{ border: '1.5px solid #a6a6a6' }}
          />
        </Col>
        <Col span={11} style={{marginRight: '50px'}}>
          <Row>
            <Col span={8}>
              <p className="">Đơn vị vận chuyển</p>
            </Col>
            <Col span={8}>
              <h4 className="">GHN.VN Giao Hàng Nhanh</h4>
            </Col>
            <Col span={8}>
              <p className="">
                Phí vận chuyển:{' '}
                <span style={{ color: 'red', fontWeight: 'bold' }}>
                  {formatCurrency(FEE_SHIP.NGOAI_THANH)}
                </span>
              </p>
            </Col>
          </Row>
          <Row justify={'end'} style={{ marginTop: 10 }}>
            <Col
              style={{
                marginRight: 16,
              }}
            >
              <h4>
                Tổng tiền:{' '}
                <span style={{ fontSize: '18px', color: 'red' }}>
                  {formatCurrency(totalPriceShop + 40000)}
                </span>
              </h4>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider style={{ backgroundColor: '#dbdada' }} />
    </div>
  );
};

export default CardShopCheckout;
