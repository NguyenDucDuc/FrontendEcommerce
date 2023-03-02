import { Col, Row } from "antd"
import "./minicartitem.style.scss"


const MiniCartItem = () => {
    return (
        <div className="mini-cart-item">
            <Row justify="space-around">
                <Col span={5}>
                    <div className="mini-cart-img">
                        <img src="https://cf.shopee.vn/file/sg-11134201-22120-60igl1u0z8kv26" />
                    </div>
                </Col>
                <Col span={12} style={{height: '20px', overflow: 'hidden'}}>
                    <h4>Áo varsity thánh giá nam cực khét. Giá chỉ bằng 2 cốc trà sữa.</h4>
                </Col>
                <Col span={5}>
                    <p className="txt-red txt-bold">120.000đ</p>
                </Col>
            </Row>
        </div>
    )
}

export default MiniCartItem