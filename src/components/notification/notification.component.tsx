import { Col, Row } from "antd"
import CardNotification from "./card-notification/cardnotification.component"
import "./notification.style.scss"



const Notification = () => {
    return (
        <div className="notification">
            <Row>
                <CardNotification />
                <CardNotification />
                <CardNotification />
            </Row>
        </div>
    )
}

export default Notification