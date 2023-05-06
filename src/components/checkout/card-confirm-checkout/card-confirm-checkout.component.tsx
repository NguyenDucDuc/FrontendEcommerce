import { Button, Col, Row } from "antd";
import "./card-confirm-checkout.style.scss";
import Stripe from "../../payment/payment.component";
import { formatCurrency } from "../../../utils/common";
import { useEffect, useState } from "react";
import { axiosClient } from "../../../lib/axios/axios.config";
import { endpoint } from "../../../configs/Api";
import { FEE_SHIP, PAYMENT } from "../../../constants/order";

interface IProps {
  totalPrice: number;
  testOrder: any;
  shopId: number;
}

const CardConfirmCheckout: React.FC<IProps> = ({
  totalPrice,
  testOrder,
  shopId,
}) => {
  const [shop, setShop] = useState();

  const fetchData = async () => {
    const res = await axiosClient.get(
      endpoint.shop.getDetail(shopId as number)
    );
    setShop(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="card-confirm-checkout">
      <div className="card-confirm-checkout-child">
        <Row>
          <Col span={18}>
            <h3>Phương thức thanh toán</h3>
          </Col>
          <Col span={6}>
            <p style={{ fontWeight: "bold" }}>Thanh toán khi nhận hàng</p>
          </Col>
        </Row>
        <hr className="mgt-20" color="#e6e6e6"></hr>
        <div className="confirm-order">
          <Row>
            <Col span={18}></Col>
            <Col span={6}>
              <Row>
                <Col span={12}>
                  <p className="txt-bold">Tổng tiền hàng: </p>
                </Col>
                <Col span={12}>
                  <p className="txt-bold txt-red">
                    {formatCurrency(totalPrice)}
                  </p>
                </Col>

                <Col span={12}>
                  <p className="txt-bold">Tiền vận chuyển: </p>
                </Col>
                <Col span={12}>
                  <p className="txt-bold txt-red">{formatCurrency(FEE_SHIP.NGOAI_THANH)}</p>
                </Col>

                <Col span={12}>
                  <p className="txt-bold">Tổng tiền: </p>
                </Col>
                <Col span={12}>
                  <p className="txt-bold txt-red" style={{ fontSize: "18px" }}>
                    {formatCurrency(totalPrice + FEE_SHIP.NGOAI_THANH)}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <hr color="#e6e6e6" style={{ marginTop: 10 }}></hr>
        <div className="btn-confirm">
          <Row>
            <Col span={18}>
              <p>
                Xác nhận là bạn đã đồng ý với tất cả điều khoản của chúng tôi.
              </p>
            </Col>
            <Col span={6}>
              <Button
                onClick={() => testOrder(0, PAYMENT.OFFLINE, totalPrice + FEE_SHIP.NGOAI_THANH)}
                type="primary"
                className="btn-color"
                size="large"
                style={{ width: "100%", marginBottom: '20px' }}
              >
                Đặt hàng
              </Button>
              <Stripe
                amount={totalPrice + FEE_SHIP.NGOAI_THANH}
                shopId={shopId}
                testOrder={testOrder}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CardConfirmCheckout;
