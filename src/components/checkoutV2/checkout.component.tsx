import { AimOutlined } from '@ant-design/icons';
import { Col, Input, Row, message, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { number, string } from 'yup';
import { AuthApi, endpoint } from '../../configs/Api';
import {
  removeItemCheckedFromShopId,
  updateTotalPriceCheckedList,
} from '../../store/slices/product-checked.slice';
import { RootState, useAppDispatch } from '../../store/store';
import CardConfirmCheckout from './card-confirm-checkout/card-confirm-checkout.component';
import CardProductCheckout from './card-product-checkout/card-product-checkout.component';
import './checkout.style.scss';
import { useNavigate } from 'react-router-dom';
import { deleteItemAsyncThunk } from '../../store/slices/cartitem.slice';
import { socket } from '../../utils/socket';
import { createNotification } from '../../utils/notification';
import { axiosClient } from '../../lib/axios/axios.config';
import { FEE_SHIP } from '../../constants/order';
import { formatCurrency } from '../../utils/common';
import { Response } from '../../models/http';
import CardShopCheckout from './card-shop-checkout/card-shop.checkout.component';
const Checkout = () => {
  const [api, contextHolder] = notification.useNotification();
  const nav = useNavigate();
  const listProductsChecked = useSelector(
    (state: RootState) => state.productsChecked.listProductsChecked
  );
  const totalPrice = useSelector(
    (state: RootState) => state.productsChecked.totalPrice
  );
  const dispatch = useAppDispatch();
  const [currentAddress, setCurrentAddress] = useState<any>();
  const [currentUser, setCurrentUser] = useState<any>();
  const [shopId, setShopId] = useState<number>();
  const [cart, setCart] = useState<any>();
  useEffect(() => {
    const calcPrice = () => {
      for (let i = 0; i < listProductsChecked.length; i++) {
        for (let j = 0; j < listProductsChecked[i].products.length; j++) {
          let total =
            Number(listProductsChecked[i].products[j].price) *
            Number(listProductsChecked[i].products[j].quantity);
          dispatch(updateTotalPriceCheckedList(total));
        }
      }
    };
    const getCurrentAddress = async () => {
      const res = await AuthApi().get(endpoint.address.currentAddress);
      setCurrentAddress(res.data.data);
    };
    const getCurrentUser = async () => {
      const res = await AuthApi().get(endpoint.user.currentUser);
      setCurrentUser(res.data.data);
    };
    calcPrice();
    getCurrentAddress();
    getCurrentUser();
    setShopId(listProductsChecked[0].shopId as number);
  }, []);

  const testOrder = async (
    chargeId?: string,
    payment: string = 'Thanh toán khi nhận hàng',
    totalPrice?: number
  ) => {
    const listPromise = [];
    if (listProductsChecked.length > 0) {
      for (let i = 0; i < listProductsChecked.length; i++) {
        // -- create order details
        let orderDetails = [];
        let totalPriceOrder = 0;
        for (let j = 0; j < listProductsChecked[i].products.length; j++) {
          totalPriceOrder +=
            Number(listProductsChecked[i].products[j].quantity) *
            Number(listProductsChecked[i].products[j].price);
          const newOrderDetail = {
            quantity: Number(listProductsChecked[i].products[j].quantity),
            unitPrice: Number(listProductsChecked[i].products[j].price),
            discount: 0,
            productId: listProductsChecked[i].products[j].id,
            productName: listProductsChecked[i].products[j].name,
          };
          orderDetails.push(newOrderDetail);
        }
        listPromise.push(
          AuthApi().post(endpoint.order.buyProduct, {
            shipAddress: `${currentAddress.detail} ${currentAddress.street} - ${currentAddress.ward} - ${currentAddress.district} - ${currentAddress.city}`,
            shopId: listProductsChecked[i].shopId,
            payment: payment,
            state: 1,
            chargeId: chargeId || 0,
            totalPrice: Number(totalPriceOrder) + Number(40000),
            orderDetails,
          })
        );
      }
      Promise.allSettled(listPromise)
        .then((values: any) => {
          let isContinue = true;
          values.forEach(async (res: any) => {
            if (res.status === 'rejected') {
              isContinue = false;
              const req = JSON.parse(res.reason.config.data);

              const shopName = listProductsChecked.find((item: any) => {
                return item.shopId === req.shopId;
              })?.products[0].shopName;

              if (res.reason.response.data.message) {
                message.info(
                  `${res.reason.response.data.message} --- Đơn hàng của cửa hàng ${shopName} không được đặt thành công.`
                );
              }
            }

            if (res.status === 'fulfilled') {
              const user = await axiosClient.get(
                endpoint.shop.getUserByShopID(res.value.data.data.data.shopId)
              );

              await createNotification({
                content: `${currentUser.userName} vừa đặt 1 đơn hàng`,
                type: 1,
                valueId: res.value.data.data.data.id,
                creatorId: currentUser.id,
                userId: user.data.id,
                createdAt: new Date(),
                updatedAt: new Date(),
              });

              socket.emit('sendNotification', {
                senderName: currentUser.userName,
                receiverName: user.data.userName,
                content: `${currentUser.userName} vừa đặt 1 đơn hàng`,
                valueId: res.value.data.data.data.id,
              });

              listProductsChecked.forEach(async (item) => {
                item.products.forEach(async (product) => {
                  if (product.shopId === res.value.data.data.data.shopId) {
                    dispatch(
                      removeItemCheckedFromShopId({
                        shopId: res.value.data.data.data.shopId,
                      })
                    );
                    await dispatch(deleteItemAsyncThunk(product.id as number));
                  }
                });
              });
              api.success({
                message: `Thông báo`,
                description: 'Bạn đã đặt hàng thành công.',
                duration: 2,
              });
              return;
            }
          });
          if (isContinue) {
            setTimeout(() => {
              nav('/');
            }, 1500);
          }
        })
        .catch(async (error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      {contextHolder}
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
            {currentUser !== undefined ? (
              <h4
                style={{ marginTop: 20, marginBottom: 20 }}
              >{`${currentUser.firstName} ${currentUser.lastName} - ${currentUser.phone}`}</h4>
            ) : null}
          </Row>
          <Row>
            {currentAddress !== undefined ? (
              <h4>{`${currentAddress.detail} ${currentAddress.street} - ${currentAddress.ward} - ${currentAddress.district} - ${currentAddress.city}`}</h4>
            ) : null}
          </Row>
        </div>
      </div>
      <div className="list-product">
        {listProductsChecked.length > 0 &&
          listProductsChecked.map((item, idx) => (
            <CardShopCheckout
              shopId={item.shopId as number}
              products={item.products}
            />
          ))}
      </div>
      <div className="confirm-checkout">
        {totalPrice !== 0 ? (
          <CardConfirmCheckout
            testOrder={testOrder}
            totalPrice={totalPrice}
            shopId={shopId as number}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Checkout;
