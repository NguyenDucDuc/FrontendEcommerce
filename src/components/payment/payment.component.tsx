import React, { useEffect, useRef, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { authAxios, axiosClient } from '../../lib/axios/axios.config';
import { AuthApi, endpoint } from '../../configs/Api';
import './payment.style.scss';
import { Button, message, notification } from 'antd';
import { formatCurrency } from '../../utils/common';
import { PAYMENT } from '../../constants/order';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { createNotification } from '../../utils/notification';
import { socket } from '../../utils/socket';
import {
  removeItemCheckedFromShopId,
  setNullTotalPriceCheckedList,
  updateTotalPriceCheckedList,
} from '../../store/slices/product-checked.slice';
import { deleteItemAsyncThunk } from '../../store/slices/cartitem.slice';
import { useNavigate } from 'react-router-dom';

interface Props {
  amount?: number;
  shopId: number;
  testOrder: (chargeId?: string, payment?: string, totalPrice?: number) => any;
}

const Stripe: React.FC<Props> = ({ amount, shopId, testOrder }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const btnRef = useRef<any>(null);
  const [stripeToken, setStripeToken] = useState<any>(null);
  const [api, contextHolder] = notification.useNotification();
  const listProductsChecked = useSelector(
    (state: RootState) => state.productsChecked.listProductsChecked
  );
  const [shopId2, setShopId2] = useState<number>();
  const dispatch = useAppDispatch();
  const [currentAddress, setCurrentAddress] = useState<any>();
  const [currentUser, setCurrentUser] = useState<any>();

  const [shop, setShop] = useState<any[]>([]);
  const getShopByUserId = async () => {
    const res = await axiosClient.get(
      endpoint.shop.getShopByUserID(user.id as number)
    );
    if (res.status === 200) {
      setShop(res.data);
    }
  };

  useEffect(() => {
    const calcPrice = () => {
      dispatch(setNullTotalPriceCheckedList())
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
    setShopId2(listProductsChecked[0].shopId as number);
    getShopByUserId()
  }, []);
  const nav = useNavigate();

  const onToken = (token: any) => {
    setStripeToken(token);
  };
  const updateTotalPriceShop = async (shopId: number, amount: number) => {
    await axiosClient.put(endpoint.shop.update(shopId), {
      amount: amount,
    });
  };
  const makeRequest = async () => {
    try {
      const res: any = await authAxios().post(endpoint.payment.checkout, {
        token: { id: stripeToken.id },
        amount: amount,
      });
      await testOrderV2(res.id as string, PAYMENT.ONLINE);
    } catch (error) {
      console.log(error);
    }
  };

  const testOrderV2 = async (
    chargeId?: string,
    payment: string = 'Thanh toán khi nhận hàng',
    totalPrice?: number
  ) => {
    const listPromise = [];
    if (listProductsChecked.length > 0) {
      for (let i = 0; i < listProductsChecked.length; i++) {
        // -- create order details
        let totalPriceOrder = 0;
        let orderDetails = [];
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

              await updateTotalPriceShop(
                res.value.data.data.data.shopId,
                res.value.data.data.data.totalPrice
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

  useEffect(() => {
    stripeToken && makeRequest();
  }, [stripeToken]);
  return (
    <>
      <Button
        onClick={() => btnRef.current.onClick()}
        type="primary"
        className="btn-payment"
        size="large"
        style={{ width: '100%' }}
      >
        Thanh toán
        <StripeCheckout
          ref={btnRef}
          name={'NamĐNH'}
          image={'https://res.cloudinary.com/de5pwc5fq/image/upload/v1687073715/homepage_zcizty.png'}
          billingAddress
          shippingAddress
          description={`Tổng tiền ${formatCurrency(amount as number)}`}
          amount={amount}
          token={onToken}
          currency="vnd"
          stripeKey={process.env.REACT_APP_STRIPE_KEY as string}
        />
      </Button>
    </>
  );
};

export default Stripe;
