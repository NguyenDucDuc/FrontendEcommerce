import { CloseOutlined, EyeOutlined, HeartOutlined, MessageOutlined, SendOutlined, ShoppingCartOutlined, WarningOutlined } from "@ant-design/icons"
import { Avatar, Button, Col, Input, InputNumber, Rate, Row } from "antd"
import "./productdetail.style.scss"
import "../style-commond/commond.style.scss"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const ProductDetail = () => {
    const [showChatBox, setShowChatBox] = useState<boolean>(false)
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
    return (
        <div className="product-detail-father">
            <div className="product-detail">
                {/* Infomation */}
                <Row className="mgb-40 min-height">
                    <Col span={8} className="mgl-25">
                        <img src="https://cf.shopee.vn/file/189172eea31b4fa7a18dd7a17e0813e1" />
                    </Col>
                    <Col span={14} className="mgl-40" >
                        <h2>Gấu bông heo nhiều kích cỡ, giá cực tốt, nhanh tay mua ngay đi nào !</h2>
                        <Row className="mgt-10">
                            <Col span={6}>
                                <Rate onChange={(values) => handleOnChangeRate(values)} />
                            </Col>
                            <Col span={6}>
                                <p style={{ fontWeight: 'bold', marginTop: '5px', textAlign: 'center' }}>92 đánh giá</p>
                            </Col>
                            <Col span={6}>
                                <p style={{ fontWeight: 'bold', marginTop: '5px', textAlign: 'center' }}>423 đã bán</p>
                            </Col>
                        </Row>
                        <Row className="mgt-10">
                            <Col span={24} style={{ background: '#e6e6e6' }}>
                                <h2 style={{ padding: '15px 0', color: 'red' }}>299.000 VND</h2>
                            </Col>
                        </Row>
                        <Row className="mgt-40">
                            <Col span={6}>
                                <p style={{ marginTop: '10px' }}>Kích thước: </p>
                            </Col>
                            <Col span={3}>
                                <Button type="primary" ghost>S</Button>
                            </Col>
                            <Col span={3}>
                                <Button type="primary" ghost>M</Button>
                            </Col>
                            <Col span={3}>
                                <Button type="primary" ghost>L</Button>
                            </Col>
                            <Col span={3}>
                                <Button type="primary" className="btn-color">XL</Button>
                            </Col>
                        </Row>
                        <Row className="mgt-40">
                            <Col span={6}>
                                <p>Số lượng: </p>
                            </Col>
                            <Col span={3}>
                                <InputNumber min={1} max={100} defaultValue={1} />
                            </Col>
                        </Row>
                        <Row className="mgt-40">
                            <Col span={3}>
                                <Button className="btn-color" type="primary" size="large" icon={<ShoppingCartOutlined />}>Thêm vào giỏ hàng</Button>
                            </Col>
                        </Row>
                        <Row className="mgt-40">
                            <Col span={3}>
                                <HeartOutlined className="icon cs-pointer" /> (3,4K)
                            </Col>
                            <Col span={3}>
                                <WarningOutlined className="icon cs-pointer" />
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </div>


            <div className="shop-info">
                <Row className="mgl-25">
                    <Col span={8}>
                        <Row>
                            <Col span={7}>
                                <div className="avt-shop">
                                    <img src="https://res.cloudinary.com/djbju13al/image/upload/v1676826995/Avatar/1676826993120.jpg" />
                                </div>
                            </Col>
                            <Col span={17}>
                                <p style={{ marginTop: '25px', fontWeight: 'bold' }}>Hades Studio</p>
                                <Row className="mgt-20">
                                    <Col span={12}>
                                        <Button className="btn-color" type="primary" icon={<SendOutlined />} onClick={handleChangeShowChatBox}>Nhắn tin</Button>
                                    </Col>
                                    <Col span={12}>
                                        <Button className="btn-color" type="primary" icon={<EyeOutlined />} onClick={() => nav("/shop-profile")}>Xem shop</Button>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                    </Col>
                    <Col span={16}>
                    </Col>
                </Row>
            </div>

            <div className="product-desc">
                <h2 className="mgl-25" style={{ paddingTop: '40px' }}>Mô tả sản phẩm</h2>
                <hr></hr>
                <div className="mgl-25" style={{ paddingTop: '20px' }}>
                    <p >
                        ⚡ Bàn phím có 4 màu sắc thời trang và trẻ trung, tuyệt đẹp và Charming.
                    </p>
                    <p>
                        ⚡ Bàn phím có 4 màu sắc thời trang và trẻ trung, tuyệt đẹp và Charming.
                    </p>
                    <p>
                        ⚡ Bàn phím có 4 màu sắc thời trang và trẻ trung, tuyệt đẹp và Charming.
                    </p>
                    <p>
                        ⚡ Bàn phím có 4 màu sắc thời trang và trẻ trung, tuyệt đẹp và Charming.
                    </p>
                    <p>
                        ⚡ Bàn phím có 4 màu sắc thời trang và trẻ trung, tuyệt đẹp và Charming.
                    </p>
                </div>
            </div>

            <div className="product-rate" >
                <h2 className="mgl-25" style={{ paddingTop: '40px' }}>Đánh giá sản phẩm</h2>
                <hr></hr>
                <div className="user-rate">
                    {/* Comment */}
                    <Row className="mgt-40">
                        <Col span={2}>
                            <div className="avt-user">
                                <img src="https://res.cloudinary.com/djbju13al/image/upload/v1675700522/Avatar/1675700519338.jpg" />
                            </div>
                        </Col>
                        <Col span={22} className="">
                            <p style={{ fontWeight: 'bold' }}>Nguyễn Đức Đức</p>
                            <Rate value={4} style={{ fontSize: '15px' }} />
                            <p style={{ fontSize: '13px', color: '#8c8c8c' }}>2023-1-1</p>
                            <Row style={{ marginTop: '10px' }}>
                                <Col span={24}>
                                    <p>Sản phẩm quá đẳng cấp. Không còn gì để bàn cãi.</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mgt-40">
                        <Col span={2}>
                            <div className="avt-user">
                                <img src="https://res.cloudinary.com/djbju13al/image/upload/v1675700522/Avatar/1675700519338.jpg" />
                            </div>
                        </Col>
                        <Col span={22} className="">
                            <p style={{ fontWeight: 'bold' }}>Nguyễn Đức Đức</p>
                            <Rate value={4} style={{ fontSize: '15px' }} />
                            <p style={{ fontSize: '13px', color: '#8c8c8c' }}>2023-1-1</p>
                            <Row style={{ marginTop: '10px' }}>
                                <Col span={24}>
                                    <p>Sản phẩm quá đẳng cấp. Không còn gì để bàn cãi.</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mgt-40">
                        <Col span={2}>
                            <div className="avt-user">
                                <img src="https://res.cloudinary.com/djbju13al/image/upload/v1675700522/Avatar/1675700519338.jpg" />
                            </div>
                        </Col>
                        <Col span={22} className="">
                            <p style={{ fontWeight: 'bold' }}>Nguyễn Đức Đức</p>
                            <Rate value={4} style={{ fontSize: '15px' }} />
                            <p style={{ fontSize: '13px', color: '#8c8c8c' }}>2023-1-1</p>
                            <Row style={{ marginTop: '10px' }}>
                                <Col span={24}>
                                    <p>Sản phẩm quá đẳng cấp. Không còn gì để bàn cãi.</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
            {/* chat box */}
            {
                showChatBox === true ?
                    <div className="message">
                        <Row className="mgt-10">
                            <Col span={22}>
                            <h4 className="mgl-40">Hades studio</h4>
                            </Col>
                            <Col span={2}>
                                <CloseOutlined style={{color: 'red', fontWeight: 'bold'}} className="cs-pointer" onClick={handleChangeHideChatBox} />
                            </Col>
                        </Row>
                        <div className="message-content">

                        </div>
                        <Row className="message-input">
                            <Col span={17}>
                                <Input type="text" />
                            </Col>
                            <Col span={1}>
                            </Col>
                            <Col span={3}>
                                <Button className="btn-color" style={{ color: 'white' }} icon={<SendOutlined />}>Send</Button>
                            </Col>
                        </Row>
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default ProductDetail
