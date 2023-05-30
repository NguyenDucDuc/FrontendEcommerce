import { Col, Row } from "antd"
import "./card-chat-user.style.scss"
import { RootState, useAppDispatch } from "../../../store/store"
import { getAllMessageAsyncThunk } from "../../../store/slices/message.slice"
import { useNavigate } from "react-router-dom"
import { socket } from "../../../App"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { currentUserAsyncThunk } from "../../../store/slices/user.slice"
import { updateSelectItemConversation } from "../../../store/slices/conversation.slice"
import moment from 'moment'


interface IProps {
    _id: string
    isSelect: boolean
    content: string
    fullName: string,
    index: number;
    avatar: string;
    lastMessageCreatedAt: string;
}

export const CardChatUser: React.FC<IProps> = ({isSelect, content, fullName, _id, index, avatar, lastMessageCreatedAt}) => {
    const dispatch = useAppDispatch()
    const nav = useNavigate()
    const user = useSelector((state: RootState) => state.user.user)
    const [select, setSelect] = useState<boolean>(false)
    const handleConversation = async () => {
        console.log(index)
        nav(`/chat?conversationId=${_id}`)
        await dispatch(getAllMessageAsyncThunk(_id))
        socket.emit('clientJoinRoom', { conversationId: _id })
        // setSelect(true)
        dispatch(updateSelectItemConversation(index))
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
                        <img src={avatar} style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50
                        }} />
                    </div>
                </Col>
                <Col span={14}>
                    <div className="card-chat-user-right">
                        <p className="customer-name">{fullName}</p>
                        <p className="last-message" style={{fontWeight: 'bold'}}>{content}</p>
                    </div>
                </Col>
                <Col span={4}>
                    <p style={{color: '#737373'}}>{}</p>
                </Col>
            </Row>
        </div>
    )
}