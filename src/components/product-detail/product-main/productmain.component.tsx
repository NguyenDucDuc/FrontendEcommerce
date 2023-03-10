import { HeartFilled, HeartOutlined, QuestionCircleOutlined, QuestionCircleTwoTone, ShoppingCartOutlined, WarningOutlined } from "@ant-design/icons"
import { Badge, Button, Col, InputNumber, Radio, RadioChangeEvent, Rate, Row, Skeleton } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AuthApi, endpoint } from "../../../ configs/Api"
import { addItem, ICartItem, updateCartCount } from "../../../store/slices/cartitem.slice"
import { RootState, useAppDispatch } from "../../../store/store"
import "./productmain.style.scss"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


interface IProps {
    productId: number;
    img: string;
    desc: string;
    rateCount: number;
    saleCount: number;
    price: number;
    size: string[];
}

const attributes = {

}

const arrImgs = [
    "https://cf.shopee.vn/file/sg-11134201-22090-n8jt8x4mvthv55",
    "https://cf.shopee.vn/file/sg-11134201-22110-x6zyf93phrjv92",
    "https://cf.shopee.vn/file/47e93f885083c41daaebb6093f8e522e"
]

const arrColor = [1, 2, 3]
const options = [
    { label: 'Đỏ', value: 'red' },
    { label: 'Đen', value: 'black' },
    { label: 'Vàng', value: 'yellow' },
  ];

  const optionsSize = [
    { label: 'S', value: 's' },
    { label: 'M', value: 'm' },
    { label: 'L', value: 'l' },
    { label: 'XL', value: 'xl' },
  ];

