import {
  CloseOutlined,
  EyeOutlined,
  HeartOutlined,
  MessageOutlined,
  SendOutlined,
  ShoppingCartOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Input,
  InputNumber,
  Rate,
  Row,
  Skeleton,
  Space,
  Spin,
} from "antd";
import "./productdetail.style.scss";
import "../style-commond/commond.style.scss";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductMain from "./product-main/productmain.component";
import ShopInfo from "./shop-info/shopinfo.component";
import ProductDesc from "./product-desc/productdesc.component";
import ProductAttribute from "./product-attribute/productattribute.component";
import ProductRate from "./product-rate/productrate.component";
import Api, { endpoint } from "../../configs/Api";
import { RootState, useAppDispatch } from "../../store/store";
import { getAllReviewAsyncThunk } from "../../store/slices/reviews.slice";
import LazyLoad from "react-lazy-load";
import { MessageSender } from "../message/message.component";
import { MessageReceiver } from "../message/message-receiver.component";
import {
  addMessageRedux,
  createMessageAsynkThunk,
  getAllMessageAsyncThunk,
} from "../../store/slices/message.slice";
import { useSelector } from "react-redux";
import { currentUserAsyncThunk } from "../../store/slices/user.slice";
import { socket } from "../../App";
import { Product, Shop } from "../../models/models";
import { axiosClient } from "../../lib/axios/axios.config";

const attributeDemo = {
  Category: "Áo thun",
  Color: "Đen",
  Weight: "250gsm",
  Height: "75cm",
  Quantity: 90,
};

interface IShopOwner {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
}

interface IProductDetail {
  id: number;
  desc: string;
  sku?: string;
  price: number;
  rate?: number;
  name: string;
  image: string;
  shopId: number;
}

const ProductDetail: React.FC = () => {
  //lazy load
  const [showProductAttribute, setShowProductAttribute] =
    useState<boolean>(false);
  const [showProductDesc, setShowProductDesc] = useState<boolean>(false);
  const [showProductRate, setShowProductRate] = useState<boolean>(false);
  //
  const [contentMessage, setContentMessage] = useState<string>("");
  const messageRef: any = useRef(null);
  const [showChatBox, setShowChatBox] = useState<boolean>(false);
  const [attributes, setAttributes] = useState<any>([]);
  const [shop, setShop] = useState<Shop>();
  const [loading, setLoading] = useState<boolean>(true);
  const [shopOwner, setShopOwner] = useState<IShopOwner>();
  const listMessage = useSelector(
    (state: RootState) => state.message.listMessage
  );
  const currentUser = useSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<Product>({});
  const { productId } = useParams();
  const [imageList, setImageList] = useState([]);
  const nav = useNavigate();
  const handleOnChangeRate = (values: number) => {};
  const handleChangeShowChatBox = () => {
    setShowChatBox(true);
  };
  const handleChangeHideChatBox = () => {
    setShowChatBox(false);
  };
  const handleSendMessage = async () => {};
  const scrollToBottom = () => {
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const fetchImage = async (productId: string) => {
    try {
      const imageList = await axiosClient.get(
        endpoint.product.getImages(productId)
      );
      setImageList(imageList.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getShopOwner = async () => {
    if (productId !== undefined) {
      const res = await Api.get(endpoint.user.getShopOwner(+productId));
      setShopOwner(res.data.data);
    }
  };

  const getProductDetail = async () => {
    const res = await axiosClient.get(
      endpoint.product.productDetail(productId as string)
    );
    const resShop = await axiosClient.get(
      endpoint.shop.getDetail(res.data.shopId)
    );
    console.log({ res, resShop });

    setShop(resShop.data);
    setProduct(res.data);
    setAttributes(res.data.attributes);
  };

  const getListReviews = async () => {
    const body = {
      productId: productId,
      page: 1,
    };
    dispatch(getAllReviewAsyncThunk(body));
  };
  const getCurrentUser = () => {
    dispatch(currentUserAsyncThunk());
  };

  useEffect(() => {
    getShopOwner();
    getCurrentUser();
    getProductDetail();
    getListReviews();
    fetchImage(productId as string);
    setLoading(true);
  }, []);

  useEffect(() => {
    socket.off("serverSendMessage").on("serverSendMessage", (data) => {
      dispatch(addMessageRedux(data));
    });
  }, [socket]);
  return (
    <div className="product-detail-father">
      {product.desc !== "" ? (
        <ProductMain product={product} imageList={imageList} />
      ) : (
        <Spin tip="Loading..." size="large">
          <ProductMain product={product} imageList={imageList}/>
        </Spin>
      )}

      {/* Shop Information */}
      {/* <LazyLoad onContentVisible={() => setShowShopInfo(true)}>
        {shop !== undefined ? (
          <LazyLoad>
            {showShopInfo === true ? (
              <ShopInfo
                handleShowChatBox={handleChangeShowChatBox}
                shopName={shop.shopName}
              />
            ) : (
              <Spin tip="Loading...">
                <ShopInfo
                  handleShowChatBox={handleChangeShowChatBox}
                  shopName={shop.shopName}
                />
              </Spin>
            )}
          </LazyLoad>
        ) : null}
      </LazyLoad> */}

      {shop !== undefined ? (
        <ShopInfo handleShowChatBox={handleChangeShowChatBox} shop={shop} />
      ) : null}

      <LazyLoad onContentVisible={() => setShowProductAttribute(true)}>
        {showProductAttribute === true ? (
          <ProductAttribute attributes={attributes} />
        ) : (
          <Spin tip="Loading..." size="large">
            <ProductAttribute attributes={attributes} />
          </Spin>
        )}
      </LazyLoad>

      <LazyLoad onContentVisible={() => setShowProductDesc(true)}>
        {showProductDesc === false ? (
          <Spin tip="Loading..." size="large">
            <ProductDesc desc={product.desc} />
          </Spin>
        ) : (
          <ProductDesc desc={product.desc} />
        )}
      </LazyLoad>

      <LazyLoad onContentVisible={() => setShowProductRate(true)}>
        {showProductRate === true ? (
          <ProductRate rate={product.rate as number} />
        ) : (
          <Spin tip="Loading...">
            <ProductRate rate={product.rate as number} />
          </Spin>
        )}
      </LazyLoad>
      {/* chat box */}
      {showChatBox === true ? (
        <div className="message">
          <Row className="mgt-10">
            <Col span={22}>
              <h4 className="mgl-40">Hades studio</h4>
            </Col>
            <Col span={2}>
              <CloseOutlined
                style={{ color: "red", fontWeight: "bold" }}
                className="cs-pointer"
                onClick={handleChangeHideChatBox}
              />
            </Col>
          </Row>
          <div className="message-content">
            <div className="message-content-child" ref={messageRef}></div>
          </div>
          <Row className="message-input">
            <Col span={17}>
              <Input
                onChange={(e) => setContentMessage(e.target.value)}
                type="text"
                style={{ marginLeft: 10 }}
              />
            </Col>
            <Col span={1}></Col>
            <Col span={3}>
              <Button
                className="btn-color"
                style={{ color: "white" }}
                icon={<SendOutlined />}
                onClick={handleSendMessage}
              >
                Gửi
              </Button>
            </Col>
          </Row>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetail;
