import { Button, Col, Row } from "antd"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import "./card-confirm-checkout.style.scss"



const CardConfirmCheckout = () => {
    const totalPrice = useSelector((state: RootState) => state.cartItem.totalPrice)
    return (
        <div className="card-confirm-checkout">
            <div className="card-confirm-checkout-child">
                <Row>
                    <Col span={18}>
                        <h3>Phương thức thanh toán</h3>
                    </Col>
                    <Col span={6}>
                        <p style={{ fontWeight: 'bold' }}>Thanh toán khi nhận hàng</p>
                    </Col>
                </Row>
                <hr className="mgt-20" color="#e6e6e6"></hr>
                <div className="confirm-order">
                    <Row>
                        <Col span={18}>
                        </Col>
                        <Col span={6}>
                            <Row>
                                <Col span={12}>
                                    <p className="txt-bold">Tổng tiền hàng: </p>
                                </Col>
                                <Col span={12}>
                                    <p className="txt-bold txt-red">
                                        1.200.000 VND
                                    </p>
                                </Col>

                                <Col span={12}>
                                    <p className="txt-bold">Tổng tiền hàng: </p>
                                </Col>
                                <Col span={12}>
                                    <p className="txt-bold txt-red">
                                        80.000 VND
                                    </p>
                                </Col>

                                <Col span={12}>
                                    <p className="txt-bold">Tổng tiền hàng: </p>
                                </Col>
                                <Col span={12}>
                                    <p className="txt-bold txt-red" style={{fontSize: '18px'}}>
                                        {totalPrice} VND
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <hr color="#e6e6e6" style={{marginTop: 10}}></hr>
                <div className="btn-confirm">
                    <Row>
                        <Col span={18}>
                            <p>Nhấn đặt hàng là bạn đã đồng ý với tất cả điều khoản của chúng tôi.</p>
                        </Col>
                        <Col span={6}>
                            <Button type="primary" className="btn-color" size="large" style={{width: '100%'}}>Đặt hàng</Button>
                        </Col>
                    </Row>
                </div>
            </div>
            
        </div>
    )
}

export default CardConfirmCheckout