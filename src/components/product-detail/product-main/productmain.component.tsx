import { HeartOutlined, QuestionCircleOutlined, QuestionCircleTwoTone, ShoppingCartOutlined, WarningOutlined } from "@ant-design/icons"
import { Badge, Button, Col, InputNumber, Rate, Row } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthApi, endpoint } from "../../../ configs/Api"
import "./productmain.style.scss"


interface IProps {
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

const ProductMain: React.FC<IProps> = ({ img, desc, rateCount, saleCount, price, size }) => {
    const [showChatBox, setShowChatBox] = useState<boolean>(false)
    const [currrentAddress, setCurrentAddress] = useState<any>()
    const [urlMainImage, setUrlMainImage] = useState<string>(img)
    const nav = useNavigate()
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
                                arrImgs.map((img) => <Col span={7}><img src={img} onClick={() => handleClickImage(img)} /></Col>)
                            }
                        </Row>
                        {/* Heart Or Report */}
                        <Row className="mgt-30" justify="space-around">
                            <Col span={4}></Col>
                            <Col span={4}>
                                <HeartOutlined className="icon cs-pointer" /> (3,4K)
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
                                <Col span={5}>
                                    <Button type="primary" ghost>Màu đỏ</Button>
                                </Col>
                                <Col span={5}>
                                    <Button type="primary" ghost>Màu đỏ</Button>
                                </Col>
                                <Col span={5}>
                                    <Button type="primary" ghost>Màu đỏ</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {/* Size */}
                    <Row className="mgt-30">
                        <Col span={6}>
                            <p style={{ marginTop: '10px' }}>Kích thước: </p>
                        </Col>
                        {
                            size.length > 0 ?
                                size.map((s) => <Col span={3}>
                                    <Button type="primary" ghost>{s}</Button>
                                </Col>)
                                :
                                null
                        }
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
                            <Button className="btn-color" type="primary" size="large" icon={<ShoppingCartOutlined />}>Thêm vào giỏ hàng</Button>
                        </Col>
                    </Row>


                </Col>
            </Row>
        </div>

    )
}

export default ProductMain