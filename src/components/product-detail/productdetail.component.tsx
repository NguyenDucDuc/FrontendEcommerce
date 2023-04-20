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
import { addMessageRedux, createMessageAsyncThunk, getAllMessageAsyncThunk } from "../../store/slices/message.slice";
import { useSelector } from "react-redux";
import { currentUserAsyncThunk } from "../../store/slices/user.slice";
import { socket } from "../../App";

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
  price: number;
  name: string;
  shopId: number;
}

const ProductDetail: React.FC = () => {
  //lazy load
  const [showProductAttribute, setShowProductAttribute] =
    useState<boolean>(false);
  const [showProductDesc, setShowProductDesc] = useState<boolean>(false);
  const [showProductMain, setShowProductMain] = useState<boolean>(false);
  const [showProductRate, setShowProductRate] = useState<boolean>(false);
  const [showShopInfo, setShowShopInfo] = useState<boolean>(false);
  //
  const [contentMessage, setContentMessage] = useState<string>("")
  const messageRef: any = useRef(null)
  const [showChatBox, setShowChatBox] = useState<boolean>(false);
  const [attributes, setAttributes] = useState<any>([]);
  const [shop, setShop] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [shopOwner, setShopOwner] = useState<IShopOwner>()
  const listMessage = useSelector((state: RootState) => state.message.listMessage)
  const currentUser = useSelector((state: RootState) => state.user.user)
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<IProductDetail>({
    price: 0,
    desc: "",
    id: 0,
    name: "",
    shopId: 0,
  });
  const { productId } = useParams();
  const nav = useNavigate();
  const handleOnChangeRate = (values: number) => {
    console.log(values);
  };
  const handleChangeShowChatBox = () => {

    console.log(shopOwner?.id)
    const reqQuery = {
      senderId: currentUser.id,
      receiverId: shopOwner?.id
    }
    setShowChatBox(true);
    console.log(currentUser.id)
    dispatch(getAllMessageAsyncThunk(reqQuery))
  };
  const handleChangeHideChatBox = () => {
    setShowChatBox(false);
  };
  const handleSendMessage = async () => {
    console.log(contentMessage)
    console.log(shopOwner?.id)
    if (contentMessage !== "") {
      const reqBody = {
        senderId: currentUser.id,
        content: contentMessage,
        receiverId: shopOwner?.id
      }
      const resMessage = await dispatch(createMessageAsyncThunk(reqBody))
      // -- emit socket
      socket.emit('clientSendMessage', resMessage.payload)
    }

  }
  const scrollToBottom = () => {
    messageRef.current.scrollIntoView({ behavior: "smooth" })
  }

  const getShopOwner = async () => {
    if (productId !== undefined) {
      const res = await Api.get(endpoint.user.getShopOwner(+productId))
      setShopOwner(res.data.data)
    }
  }
  useEffect(() => {
    const getProductDetail = async () => {
      const res = await Api.get(
        endpoint.product.productDetail(productId || "")
      );
      console.log(res.data.data);
      const resShop = await Api.get(
        endpoint.shop.getDetail(res.data.data.shopId)
      );
      setShop(resShop.data.data);
      setProduct(res.data.data);
      setAttributes(res.data.data.attributes);
    };
    const getListReviews = async () => {
      const body = {
        productId: productId,
        page: 1,
      };
      dispatch(getAllReviewAsyncThunk(body));
    };
    const getCurrentUser = () => {
      dispatch(currentUserAsyncThunk())
    }

    getShopOwner();
    getCurrentUser();
    getProductDetail();
    getListReviews();
    setLoading(true);
  }, []);

  useEffect( () => {
    socket.off('serverSendMessage').on('serverSendMessage', data => {
      console.log(data)
      dispatch(addMessageRedux(data))
    })
  }, [socket])
  return (
    <div className="product-detail-father">
      {product.desc !== "" ? (
        <ProductMain
          img="https://cf.shopee.vn/file/189172eea31b4fa7a18dd7a17e0813e1"
          desc={product.desc}
          rateCount={329}
          saleCount={1208}
          size={["S", "M", "L", "XL"]}
          price={product?.price}
          productId={product.id}
          productName={product.name}
          shopId={product.shopId}
        />
      ) : (
        <Spin tip="Loading..." size="large">
          <ProductMain
            img="https://cf.shopee.vn/file/189172eea31b4fa7a18dd7a17e0813e1"
            desc={product.desc}
            rateCount={329}
            saleCount={1208}
            size={["S", "M", "L", "XL"]}
            price={product?.price}
            productId={product.id}
            productName={product.name}
            shopId={product.shopId}
          />
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
      {
        shop !== undefined ? <ShopInfo
          handleShowChatBox={handleChangeShowChatBox}
          shopName={shop.shopName}
        /> : null
      }
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
            <ProductDesc />
          </Spin>
        ) : (
          <ProductDesc />
        )}
      </LazyLoad>

      <LazyLoad onContentVisible={() => setShowProductRate(true)}>
        {showProductRate === true ? (
          <ProductRate />
        ) : (
          <Spin tip="Loading...">
            <ProductRate />
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
            <div className="message-content-child" ref={messageRef}>
              {listMessage.length > 0 ?
                listMessage.map((item, idx) => {
                  return (
                    item.senderId === currentUser.id
                      ?
                      <MessageReceiver key={idx} time={item.createdAt} content={item.content} />
                      :
                      <MessageSender key={idx} time={item.createdAt} content={item.content} />
                  )
                })
                :
                null
              }
            </div>
          </div>
          <Row className="message-input">
            <Col span={17}>
              <Input onChange={(e) => setContentMessage(e.target.value)} type="text" style={{ marginLeft: 10 }} />
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


