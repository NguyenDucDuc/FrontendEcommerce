import { Button, Col, InputNumber, Row } from "antd"
import { useNavigate } from "react-router-dom";
import "./cartitem.style.scss"

interface IProps {
    id?: number;
    image?: string;
    desc?: string;
    price?: number;
}

const CartItem: React.FC<IProps> = ({id, image, desc, price}) => {
    const nav = useNavigate()
    return (
        <div className="cart-item">
            <Row>
                <Col span={24}>
                    <h4 className="cs-pointer" onClick={() => nav("/shop-profile")}>Hades Studio</h4>
                    <hr color="#e6e6e6"></hr>
                </Col>
            </Row>
            <Row justify="space-between" className="mgt-20">
                <Col span={2} style={{}}>
                    <div className="cart-img">
                        <img src={image} />
                    </div>
                </Col>
                <Col span={5} className="mgt-20">
                    <h4>{desc}</h4>
                </Col>
                <Col span={5} style={{}} className="mgt-20">
                    <p className="txt-red txt-bold">{price}đ</p>
                </Col>
                <Col span={5} style={{}} className="mgt-20">
                    <InputNumber min={1} max={10} defaultValue={1}  />
                </Col>
                <Col span={5} className="mgt-20">
                    <Button type="primary" className="btn-danger">Xóa</Button>
                </Col>
            </Row>
        </div>
    )
}

export default CartItem