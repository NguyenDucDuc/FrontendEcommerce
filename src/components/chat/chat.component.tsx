import { Button, Col, Row } from "antd"
import "./chat.style.scss"
import { CardChatUser } from "./card-chat-user/card-chat-user.component"
import { useEffect } from "react"
import { useAppDispatch } from "../../store/store"
import { getAllMessageAsyncThunk } from "../../store/slices/message.slice"
import { CardMessage } from "./card-message/card-message.component"
import { CardMessageReverse } from "./card-message-reverse/card-message-reverse.component"
import { SendOutlined } from "@ant-design/icons"


export const Chat = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const getAllMessage = () => {

        }
    }, [])
    return (
        <div className="chat">
            <Row>
                <Col span={6} style={{}}>
                    <div className="chat-left">
                        <CardChatUser isSelect={false} fullName="Nguyen Duc Duc" content="Dạo này ổn chứ ?" />
                        <CardChatUser isSelect={false} fullName="Nguyen Duc Duc" content="Dạo này ổn chứ ?" />
                        <CardChatUser isSelect={false} fullName="Nguyen Duc Duc" content="Dạo này ổn chứ ?" />
                        <CardChatUser isSelect={false} fullName="Nguyen Duc Duc" content="Dạo này ổn chứ ?" />
                        <CardChatUser isSelect={true} fullName="Nguyen Duc Duc" content="Dạo này ổn chứ ?" />
                    </div>
                </Col>
                <Col span={1}></Col>
                <Col span={17} style={{}}>
                    <div className="chat-right">
                        <div className="chat-right-main">
                            <CardMessage isSender={false} />
                            <CardMessage isSender={true} />
                            <CardMessage isSender={true} />
                            <CardMessage isSender={false} />
                            <CardMessage isSender={false} />
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={6}></Col>
                <Col span={1}></Col>
                <Col span={17}>
                    <div className="chat-input">
                        <Row>
                            <Col span={20}>
                                <input type="text" className="input-message"/>
                            </Col>
                            <Col span={4}>
                                <Button type="primary" className="btn-color" style={{
                                    width: '80%',
                                    height: 40
                                }} icon={<SendOutlined />}>Gửi</Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}