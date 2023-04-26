import { Col, Row } from "antd"
import "./card-chat-user.style.scss"
import { RootState, useAppDispatch } from "../../../store/store"
import { getAllMessageAsyncThunk } from "../../../store/slices/message.slice"
import { useNavigate } from "react-router-dom"
import { socket } from "../../../App"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { currentUserAsyncThunk } from "../../../store/slices/user.slice"


interface IProps {
    _id: string
    isSelect: boolean
    content: string
    fullName: string
}

export const CardChatUser: React.FC<IProps> = ({isSelect, content, fullName, _id}) => {
    const dispatch = useAppDispatch()
    const nav = useNavigate()
    const user = useSelector((state: RootState) => state.user.user)
    const handleConversation = async () => {
        nav(`/chat?conversationId=${_id}`)
        await dispatch(getAllMessageAsyncThunk(_id))
        socket.emit('clientJoinRoom', { conversationId: _id })
    }
    useEffect( () => {
        const getCurrentUser = () => {
            dispatch(currentUserAsyncThunk)
        }
        getCurrentUser()
    }, [])
    return (
        <div className="card-chat-user" style={isSelect ? {background: '#f2f2f2', borderRadius: 10, marginLeft: 0} : {}} onClick={handleConversation}>
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
                        <p className="last-message" style={{fontWeight: 'bold'}}>{content}</p>
                    </div>
                </Col>
                <Col span={4}>
                    <p style={{color: '#737373'}}>11:45 PM</p>
                </Col>
            </Row>
        </div>
    )
}