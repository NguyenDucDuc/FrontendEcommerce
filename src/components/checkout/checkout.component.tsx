import { AimOutlined } from "@ant-design/icons";
import { Col, Row, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { number, string } from "yup";
import { AuthApi, endpoint } from "../../configs/Api";
import { updateTotalPriceCheckedList } from "../../store/slices/product-checked.slice";
import { RootState, useAppDispatch } from "../../store/store";
import CardConfirmCheckout from "./card-confirm-checkout/card-confirm-checkout.component";
import CardProductCheckout from "./card-product-checkout/card-product-checkout.component";
import "./checkout.style.scss";
import { useNavigate } from "react-router-dom";
import { deleteItemAsyncThunk } from "../../store/slices/cartitem.slice";
import { socket } from "../../utils/socket";
import { createNotification } from "../../utils/notification";
import { axiosClient } from "../../lib/axios/axios.config";
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
              Number(listProductsChecked[i].products[j].quantity) +
            40000;
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
    payment: string = "Thanh toán khi nhận hàng",
    totalPrice?: number
  ) => {
    if (listProductsChecked.length > 0) {
      for (let i = 0; i < listProductsChecked.length; i++) {
        // -- create order details
        let orderDetails = [];
        for (let j = 0; j < listProductsChecked[i].products.length; j++) {
          const newOrderDetail = {
            quantity: Number(listProductsChecked[i].products[j].quantity),
            unitPrice: Number(listProductsChecked[i].products[j].price),
            discount: 0.1,
            productId: listProductsChecked[i].products[j].id,
            productName: listProductsChecked[i].products[j].name,
          };
          orderDetails.push(newOrderDetail);
        }
        const res = await AuthApi().post(endpoint.order.buyProduct, {
          shipAddress: `${currentAddress.detail} ${currentAddress.street} - ${currentAddress.ward} - ${currentAddress.district} - ${currentAddress.city}`,
          shopId: listProductsChecked[i].shopId,
          payment: payment,
          state: 1,
          chargeId: chargeId || 0,
          totalPrice: totalPrice,
          orderDetails,
        });
        if (res.status === 200) {
          const user = await axiosClient.get(
            endpoint.shop.getUserByShopID(res.data.data.data.shopId)
          );

          await createNotification({
            content: `${currentUser.userName} vừa mua 1 đơn hàng`,
            type: 1,
            valueId: res.data.data.data.id,
            creatorId: currentUser.id,
            userId: user.data.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          socket.emit("sendNotification", {
            senderName: currentUser.userName,
            receiverName: user.data.userName,
            content: `${currentUser.userName} vừa mua 1 đơn hàng`,
            valueId: res.data.data.data.id,
          });
        }
      }
      // -- handle delete product cart after comfirm order
      listProductsChecked.forEach(async (item) => {
        item.products.map(async (itemProduct) => {
          if (itemProduct.id !== undefined) {
            await dispatch(deleteItemAsyncThunk(itemProduct.id));
          }
        });
      });
      api.success({
        message: `Thông báo`,
        description: "Bạn đã đặt hàng thành công.",
        duration: 3,
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
              <AimOutlined style={{ fontSize: 25, color: "red" }} />
            </Col>
            <Col span={23}>
              <h3 style={{ color: "red" }}>Địa chỉ nhận hàng</h3>
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
        {/* {
                    listProductsChecked.length > 0 ?
                        listProductsChecked.map((item, idx) => <CardProductCheckout shopName={item.shopName} name={item.name} key={idx} desc={item.desc} image={item.image} id={item.id} quantity={item.quantity} unitPrice={item.price} />)
                        :
                        null
                } */}
        {listProductsChecked.length > 0
          ? listProductsChecked.map((item, idx) =>
              item.products?.map((item, idx) => (
                <CardProductCheckout
                  shopName={item.shopName}
                  name={item.name}
                  key={idx}
                  desc={item.desc}
                  image={item.image}
                  id={item.id}
                  quantity={item.quantity}
                  unitPrice={item.price}
                />
              ))
            )
          : null}
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
