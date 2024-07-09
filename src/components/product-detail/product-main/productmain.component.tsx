import {
  HeartFilled,
  HeartOutlined,
  QuestionCircleOutlined,
  QuestionCircleTwoTone,
  ShoppingCartOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import {
  Badge,
  Button,
  Col,
  InputNumber,
  Radio,
  RadioChangeEvent,
  Rate,
  Row,
  Skeleton,
  notification,
} from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthApi, endpoint } from '../../../configs/Api';
import {
  addItem,
  addItem2,
  ICartItem,
  updateCartCount,
  updateCartCount2,
} from '../../../store/slices/cartitem.slice';
import { RootState, useAppDispatch } from '../../../store/store';
import './productmain.style.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Product } from '../../../models/models';
import { formatCurrency } from '../../../utils/common';
import { axiosClient } from '../../../lib/axios/axios.config';

interface IProps {
  productId: number;
  img: string;
  desc: string;
  rateCount: number;
  saleCount: number;
  price: number;
  size: string[];
  productName: string;
  shopId: number;
}

interface Props {
  product: Product;
  imageList?: any[];
}

const arrImgs = [
  'https://cf.shopee.vn/file/sg-11134201-22090-n8jt8x4mvthv55',
  'https://cf.shopee.vn/file/sg-11134201-22110-x6zyf93phrjv92',
  'https://cf.shopee.vn/file/47e93f885083c41daaebb6093f8e522e',
];

