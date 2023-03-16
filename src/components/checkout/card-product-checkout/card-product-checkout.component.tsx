import { Col, Input, Row } from "antd"
import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useSelector } from "react-redux";
import { } from "../../../store/slices/product-checked.slice";
import { RootState, useAppDispatch } from "../../../store/store";
import "./card-product-checkout.style.scss"


interface IProps {
    id?: number;
    unitPrice?: number;
    quantity?: number;
    image?: string;
    desc?: string;
    name?: string;
}

const CardProductCheckout: React.FC<IProps> = ({id, unitPrice, quantity, image, desc, name}) => {
    const dispatch = useAppDispatch()
    let totalPrice = Number(unitPrice) * Number(quantity)
    useEffect(() => {
        
    }, [])
    return (
        <div className="card-product-checkout">
            <div className="card-product-checkout-content">
                <h4>Hades studio</h4>
                <Row style={{ marginTop: 10 }}>
                    <Col span={4}>
                        <div className="card-img">
                            <LazyLoadImage src={image} />
                        </div>
                    </Col>
                    <Col span={8}>
                        <h4>{name}</h4>
                    </Col>
                    <Col span={4}>
                        <p style={{ textAlign: 'center' }}>{unitPrice}</p>
                    </Col>
                    <Col span={4}>
                        <p style={{ textAlign: 'center' }}>{quantity}</p>
                    </Col>
                    <Col span={4}>
                        <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>{totalPrice} VND</p>
                    </Col>

                </Row>
                <hr style={{marginTop: 20}} color="#e6e6e6"></hr>
                <Row>
                    <Col span={8}>
                        <Input type="text" size="large" placeholder="Lời nhắn cho shop" style={{marginTop: 20, border: '1.5px solid #a6a6a6'}} />
                    </Col>
                    <Col span={5}>
                    </Col>
                    <Col span={11}>
                        <Row>
                            <Col span={8}>
                                <p className="mgt-10">Đơn vị vận chuyển</p>
                            </Col>
                            <Col span={8}>
                                <h4 className="mgt-10">Giao hàng tiết kiệm</h4>
                            </Col>
                            <Col span={8}>
                                <p className="mgt-10">Phí vận chuyển: <span style={{color: 'red', fontWeight: 'bold'}}>40.000 VND</span></p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr style={{marginTop: 20}} color="#e6e6e6"></hr>
                <Row>
                    <div className="total-price">
                        <h4>Tổng số tiền: <span style={{color: 'red'}}>{totalPrice + 40000} VND</span></h4>
                    </div>
                </Row>
            </div>
        </div>
    )
}

export default CardProductCheckout