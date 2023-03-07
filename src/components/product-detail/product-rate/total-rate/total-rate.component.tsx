import { Button, Col, Rate, Row } from "antd"
import "./total-rate.style.scss"



const TotalRate = () => {
    return (
        <div className="total-rate">
            <div className="total-rate__margin">
                <Row>
                    <Col span={6} >
                        <h1>4.0 trên 5</h1>
                        <Rate value={4} />
                    </Col>
                    <Col span={18}>
                        <Row gutter={[10,0]}>
                            <Col span={4}>
                                <Button danger ghost type="primary" style={{ width: '100%', color: 'black' }}>5 sao(5)</Button>
                            </Col>
                            <Col span={4}>
                                <Button danger ghost type="primary" style={{ width: '100%', color: 'black' }}>4 sao(20)</Button>
                            </Col>
                            <Col span={4}>
                                <Button danger ghost type="primary" style={{ width: '100%', color: 'black' }}>3 sao(1)</Button>
                            </Col>
                            <Col span={4}>
                                <Button danger ghost type="primary"style={{ width: '100%', color: 'black' }}>2 sao</Button>
                            </Col>
                            <Col span={4}>
                                <Button danger ghost type="primary" style={{ width: '100%', color: 'black' }}>5 sao</Button>
                            </Col>
                            <Col span={4}>
                                <Button danger ghost type="primary" style={{ width: '100%', color: 'black' }}>5 sao</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default TotalRate