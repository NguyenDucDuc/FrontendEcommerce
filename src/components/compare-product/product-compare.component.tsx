import React, { useEffect, useState } from 'react';
import './product-compare.style.scss';
import { Col, Image, Rate, Row, Table, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { formatCurrency, formatDateString } from '../../utils/common';
import { Link } from 'react-router-dom';
import { Response } from '../../models/http';
import { axiosClient } from '../../lib/axios/axios.config';
import { endpoint } from '../../configs/Api';

const ProductCompare = () => {
  const [p1, p2] = useSelector(
    (state: RootState) => state.productCompare.listProduct
  );

  console.log({ p1, p2 });

  const [productCompare, setProductCompare] = useState<any>();

  const fetchData = async () => {
    const res: Response = await axiosClient.post(endpoint.product.compare, {
      productId1: p1?.id,
      productId2: p2?.id,
    });

    setProductCompare(res.data);
  };

  console.log({ productCompare });

  useEffect(() => {
    fetchData();
  }, []);

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
          <Col span={11}>
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
                  <span className="home-product-item__price-old">
                    {p1?.priceDiscount !== undefined
                      ? formatCurrency(p1?.price as number)
                      : ''}
                    {/* {formatCurrency(product?.price as number)} */}
                  </span>
                  <span className="home-product-item__price-current">
                    {p1?.priceDiscount === undefined
                      ? formatCurrency(p1?.price as number)
                      : formatCurrency(p1?.priceDiscount as number)}
                    {/* {formatCurrency(product?.priceDiscount as number)} */}
                  </span>
                  {/* {formatCurrency(p1.price)} */}
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
              <Col
                span={24}
                style={{
                  textAlign: 'center',
                  margin: '10px 0',
                }}
              >
                <span style={{ fontSize: '20px' }}>Cửa hàng</span>
              </Col>
              <Col span={24} style={{ textAlign: 'center', marginBottom: 10 }}>
                <Image src={productCompare?.base?.shop?.image} />
              </Col>
              <Col span={24}>
                <span>
                  Tên cửa hàng:{' '}
                  <Link to={`/shop/${productCompare?.base?.shop?.id}`}>
                    {productCompare?.base?.shop?.shopName}
                  </Link>
                </span>
              </Col>
              <Col span={24}>
                <span>
                  Đánh giá:{' '}
                  <Rate
                    defaultValue={productCompare?.base?.shop.rate}
                    onChange={(values) => handleOnChangeRate(values)}
                  />
                </span>
                <span style={{ marginLeft: 10 }}>
                  {productCompare?.base?.shop.rate}
                </span>
              </Col>
              <Col span={24} style={{ marginBottom: 10 }}>
                <span>
                  Bắt đầu bán:{' '}
                  {formatDateString(
                    productCompare?.base?.shop.createdAt as string
                  )}
                </span>
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
        <Col span={2} style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{ backgroundColor: 'gray', width: '2px', height: '100%' }}
          ></div>
        </Col>
        {p2 && (
          <Col span={11}>
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
                  {p2?.priceDiscount !== undefined ? (
                    <span className="home-product-item__price-old">
                      {formatCurrency(p2?.price as number)}
                    </span>
                  ) : (
                    ''
                  )}

                  <span className="home-product-item__price-current">
                    {p2?.priceDiscount === undefined
                      ? formatCurrency(p2?.price as number)
                      : formatCurrency(p2?.priceDiscount as number)}
                  </span>
                  {/* {formatCurrency(p2.price)} */}
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
              <Col
                span={24}
                style={{
                  textAlign: 'center',
                  margin: '10px 0',
                }}
              >
                <span style={{ fontSize: '20px' }}>Cửa hàng</span>
              </Col>
              <Col span={24} style={{ textAlign: 'center', marginBottom: 10 }}>
                <Image src={productCompare?.compare?.shop?.image} />
              </Col>
              <Col span={24}>
                <span>
                  Tên cửa hàng:{' '}
                  <Link to={`/shop/${productCompare?.compare?.shop?.id}`}>
                    {productCompare?.compare?.shop?.shopName}
                  </Link>
                </span>
              </Col>
              <Col span={24}>
                <span>
                  Đánh giá:{' '}
                  <Rate
                    defaultValue={productCompare?.compare?.shop.rate}
                    onChange={(values) => handleOnChangeRate(values)}
                  />
                </span>
                <span style={{ marginLeft: 10 }}>
                  {productCompare?.compare?.shop.rate}
                </span>
              </Col>
              <Col span={24} style={{ marginBottom: 10 }}>
                <span>
                  Bắt đầu bán:{' '}
                  {formatDateString(productCompare?.compare?.shop.createdAt)}
                </span>
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
