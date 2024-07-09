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
            <Row justify="space-around" align={'middle'}>
                <Col span={4}>
                    <div className="mini-cart-img">
                        <img src={image} alt="Ảnh sản phẩm"/>
                    </div>
                </Col>
                <Col span={10} style={{height: '20px', overflow: 'hidden', fontSize: '13px'}}>
                    <h4 style={{textTransform: 'capitalize'}}>{name}</h4>
                </Col>
                <Col span={9}>
                    <p style={{textAlign: 'right'}} className="txt-red txt-bold">{formatCurrency(price as number)}</p>
                </Col>
            </Row>
        </div>
    )
}

export default MiniCartItem