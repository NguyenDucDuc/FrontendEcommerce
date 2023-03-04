import { BellOutlined } from "@ant-design/icons"
import { Col, Row } from "antd"
import "./minicardnotification.style.scss"



const MiniCardNotification = () => {
    return (
        <div className="mini-card-notification">
            <Row>
                <Col span={6}>
                    <div className="mini-card-notification-img">
                        <img src="https://cf.shopee.vn/file/375ead9ea51d5a8cba6096b3bb926a2c_tn" />
                    </div>
                </Col>
                <Col span={18}>
                    <h4>Hades studio vừa cập nhật sản phẩm mới.</h4>
                </Col>
            </Row>
        </div>
    )
}

export default MiniCardNotification