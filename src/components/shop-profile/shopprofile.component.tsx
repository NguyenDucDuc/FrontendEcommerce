import "./shopprofile.style.scss";
import "../style-commond/commond.style.scss";
import {
  Button,
  Col,
  Input,
  Menu,
  MenuProps,
  Pagination,
  Row,
  message,
} from "antd";
import {
  AppstoreOutlined,
  CloseOutlined,
  SendOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../../lib/axios/axios.config";
import { endpoint } from "../../configs/Api";
import { Params, Response } from "../../models/http";
import ProductList from "../product-list/product-list";
import { useSelector } from "react-redux";

interface ProductDataSearch {
  listProduct: any;
  amountPage: number;
  amountProduct: number;
}

const items: MenuProps["items"] = [
  {
    label: "Tất cả sản phẩm",
    key: "all",
    icon: <StarOutlined />,
  },
  {
    label: "Quần áo",
    key: "clothes",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Giày dép",
    key: "footweart",
    icon: <AppstoreOutlined />,
  },
];
const ShopProfile = () => {
  const { shopId } = useParams();
  const [params, setParams] = useState<Params>({ shopId: shopId });
  const [current, setCurrent] = useState("all");
  const [showChatBox, setShowChatBox] = useState<boolean>(false);
  const [isShowOwner, setIsShowOwner] = useState<boolean>(false);
  const currentUser = useSelector((state: any) => state.user.user);
  const [resProducts, setResProducts] = useState<ProductDataSearch>({
    listProduct: [],
    amountPage: 0,
    amountProduct: 0,
  });
  const navigate = useNavigate();
  const location = useLocation();

  const getProductByShopId = async (params: Params) => {
    try {
      const res: Response = await axiosClient.get(endpoint.product.search, {
        params: params,
      });
      setResProducts(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      message.error("Đã có lỗi xảy ra !!");
    }
  };

  const getUserIdByShopId = async (shopId: number) => {
    try {
      const res: Response = await axiosClient.get(
        endpoint.shop.getUserByShopID(shopId)
      );
      setIsShowOwner(res.data === currentUser.id);
    } catch (error) {
      console.log(error);
      message.error("Đã có lỗi xảy ra !!");
    }
  };

  useEffect(() => {
    console.log("useEffect Shop Profile");
    getProductByShopId(params);
  }, [params]);

  useEffect(() => {
    getUserIdByShopId(Number(shopId));
  }, [shopId, currentUser.id]);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const handleShowChatBox = () => {
    setShowChatBox(true);
  };
  const handleHideChatBox = () => {
    setShowChatBox(false);
  };
  const handleChange = (page: number, pageSize?: number) => {
    setParams({ ...params, page: page });
  };
  return (
    <div className="shop-profile mgt-40">
      <Row align="middle">
        <Col span={8}>
          <div className="shop-profile-stats shop-profile-stats-left ">
            <Row align="middle">
              <Col span={7}>
                <div className="avt-shop mgl-10">
                  <img src="https://res.cloudinary.com/djbju13al/image/upload/v1676826995/Avatar/1676826993120.jpg" />
                </div>
              </Col>
              <Col span={17} style={{ marginTop: "20px" }}>
                <h3>Hades Studio</h3>
                <Button
                  style={{marginRight: '10px'}}
                  className="btn-color txt-btn-color"
                  onClick={handleShowChatBox}
                >
                  Chat ngay
                </Button>
                {isShowOwner && <Button onClick={() => navigate(`${location.pathname}/dashboard`)}>Quản lý</Button>}
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={1}></Col>
        <Col span={15}>
          <div className="shop-profile-stats shop-profile-stats-right">
            <Row className="shop-stats">
              <Col span={12}>
                <h4>
                  Sản phẩm: <span className="txt-red">150</span>
                </h4>
                <h4>
                  Đang theo dõi: <span className="txt-red">2</span>
                </h4>
                <h4>
                  Ngày tham gia: <span className="txt-red">23-09-2022</span>
                </h4>
              </Col>
              <Col span={12}>
                <h4>
                  Số đánh giá: <span className="txt-red">420</span>
                </h4>
                <h4>
                  Tỷ lệ đánh giá: <span className="txt-red">4/5</span>
                </h4>
                <h4>
                  Số lượt thích: <span className="txt-red">1.290</span>
                </h4>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* Chat box */}

      {showChatBox === true ? (
        <div className="message" style={{ zIndex: 10 }}>
          <Row className="mgt-10">
            <Col span={22}>
              <h4 className="mgl-40">Hades studio</h4>
            </Col>
            <Col span={2}>
              <CloseOutlined
                style={{ color: "red", fontWeight: "bold" }}
                className="cs-pointer"
                onClick={handleHideChatBox}
              />
            </Col>
          </Row>
          <div className="message-content"></div>
          <Row className="message-input">
            <Col span={17}>
              <Input type="text" />
            </Col>
            <Col span={1}></Col>
            <Col span={3}>
              <Button
                className="btn-color"
                style={{ color: "white" }}
                icon={<SendOutlined />}
              >
                Gửi
              </Button>
            </Col>
          </Row>
        </div>
      ) : null}
      {/* Nav category */}
      <div className="shop-profile-nav nav-category">
        <Row className="mgt-40">
          <Col span={24}>
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={items}
            />
          </Col>
        </Row>
      </div>

      {/* Products */}

      <ProductList productList={resProducts.listProduct} />

      {/* Pagination */}
      <Row className="mgt-40">
        <Col span={9}></Col>
        <Col span={6}>
          <Pagination
            defaultCurrent={1}
            pageSize={2}
            total={resProducts.amountProduct}
            onChange={handleChange}
          />
        </Col>
        <Col span={9}></Col>
      </Row>
    </div>
  );
};

export default ShopProfile;
