import { Col, Row } from "antd"
import "./card-chat-user.style.scss"


interface IProps {
    isSelect: boolean
    content: string
    fullName: string
}

export const CardChatUser: React.FC<IProps> = ({isSelect, content, fullName}) => {
    return (
        <div className="card-chat-user" style={isSelect ? {background: '#f2f2f2', borderRadius: 10, marginLeft: 0} : {}}>
            <Row>
                <Col span={4}>
                    <div className="card-chat-user-left">
                        <img src="https://i.pravatar.cc/300" style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50
                        }} />
                    </div>
                </Col>
                <Col span={16}>
                    <div className="card-chat-user-right">
                        <p className="customer-name">{fullName}</p>
                        <p className="last-message">{content}</p>
                    </div>
                </Col>
                <Col span={4}>
                    <p style={{color: '#737373'}}>11:45 PM</p>
                </Col>
            </Row>
        </div>
    )
}