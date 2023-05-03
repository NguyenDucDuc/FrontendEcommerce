import { Col, Input, Row } from "antd";
import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import {} from "../../../store/slices/product-checked.slice";
import { RootState, useAppDispatch } from "../../../store/store";
import "./card-product-checkout.style.scss";
import { formatCurrency } from "../../../utils/common";

interface IProps {
  id?: number;
  unitPrice?: number;
  quantity?: number;
  image?: string;
  desc?: string;
  name?: string;
  shopName?: string;
}

const CardProductCheckout: React.FC<IProps> = ({
  id,
  unitPrice,
  quantity,
  image,
  desc,
  name,
  shopName,
}) => {
  const dispatch = useAppDispatch();
  let totalPrice = Number(unitPrice) * Number(quantity);
  useEffect(() => {}, []);
  return (
    <div className="card-product-checkout">
      <div className="card-product-checkout-content">
        <h4>{shopName}</h4>
        <Row align='middle' justify='space-between' style={{ marginTop: 10 }}>
          <Col span={4}>
            <div className="card-img">
              <LazyLoadImage src={image} />
            </div>
          </Col>
          <Col span={8}>
            <h4 style={{textTransform: 'capitalize'}}>{name}</h4>
          </Col>
          <Col span={4}>
            <p style={{ textAlign: "center" }}>
              {formatCurrency(unitPrice as number)}
            </p>
          </Col>
          <Col span={4}>
            <p style={{ textAlign: "center" }}>{quantity}</p>
          </Col>
          <Col span={4}>
            <p
              style={{ textAlign: "center", color: "red", fontWeight: "bold" }}
            >
              {formatCurrency(totalPrice)}
            </p>
          </Col>
        </Row>
        <hr style={{ marginBottom: 20, marginTop: 20 }} color="#e6e6e6"></hr>
        {/* <Row align='middle' justify='space-between'>
          <Col span={8}>
            <Input
              type="text"
              size="large"
              placeholder="Lời nhắn cho shop"
              style={{ border: "1.5px solid #a6a6a6" }}
            />
          </Col>
          <Col span={11}>
            <Row>
              <Col span={8}>
                <p className="">Đơn vị vận chuyển</p>
              </Col>
              <Col span={8}>
                <h4 className="">GHN.VN Giao Hàng Nhanh</h4>
              </Col>
              <Col span={8}>
                <p className="">
                  Phí vận chuyển:{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    {formatCurrency(40000)}
                  </span>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr style={{ marginTop: 20 }} color="#e6e6e6"></hr>
        <Row>
          <div className="total-price">
            <h4>
              Tổng số tiền:{" "}
              <span style={{ color: "red" }}>
                {formatCurrency(totalPrice + 40000)}
              </span>
            </h4>
          </div>
        </Row> */}
      </div>
    </div>
  );
};

export default CardProductCheckout;
