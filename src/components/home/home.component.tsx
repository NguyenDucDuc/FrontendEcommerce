import { Col, Row } from "antd"
import CardProduct from "../card-product/card.component"
import HomeCarousel from "./carousel/carousel.component"
import "./home.style.scss"


const Home = () => {
    return (
        <div className="home">
            {/* Carousel */}
            <section className="section1">
                <Row>
                    <Col span={24}>
                        <HomeCarousel />
                    </Col>
                </Row>
            </section>
            {/* Products */}
            <h2 style={{marginTop: '50px', marginLeft: '2%'}}>Sản phẩm nổi bật</h2>
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
        </div>
    )
}

export default Home