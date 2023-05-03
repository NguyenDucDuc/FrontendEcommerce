import React, { useEffect, useState } from "react";
import "./product-all.style.scss";
import ProductList from "../../../components/product-list/product-list";
import { Params, Response } from "../../../models/http";
import { endpoint } from "../../../configs/Api";
import { axiosClient } from "../../../lib/axios/axios.config";
import {
  Col,
  Pagination,
  PaginationProps,
  Radio,
  Row,
  Select,
  message,
} from "antd";
import { ProductDataSearch } from "../../../components/shop-profile/shopprofile.component";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const ProductAll = () => {
  const { cateId } = useParams();
  const [searchParams] = useSearchParams();
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    cateId: Number(cateId),
  });
  const [arrowUp, setArrowUp] = useState(false);
  const [resProducts, setResProducts] = useState<ProductDataSearch>({
    listProduct: [],
    amountPage: 0,
    amountProduct: 0,
  });
  const location = useLocation();

  const getProduct = async (params: Params) => {
    try {
      const res: Response = await axiosClient.get(endpoint.product.search, {
        params: params,
      });
      setResProducts(res.data);
    } catch (error) {
      console.log(error);
      message.error("Đã có lỗi xảy ra !!");
    }
  };
  const handleChange = (page: number, pageSize?: number) => {
    
    setParams({ ...params, page: page, pageSize: pageSize });
  };

  useEffect(() => {
    console.log({ paramchange: params });

    getProduct(params as Params);
  }, [params]);

  useEffect(() => {
    setParams({ ...params, cateId: Number(cateId), page: 1 });
  }, [cateId]);

  useEffect(() => {
    const fP = searchParams.get("fP");
    const tP = searchParams.get("tP");
    const rate = searchParams.get("rate");
    const kw = searchParams.get('kw')
    setParams({
      ...params,
      page: 1,
      cateId: Number(cateId),
      name: kw || '',
      fP: fP as string,
      tP: tP as string,
      rate: Number(rate),
    });
  }, [location]);

  return (
    <section>
      <Row
        align={"middle"}
        justify={"start"}
        style={{ padding: "10px 0", background: "#ededed" }}
      >
        <Col style={{ margin: "0 10px" }}>Sắp xếp theo: </Col>
        <Radio.Group style={{ display: "flex" }} defaultValue={1}>
          <Col style={{ marginRight: "10px" }}>
            <Radio.Button
              value={1}
              onClick={() =>
                setParams((pre) => {
                  return { ...pre, sortBy: "id", order: "desc" };
                })
              }
            >
              Mới nhất
            </Radio.Button>
          </Col>
          <Col style={{ marginRight: "10px" }}>
            <Radio.Button
              value={2}
              onClick={() =>
                setParams((pre) => {
                  return { ...pre, sortBy: "unitInStock", order: "desc" };
                })
              }
            >
              Phổ biến
            </Radio.Button>
          </Col>
          <Col style={{ marginRight: "10px" }}>
            <Radio.Button
              value={3}
              onClick={() =>
                setParams((pre) => {
                  return { ...pre, sortBy: "unitOnOrder", order: "desc" };
                })
              }
            >
              Bán chạy
            </Radio.Button>
          </Col>
          <Col style={{ marginRight: "10px" }}>
            <Radio.Button
              value={4}
              onClick={() => {
                setParams((pre) => {
                  return {
                    ...pre,
                    sortBy: "price",
                    order: `${arrowUp ? "desc" : "asc"}`,
                  };
                });
                setArrowUp(!arrowUp);
              }}
            >
              Giá {arrowUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            </Radio.Button>
          </Col>
        </Radio.Group>
      </Row>
      {resProducts.listProduct.length !== 0 ? (
        <ProductList productList={resProducts.listProduct} />
      ) : (
        <Row>
          <Col style={{ textAlign: "center" }} span={24}>
            <h2>Không có sản phẩm</h2>
          </Col>
        </Row>
      )}

      <Row justify={"center"} className="mgt-40">
        <Col span={24}>
          {resProducts.listProduct.length !== 0 ? (
            <Pagination
              defaultCurrent={params.page}
              total={resProducts.amountProduct}
              onChange={handleChange}
              pageSize={params.pageSize}
              showSizeChanger
              pageSizeOptions={[5, 10, 15, 20]}
            />
          ) : (
            ""
          )}
        </Col>
      </Row>
    </section>
  );
};

export default ProductAll;
