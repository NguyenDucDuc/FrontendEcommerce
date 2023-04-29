import { Button, Checkbox, Col, Row, Spin, notification } from "antd";
import { useEffect, useState } from "react";
import LazyLoad from "react-lazy-load";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllItemAsyncThunk,
  setNullTotalPriceAndTotalProduct,
} from "../../store/slices/cartitem.slice";
import { setNullListProductsChecked } from "../../store/slices/product-checked.slice";
import { RootState, useAppDispatch } from "../../store/store";
import CartItem from "./cart-item/cartitem.component";
import "./cart.style.scss";
import { formatCurrency } from "../../utils/common";
import { count } from "console";

const Cart = () => {
  const [api, contextHolder] = notification.useNotification();
  const listCartItem = useSelector((state: RootState) => state.cartItem);
  const listProductCheked = useSelector((state: RootState) => state.productsChecked.listProductsChecked)
  const totalProduct = useSelector(
    (state: RootState) => state.cartItem.totalProduct
  );
  const totalPrice = useSelector(
    (state: RootState) => state.cartItem.totalPrice
  );
  const totalProductPayment = useSelector(
    (state: RootState) => state.cartItem.totalProductPayment
  );
  const nav = useNavigate();
  const status = useSelector((state: RootState) => state.cartItem.status);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setNullListProductsChecked());
    dispatch(setNullTotalPriceAndTotalProduct());
    dispatch(setNullListProductsChecked());
    dispatch(getAllItemAsyncThunk());
  }, []);
  if (status === "pending") {
    return (
      <Spin tip="Loading..." size="large">
        <div className="cart"></div>
      </Spin>
    );
  }
  const handleGoToCheckout = () => {
    let isOnly = true
    for(let i=0; i< listProductCheked.length; i++){
      if(i > 0){
        isOnly = false
        break
      }
    }
    if(!isOnly){
      api.warning({
        message: 'Thông báo!',
        description: 'Chỉ được thanh toán 1 shop!',
      });
      isOnly = true
      return
    }
    if(listProductCheked.length > 0) {
      nav('/checkout')
    } else {
      api.warning({
        message: 'Thông báo!',
        description: 'Bạn chưa chọn sản phẩm!',
      });
    }
  }
  return (
    <div className="cart">
      {contextHolder}
      {listCartItem.listProducts.length > 0
        ? listCartItem.listProducts.map((item) => (
            <CartItem product={item} key={item.id} quantity={1} />
          ))
        : null}
      <div className="cart-payment">
        <Row>
          <Col span={12}></Col>
          <Col span={12}>
            <Row style={{ marginTop: "30px" }} justify="space-around">
              <Col span={5}>
                <h4>
                  Tổng sản phẩm:{" "}
                  <span className="txt-red">{totalProductPayment}</span>
                </h4>
              </Col>
              <Col span={10}>
                <h4>
                  Tổng thanh toán: <span className="txt-red">{formatCurrency(totalPrice)}</span>
                </h4>
              </Col>
              <Col span={5}>
                <Button
                  type="primary"
                  className="btn-color"
                  onClick={handleGoToCheckout}
                >
                  Thanh toán
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Cart;
