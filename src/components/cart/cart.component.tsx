import { Button, Checkbox, Col, Row } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import CartItem from "./cart-item/cartitem.component"
import "./cart.style.scss"



const Cart = () => {
    const listCartItem = useSelector((state: RootState) => state.cartItem)
    const totalProduct = useSelector((state: RootState) => state.cartItem.totalProduct)
    const totalPrice = useSelector((state: RootState) => state.cartItem.totalPrice)
    const totalProductPayment = useSelector((state: RootState) => state.cartItem.totalProductPayment)
    return (
        <div className="cart">
            {
                listCartItem.listProducts.length > 0 ?
                listCartItem.listProducts.map((item, idx) => <CartItem quantity={item.quantity} price={item.price} image={item.image} desc={item.desc} id={item.id} key={idx} />)
                :
                null
            }
            <div className="cart-payment">
                <Row>
                    <Col span={12}></Col>
                    <Col span={12}>
                        <Row style={{ marginTop: '30px' }} justify="space-around">
                            <Col span={5}>
                                <h4>Tổng sản phẩm: <span className="txt-red">{totalProductPayment}</span></h4>
                            </Col>
                            <Col span={10}>
                                <h4>Tổng thanh toán: <span className="txt-red">{totalPrice}</span></h4>
                            </Col>
                            <Col span={5}>
                                <Button type="primary" className="btn-color">Thanh toán</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Cart