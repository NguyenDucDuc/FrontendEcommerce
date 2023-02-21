import { EyeOutlined, HeartOutlined, MessageOutlined, SendOutlined, ShoppingCartOutlined, WarningOutlined } from "@ant-design/icons"
import { Avatar, Button, Col, InputNumber, Rate, Row } from "antd"
import "./productdetail.style.scss"



const ProductDetail = () => {
    const handleOnChangeRate = (values: number) => {
        console.log(values)
    }
    return (
        <div>
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
                                <Button type="primary">XL</Button>
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
                                <Button type="primary" size="large" icon={<ShoppingCartOutlined />}>Thêm vào giỏ hàng</Button>
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
                <Row>
                    <Col span={8}>
                        <Row>
                            <Col span={7}>
                                <div className="avt-shop">
                                    <img src="https://res.cloudinary.com/djbju13al/image/upload/v1676826995/Avatar/1676826993120.jpg" />
                                </div>
                            </Col>
                            <Col span={17}>
                                <p style={{marginTop: '25px', fontWeight: 'bold'}}>Hades Studio</p>
                                <Row className="mgt-20">
                                    <Col span={12}>
                                        <Button type="primary" icon={<SendOutlined />}>Nhắn tin</Button>
                                    </Col>
                                    <Col span={12}>
                                    <Button type="primary" icon={<EyeOutlined />}>Xem shop</Button>
                                    </Col>
                                </Row>
                            </Col>
                            
                        </Row>
                    </Col>
                    <Col span={16}>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ProductDetail
