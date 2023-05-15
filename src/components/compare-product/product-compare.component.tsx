import React from 'react';
import './product-compare.style.scss';
import { Col, Image, Rate, Row, Table, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { formatCurrency } from '../../utils/common';

const ProductCompare = () => {
  const [p1, p2] = useSelector(
    (state: RootState) => state.productCompare.listProduct
  );
  const handleOnChangeRate = (values: number) => {
    console.log(values);
  };
  const columns = [
    {
      title: 'Thông số',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá trị',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const renderProduct = () => {
    return (
      <>
        {p1 && (
          <Col span={12}>
            <Row>
              <Col style={{ textAlign: 'center' }} span={24}>
                <Image
                  width={500}
                  height={500}
                  alt="Ảnh sản phẩm"
                  src={p1.image}
                />
              </Col>
              <Col span={24}>
                <Typography.Text
                  style={{ textTransform: 'capitalize', fontSize: 20 }}
                >
                  {p1.name}
                </Typography.Text>
              </Col>
              <Col span={24}>
                <Typography.Text
                  className="price"
                  style={{ textTransform: 'capitalize' }}
                >
                  {formatCurrency(p1.price)}
                </Typography.Text>
              </Col>
              <Col span={24}>
                <span>
                  <Rate
                    defaultValue={p1.rate}
                    onChange={(values) => handleOnChangeRate(values)}
                  />
                </span>
                <span style={{ marginLeft: 10 }}>{p1.rate}</span>
              </Col>
              <Col span={24}>
                <span>Số lượng tồn kho: {p1.unitInStock}</span>
              </Col>
              <Col span={24}>
                <span>Số lượng đã bán: {p1.unitOnOrder}</span>
              </Col>
              <Col span={24}>
                <span>Mô tả: {p1.desc}</span>
              </Col>
              <Col span={24}>
                <Table
                  dataSource={p1.attributes}
                  columns={columns}
                  pagination={false}
                />
              </Col>
            </Row>
          </Col>
        )}
        {p2 && (
          <Col span={12}>
            <Row>
              <Col style={{ textAlign: 'center' }} span={24}>
                <Image
                  width={500}
                  height={500}
                  alt="Ảnh sản phẩm"
                  src={p2.image}
                />
              </Col>
              <Col span={24}>
                <Typography.Text
                  style={{ textTransform: 'capitalize', fontSize: 20 }}
                >
                  {p2.name}
                </Typography.Text>
              </Col>
              <Col span={24}>
                <Typography.Text
                  className="price"
                  style={{ textTransform: 'capitalize' }}
                >
                  {formatCurrency(p2.price)}
                </Typography.Text>
              </Col>
              <Col span={24}>
                <span>
                  <Rate
                    defaultValue={p2.rate}
                    onChange={(values) => handleOnChangeRate(values)}
                  />
                </span>
                <span style={{ marginLeft: 10 }}>{p2.rate}</span>
              </Col>
              <Col span={24}>
                <span>Số lượng tồn kho: {p2.unitInStock}</span>
              </Col>
              <Col span={24}>
                <span>Số lượng đã bán: {p2.unitOnOrder}</span>
              </Col>
              <Col span={24}>
                <span>Mô tả: {p2.desc}</span>
              </Col>
              <Col span={24}>
                <Table
                  dataSource={p2.attributes}
                  columns={columns}
                  pagination={false}
                />
              </Col>
            </Row>
          </Col>
        )}
      </>
    );
  };

  return (
    <>
      <section className="container__product-compare-main">
        <Typography.Title style={{ textAlign: 'center' }}>
          So sánh sản phẩm
        </Typography.Title>
        <Row gutter={16}>{renderProduct()}</Row>
      </section>
    </>
  );
};

export default ProductCompare;
