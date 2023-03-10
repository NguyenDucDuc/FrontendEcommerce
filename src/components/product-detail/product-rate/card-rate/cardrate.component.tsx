import { Col, Rate, Row } from "antd"
import "./cardrate.style.scss"


interface IProps {
    id: number;
    firstName: string;
    lastName: string;
    rate: number;
    content: string;
    createdAt: string;
    img: string;
}


const CardRate: React.FC<IProps> = ({id, firstName, lastName, rate, content, createdAt, img}) => {
    return (
        <div>
            <Row className="mgt-40">
                    <Col span={2}>
                        <div className="avt-user">
                            <img src={img} />
                        </div>
                    </Col>
                    <Col span={22} className="">
                        <p style={{ fontWeight: 'bold' }}>{`${firstName} ${lastName}`}</p>
                        <Rate value={rate} style={{ fontSize: '15px' }} />
                        <p style={{ fontSize: '13px', color: '#8c8c8c' }}>{createdAt}</p>
                        <Row style={{ marginTop: '10px' }}>
                            <Col span={24}>
                                <p>{content}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
        </div>
    )
}

export default CardRate