const ProductMain: React.FC<IProps> = ({ img, desc, rateCount, saleCount, price, size, productId }) => {
    const listCartItem = useSelector((state: RootState) => state.cartItem.listCartItem)
    const [showChatBox, setShowChatBox] = useState<boolean>(false)
    const [currrentAddress, setCurrentAddress] = useState<any>()
    const [urlMainImage, setUrlMainImage] = useState<string>(img)
    const [value4, setValue4] = useState('Apple')
    const [isHeart, setIsHeart] = useState<boolean>(false)
    const nav = useNavigate()
    const dispatch = useAppDispatch()
    const handleOnChangeRate = (values: number) => {
        console.log(values)
    }
    const handleChangeShowChatBox = () => {
        setShowChatBox(true)
        console.log(showChatBox)
    }
    const handleChangeHideChatBox = () => {
        setShowChatBox(false)
    }
    const handleClickImage = (img: string) => {
        setUrlMainImage(img)
    }
    const onChange4 = ({ target: { value } }: RadioChangeEvent) => {
        console.log('radio4 checked', value);
        setValue4(value);
      };
      const handleAddToCart = () => {
        // update cart count in header
        dispatch(updateCartCount())
        const newCartItem: ICartItem = {
            price: price,
            productId: productId,
            image: "https://cf.shopee.vn/file/47e93f885083c41daaebb6093f8e522e",
            desc: desc,
            quantity: 1
        }
        dispatch(addItem(newCartItem))
      }
    useEffect(() => {
        const getCurrentAddress = async () => {
            const res = await AuthApi().get(endpoint.address.currentAddress)
            setCurrentAddress(res.data.data)
        }
        getCurrentAddress()
    }, [])
    return (
        <div className="product-main">
            {/* Infomation */}
            <Row className="mgb-40 min-height">
                <Col span={8} className="mgl-25">
                    <img src={urlMainImage} />
                    <div className="group-img">
                        <Row justify="space-around">
                            {
                                arrImgs.map((img, idx) => <Col key={idx} span={7}><LazyLoadImage effect="opacity" src={img} onClick={() => handleClickImage(img)} /></Col>)
                            }
                        </Row>
                        {/* Heart Or Report */}
                        <Row className="mgt-30" justify="space-around">
                            <Col span={4}></Col>
                            <Col span={4}>
                                {
                                    isHeart === true ?
                                    <><HeartFilled onClick={() => setIsHeart(false)} className="icon cs-pointer" /> (3,4K)</>
                                    :
                                    <><HeartOutlined onClick={() => setIsHeart(true)} className="icon cs-pointer" /> (3,4K)</>
                                }
                            </Col>
                            <Col span={4}>
                                <WarningOutlined className="icon cs-pointer" />
                            </Col>
                            <Col span={4}></Col>
                        </Row>

                    </div>
                </Col>
                <Col span={14} className="mgl-40" >
                    <h2>{desc}</h2>
                    <Row className="mgt-10">
                        <Col span={5}>
                            <Rate onChange={(values) => handleOnChangeRate(values)} />
                        </Col>
                        <Col span={5}>
                            <p style={{ fontWeight: 'bold', marginTop: '5px', textAlign: 'center' }}>{rateCount} đánh giá</p>
                        </Col>
                        <Col span={5}>
                            <p style={{ fontWeight: 'bold', marginTop: '5px', textAlign: 'center' }}>{saleCount} đã bán</p>
                        </Col>
                    </Row>
                    <Row className="mgt-10">
                        <Col span={24} style={{ background: '#f2f2f2', padding: '15px 0' }}>
                            <Row>
                                <Col span={4}>
                                    <p className="mgl-10" style={{ textDecoration: 'line-through' }}>320.000 VND</p>
                                </Col>
                                <Col span={7}>
                                    <h2 style={{ color: '#ff3333', fontSize: '28px' }}>{price} VND</h2>
                                </Col>
                                <Col span={6}>
                                    <Badge count="Giảm 8%">
                                    </Badge>
                                </Col>
                            </Row>
                            <Row justify="space-around">
                                <Col span={23}>
                                    <Row>
                                        <Col span={2}>
                                            <QuestionCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '25px' }} />
                                        </Col>
                                        <Col span={4}>
                                            <h3 style={{ color: 'red' }}>Gì cũng rẻ</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={2}>

                                        </Col>
                                        <Col span={15}>
                                            <p>Giá tốt nhất so với các sản phẩm cùng loại.</p>
                                        </Col>
                                    </Row>
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                    {/* Shop discount */}
                    <Row className="mgt-30">
                        <Col span={6}>
                            <p style={{}}>Mã giảm giá của shop: </p>
                        </Col>
                        <Col span={18}>
                            <Row>
                                <Col span={4}>
                                    <Badge count="Giảm 10k" style={{ background: '#00cc66' }} />
                                </Col>
                                <Col span={4}>
                                    <Badge count="Giảm 10k" style={{ background: '#00cc66' }} />
                                </Col>
                                <Col span={4}>
                                    <Badge count="Giảm 10k" style={{ background: '#00cc66' }} />
                                </Col>
                                <Col span={4}>
                                    <Badge count="Giảm 10k" style={{ background: '#00cc66' }} />
                                </Col>
                                <Col span={4}>
                                    <Badge count="Giảm 10k" style={{ background: '#00cc66' }} />
                                </Col>
                                <Col span={4}>
                                    <Badge count="Giảm 10k" style={{ background: '#00cc66' }} />
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                    {/* transport */}
                    <Row className="mgt-30">
                        <Col span={6}>
                            <p>Vận chuyển: </p>
                        </Col>
                        <Col span={18}>
                            {currrentAddress !== undefined ?
                                <p>Vận chuyển tới {`${currrentAddress.detail} - ${currrentAddress.street}, ${currrentAddress.ward}, ${currrentAddress.district}, ${currrentAddress.city}`}</p>
                                :
                                null
                            }
                        </Col>
                    </Row>
                    <Row className="mgt-30">
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
                    </Row>
                    {/* Size */}
                    <Row className="mgt-30">
                        <Col span={6}>
                            <p style={{ marginTop: '10px' }}>Kích thước: </p>
                        </Col>
                        <Col span={18}>
                            <Radio.Group options={optionsSize} onChange={onChange4} optionType="button" buttonStyle="solid" />
                        </Col>
                    </Row>
                    <Row className="mgt-30">
                        <Col span={6}>
                            <p>Số lượng: </p>
                        </Col>
                        <Col span={3}>
                            <InputNumber min={1} max={100} defaultValue={1} />
                        </Col>
                        <Col span={6} style={{ marginLeft: '10px', color: '#8c8c8c' }}>
                            <p>923 sản phẩm có sẵn</p>
                        </Col>
                    </Row>
                    <Row className="mgt-30">
                        <Col span={3}>
                            <Button onClick={handleAddToCart} className="btn-color" type="primary" size="large" icon={<ShoppingCartOutlined />}>Thêm vào giỏ hàng</Button>
                        </Col>
                    </Row>


                </Col>
            </Row>
        </div>
    )
}

export default ProductMain