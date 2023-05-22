import { Col, Row } from "antd"
import "./minicartitem.style.scss"
import { formatCurrency } from "../../../utils/common";


interface IProps {
    image?: string;
    name?: string;
    price?: number;
}

const MiniCartItem: React.FC<IProps> = ({image, name, price}) => {
    return (
        <div className="mini-cart-item">
            <Row justify="space-around">
                <Col span={5}>
                    <div className="mini-cart-img">
                        <img src={image} />
                    </div>
                </Col>
                <Col span={12} style={{height: '20px', overflow: 'hidden'}}>
                    <h4>{name}</h4>
                </Col>
                <Col span={5}>
                    <p className="txt-red txt-bold">{formatCurrency(price as number)}</p>
                </Col>
            </Row>
        </div>
    )
}

export default MiniCartItem