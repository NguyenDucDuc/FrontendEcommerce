import { Col, Rate, Row } from "antd"
import "./cardrate.style.scss"




const CardRate = () => {
    return (
        <div>
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
    )
}

export default CardRate