import { AimOutlined } from "@ant-design/icons"
import { Col, Row } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateTotalPriceCheckedList } from "../../store/slices/product-checked.slice"
import { RootState, useAppDispatch } from "../../store/store"
import CardConfirmCheckout from "./card-confirm-checkout/card-confirm-checkout.component"
import CardProductCheckout from "./card-product-checkout/card-product-checkout.component"
import "./checkout.style.scss"



const Checkout = () => {
    const listProductsChecked = useSelector((state: RootState) => state.productsChecked.listProductsChecked)
    const totalPrice = useSelector((state: RootState) => state.productsChecked.totalPrice)
    const dispatch = useAppDispatch()
    useEffect(() => {
        const calcPrice = () => {
            for(let i=0; i<listProductsChecked.length; i++){
                let total = Number(listProductsChecked[i].price) * Number(listProductsChecked[i].quantity) + 40000
                console.log(total)
                dispatch(updateTotalPriceCheckedList(total))
            }
        }
        calcPrice()
    },[])
    return (
        <div>
            <div className="address">
                <div className="address-child">
                    <Row>
                        <Col span={1}>
                            <AimOutlined style={{ fontSize: 25, color: 'red' }} />
                        </Col>
                        <Col span={23}>
                            <h3 style={{ color: 'red' }}>Địa chỉ nhận hàng</h3>
                        </Col>
                    </Row>
                    <Row>
                        <h4 style={{ marginTop: 20, marginBottom: 20 }}>Nguyễn Đức Đức-0356879921</h4>
                    </Row>
                    <Row>
                        <h4>623 Điện Biên Phủ - Phường 1 - Quận 3 - TP.Hồ Chí Minh</h4>
                    </Row>
                </div>
            </div>
            <div className="list-product">
                {
                    listProductsChecked.length > 0 ? 
                    listProductsChecked.map((item, idx) => <CardProductCheckout name={item.name} key={idx} desc={item.desc} image={item.image} id={item.id} quantity={item.quantity} unitPrice={item.price} />)
                    :
                    null
                }
            </div>
            <div className="confirm-checkout">
                {
                    totalPrice !== 0 ?
                    <CardConfirmCheckout totalPrice={totalPrice} />
                    : null
                }
            </div>
        </div>
    )
}

export default Checkout