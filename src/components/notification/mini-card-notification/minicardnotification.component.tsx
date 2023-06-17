import { BellOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import "./minicardnotification.style.scss";
import { Link } from "react-router-dom";

interface Props {
  content?: string;
  valueId?: number;
  shopId?: string;
}

const MiniCardNotification: React.FC<Props> = ({ content, valueId, shopId }) => {
  return (
    <div className="mini-card-notification">
       <Link to={`/shop/${shopId}/dashboard/orders`}>
      <Row justify={'space-around'} align={'middle'}>
        <Col span={6}>
          <div className="mini-card-notification-img">
            <img src="https://cf.shopee.vn/file/375ead9ea51d5a8cba6096b3bb926a2c_tn" alt="avatar"/>
          </div>
        </Col>
        <Col span={18}>
          <h4>{content}</h4>
        </Col>
      </Row>
      </Link>
    </div>
  );
};

export default MiniCardNotification;
