import { Button, Checkbox, Col, Row, Spin } from "antd"
import { useEffect, useState } from "react"
import LazyLoad from "react-lazy-load"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getAllItemAsyncThunk, setNullTotalPriceAndTotalProduct } from "../../store/slices/cartitem.slice"
import { setNullListProductsChecked } from "../../store/slices/product-checked.slice"
import { RootState, useAppDispatch } from "../../store/store"
import CartItem from "./cart-item/cartitem.component"
import "./cart.style.scss"



const Cart = () => {
    const listCartItem = useSelector((state: RootState) => state.cartItem)
    const totalProduct = useSelector((state: RootState) => state.cartItem.totalProduct)
    const totalPrice = useSelector((state: RootState) => state.cartItem.totalPrice)
    const totalProductPayment = useSelector((state: RootState) => state.cartItem.totalProductPayment)
    const nav = useNavigate()
    const status = useSelector((state: RootState) => state.cartItem.status)
    const dispatch = useAppDispatch()
    useEffect( () => {
        dispatch(setNullListProductsChecked())
        dispatch(setNullTotalPriceAndTotalProduct())
        dispatch(setNullListProductsChecked())
        dispatch(getAllItemAsyncThunk())
    }, [])
    if(status === "pending"){
        return <Spin tip="Loading..." size="large">
            <div className="cart"></div>
        </Spin>
    }
    return (
        <div className="cart">
            {
                listCartItem.listProducts.length > 0 ?
                    listCartItem.listProducts.map((item, idx) => 
                        <CartItem 
                        shopId={item.shopId} 
                        name={item.name} 
                        quantity={item.quantity} 
                        price={item.price} 
                        image={item.image} 
                        desc={item.desc} 
                        id={item.id} 
                        key={idx} />
                    )
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
                                <Button type="primary" className="btn-color" onClick={() => nav("/checkout")}>Thanh toán</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Cart