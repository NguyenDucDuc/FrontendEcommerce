import { Button, Checkbox, Col, Row } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import CartItem from "./cart-item/cartitem.component"
import "./cart.style.scss"


const products = [
    {
        id: 1,
        image: "https://cf.shopee.vn/file/sg-11134201-22120-60igl1u0z8kv26",
        price: 350000,
        desc: "Áo varsity thánh giá nam cực khét. Giá chỉ bằng 2 cốc trà sữa."

    },
    {

        id: 2,
        image: "https://cf.shopee.vn/file/sg-11134201-22120-60igl1u0z8kv26",
        price: 350000,
        desc: "Áo varsity thánh giá nam cực khét. Giá chỉ bằng 2 cốc trà sữa."
    },
    {
        id: 3,
        image: "https://cf.shopee.vn/file/sg-11134201-22120-60igl1u0z8kv26",
        price: 350000,
        desc: "Áo varsity thánh giá nam cực khét. Giá chỉ bằng 2 cốc trà sữa."
    }
    , {

        id: 4,
        image: "https://cf.shopee.vn/file/sg-11134201-22120-60igl1u0z8kv26",
        price: 350000,
        desc: "Áo varsity thánh giá nam cực khét. Giá chỉ bằng 2 cốc trà sữa."
    }
]

const Cart = () => {
    const listCartItem = useSelector((state: RootState) => state.cartItem)
    return (
        <div className="cart">
            {
                listCartItem.listCartItem.length > 0 ?
                listCartItem.listCartItem.map((item, idx) => <CartItem quantity={item.quantity} price={item.price} image={item.image} desc={item.desc} id={item.productId} key={idx} />)
                :
                null
            }
            <div className="cart-payment">
                <Row>
                    <Col span={12}></Col>
                    <Col span={12}>
                        <Row style={{ marginTop: '30px' }} justify="space-around">
                            <Col span={5}>
                                <h4>Tổng sản phẩm: <span className="txt-red">0</span></h4>
                            </Col>
                            <Col span={10}>
                                <h4>Tổng thanh toán: <span className="txt-red">0</span></h4>
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