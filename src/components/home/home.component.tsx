import { Button, Col, Row } from "antd"
import CardProduct from "../card-product/card.component"
import HomeCarousel from "./carousel/carousel.component"
import "./home.style.scss"
import "../style-commond/commond.style.scss"

const Home = () => {
    return (
        <div className="home">
            <section className="section-banner1">
                <Row>
                    <Col span={12}>
                        <h1>MUA SẮM ONLINE ĐƠN GIẢN</h1>
                        <div className="line"></div>
                        <Row className="mgt-40">
                            <Col span={16}>
                                <p>Xu hướng mua sắm online đang rất phát triển. Hãy đồng hành cùng chúng tôi hoặc trở thành đối tác thân thuộc.</p>
                            </Col>
                        </Row>
                        <Row className="mgt-40">
                            <Col span={8}>
                                <Button type="primary" className="btn-color mgt-40" size="large">Đăng ký ngay</Button>
                            </Col>
                            <Col span={8}>
                                <Button type="primary" className="btn-color mgt-40" size="large">Đăng nhập</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <img src="./images/banner1.png" className="banner-1" />
                    </Col>
                </Row>
            </section>
            {/* Carousel */}
            <section className="section1">
                <Row>
                    <Col span={24}>
                        {/* <HomeCarousel /> */}
                    </Col>
                </Row>
            </section>
            {/* Products */}
            <h2 style={{ marginTop: '50px', marginLeft: '2%' }}>Sản phẩm nổi bật</h2>
            <hr></hr>
            <section className="section2">
                <div className="product-promotion">
                    <Row>
                        <Col span={6} >
                            <CardProduct />
                        </Col>
                        <Col span={6}>
                            <CardProduct />
                        </Col>
                        <Col span={6}>
                            <CardProduct />
                        </Col>
                        <Col span={6}>
                            <CardProduct />
                        </Col>
                    </Row>
                </div>
            </section>
            {/* credit card */}
            <section className="section-credit-card">
                <Row>
                    <Col span={12}>
                        <img src="./images/credit-card.png" />
                    </Col>
                    <Col span={12}>
                        <h1 className="title-credit-card">DỄ DÀNG THANH TOÁN VỚI NHIỀU HÌNH THỨC KHÁC NHAU</h1>
                        <div className="line"></div>
                    </Col>
                    
                </Row>
            </section>
        </div>
    )
}

export default Home