const ProductMain: React.FC<Props> = ({ product, imageList }) => {
  const {
    id,
    name,
    sku,
    rate,
    price,
    isActive,
    desc,
    image,
    unitInStock,
    unitOnOrder,
    shopId,
    categoryId,
    promotionId,
    attributeGroupId,
    createdAt,
    updatedAt,
    attributes,
    promotion,
    priceDiscount,
  } = product;
  const listCartItem = useSelector(
    (state: RootState) => state.cartItem.listProducts
  );
  const [api, contextHolder] = notification.useNotification();
  const [showChatBox, setShowChatBox] = useState<boolean>(false);
  const [currrentAddress, setCurrentAddress] = useState<any>();
  const [urlMainImage, setUrlMainImage] = useState<string>(image as string);
  //   const [value4, setValue4] = useState("Apple");
  const [isHeart, setIsHeart] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const handleChangeQuantity = (value: any) => {
    setQuantity(value);
  };
  const handleOnChangeRate = (values: number) => {};
  const handleChangeShowChatBox = () => {
    setShowChatBox(true);
  };
  const handleChangeHideChatBox = () => {
    setShowChatBox(false);
  };
  const handleClickImage = (img: string) => {
    setUrlMainImage(img);
  };

  //   const onChange4 = ({ target: { value } }: RadioChangeEvent) => {
  //     console.log("radio4 checked", value);
  //     setValue4(value);
  //   };

  useEffect(() => {
    setUrlMainImage(image as string);
  }, [image]);

  useEffect(() => {
    const getCurrentAddress = async () => {
      const res = await AuthApi().get(endpoint.address.currentAddress);
      setCurrentAddress(res.data.data);
    };
    getCurrentAddress();
  }, []);

  const handleAddToCart = async () => {
    // update cart count in header
    dispatch(updateCartCount2({ quantity: quantity }));
    // nofitication
    api.success({
      message: 'Thông báo',
      description: 'Sản phẩm đã được thêm và giỏ hàng!',
      duration: 3,
    });
    // add to redux cart

    const newCartItem: ICartItem = {
      price:
        priceDiscount !== undefined
          ? (priceDiscount as number)
          : (price as number),
      id: id,
      image: image,
      desc: desc,
      quantity: quantity,
      shopId: shopId as number,
    };    
    dispatch(addItem2(newCartItem));
    // add to database
    // -- step 1: get cartId
    const resCart = await AuthApi().get(endpoint.cart.getByUserId);

    // -- step 2: add to database
    const res = await AuthApi().post(endpoint.productCart.add, {
      productId: id,
      cartId: resCart.data.data.id,
      quantity: quantity,
      unitPrice:
        priceDiscount !== undefined
          ? (priceDiscount as number)
          : (price as number),
    });
  };

  return (
    <div className="product-main">
      {contextHolder}
      {/* Infomation */}
      <Row className="mgb-40 min-height">
        <Col span={8} className="mgl-25">
          <img src={urlMainImage} alt="Ảnh sản phẩm" />
          <div className="group-img">
            <Row justify="start">
              {imageList?.map((img, idx) => (
                <Col key={idx} span={6}>
                  <LazyLoadImage
                    effect="opacity"
                    src={img.value}
                    onClick={() => handleClickImage(img.value)}
                  />
                </Col>
              ))}
            </Row>
            {/* Heart Or Report */}
            <Row className="mgt-30" justify="space-around">
              <Col span={4}></Col>
              <Col span={4}>
                {isHeart === true ? (
                  <>
                    <HeartFilled
                      onClick={() => setIsHeart(false)}
                      className="icon cs-pointer"
                    />{' '}
                    (3,4K)
                  </>
                ) : (
                  <>
                    <HeartOutlined
                      onClick={() => setIsHeart(true)}
                      className="icon cs-pointer"
                    />{' '}
                    (3,4K)
                  </>
                )}
              </Col>
              <Col span={4}>
                <WarningOutlined className="icon cs-pointer" />
              </Col>
              <Col span={4}></Col>
            </Row>
          </div>
        </Col>
        <Col span={14} className="mgl-40">
          <h2 style={{ textTransform: 'capitalize' }}>{`${name}`}</h2>
          <Row className="mgt-10">
            <Col span={5}>
              <Rate onChange={(values) => handleOnChangeRate(values)} />
            </Col>
            <Col span={5}>
              <p
                style={{
                  fontWeight: 'bold',
                  marginTop: '5px',
                  textAlign: 'center',
                }}
              >
                Đánh giá {rate}
              </p>
            </Col>
            <Col span={5}>
              <p
                style={{
                  fontWeight: 'bold',
                  marginTop: '5px',
                  textAlign: 'center',
                }}
              >
                {unitOnOrder} đã bán
              </p>
            </Col>
          </Row>
          <Row className="mgt-10">
            <Col span={24} style={{ background: '#f2f2f2', padding: '15px 0' }}>
              <Row>
                <Col span={4}>
                  <p
                    className="mgl-10"
                    style={{ textDecoration: 'line-through' }}
                  >
                    {priceDiscount === undefined
                      ? ''
                      : formatCurrency(price as number)}
                  </p>
                </Col>
                <Col span={7}>
                  <h2 style={{ color: '#ff3333', fontSize: '28px' }}>
                    {priceDiscount !== undefined
                      ? formatCurrency(priceDiscount)
                      : formatCurrency(price as number)}
                  </h2>
                </Col>
                <Col span={6}>
                  {promotion && promotion.value >= 0 ? (
                    <Badge count={`Giảm ${promotion?.value * 100}%`}></Badge>
                  ) : (
                    ''
                  )}
                </Col>
              </Row>
              <Row justify="space-around">
                <Col span={23}>
                  <Row>
                    <Col span={2}>
                      <QuestionCircleTwoTone
                        twoToneColor="#52c41a"
                        style={{ fontSize: '25px' }}
                      />
                    </Col>
                    <Col span={4}>
                      <h3 style={{ color: 'red' }}>Gì cũng rẻ</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={2}></Col>
                    <Col span={15}>
                      <p>Giá tốt nhất so với các sản phẩm cùng loại.</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* Shop discount */}
          {/* <Row className="mgt-30">
            <Col span={6}>
              <p style={{}}>Mã giảm giá của shop: </p>
            </Col>
            <Col span={18}>
              <Row>
                <Col span={4}>
                  <Badge count={`Giảm 8%`} style={{ background: '#00cc66' }} />
                </Col>
              </Row>
            </Col>
          </Row> */}
          {/* transport */}
          {/* <Row className="mgt-30">
            <Col span={6}>
              <p>Vận chuyển: </p>
            </Col>
            <Col span={18}>
              {currrentAddress !== undefined ? (
                <p>
                  Vận chuyển tới{" "}
                  {`${currrentAddress?.detail} - ${currrentAddress?.street}, ${currrentAddress?.ward}, ${currrentAddress?.district}, ${currrentAddress?.city}`}
                </p>
              ) : null}
            </Col>
          </Row> */}
          {/* <Row className="mgt-30">
            <Col span={6}>
              <p>Màu sắc: </p>
            </Col>
            <Col span={18}>
              <Row>
                <Radio.Group
                  options={options}
                  onChange={onChange4}
                  value={value4}
                  optionType="button"
                  buttonStyle="solid"
                />
              </Row>
            </Col>
          </Row> */}
          {/* Size */}
          {/* <Row className="mgt-30">
            <Col span={6}>
              <p style={{ marginTop: "10px" }}>Kích thước: </p>
            </Col>
            <Col span={18}>
              <Radio.Group
                options={optionsSize}
                onChange={onChange4}
                optionType="button"
                buttonStyle="solid"
              />
            </Col>
          </Row> */}
          <Row className="mgt-30">
            <Col span={6}>
              <p>Số lượng: </p>
            </Col>
            <Col span={3}>
              <InputNumber
                min={1}
                max={unitInStock}
                defaultValue={1}
                onChange={handleChangeQuantity}
              />
            </Col>
            <Col span={6} style={{ marginLeft: '10px', color: '#8c8c8c' }}>
              <p>{unitInStock} sản phẩm có sẵn</p>
            </Col>
          </Row>
          <Row className="mgt-30">
            <Col span={3}>
              <Button
                onClick={handleAddToCart}
                className="btn-color"
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
              >
                Thêm vào giỏ hàng
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ProductMain;
