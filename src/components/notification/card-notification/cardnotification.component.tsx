import { Col, Row } from "antd";
import "./cardnotification.style.scss";

interface Props {
  content?: string;
  valueId?: number;
}

const CardNotification: React.FC<Props> = ({ content, valueId }) => {
  return (
    <div className="card-notification">
      <Row>
        <Col span={4}>
          <div className="notification-img">
            <img src="https://cf.shopee.vn/file/375ead9ea51d5a8cba6096b3bb926a2c_tn" />
          </div>
        </Col>
        <Col span={20}>
          <h4>{content}</h4>
        </Col>
      </Row>
    </div>
  );
};

export default CardNotification;
