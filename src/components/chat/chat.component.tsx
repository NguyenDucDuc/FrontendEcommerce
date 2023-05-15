import { Button, Col, Row, message } from "antd"
import "./chat.style.scss"
import { CardChatUser } from "./card-chat-user/card-chat-user.component"
import { useEffect, useRef, useState } from "react"
import { RootState, useAppDispatch } from "../../store/store"
import { CardMessage } from "./card-message/card-message.component"
import { CardMessageReverse } from "./card-message-reverse/card-message-reverse.component"
import { SendOutlined } from "@ant-design/icons"
import { getAllConversationAsyncThunk } from "../../store/slices/conversation.slice"
import { useSelector } from "react-redux"
import { currentUserAsyncThunk } from "../../store/slices/user.slice"
import { useSearchParams } from "react-router-dom"
import { addMessageRedux, createMessageAsynkThunk } from "../../store/slices/message.slice"
import { socket } from "../../App"


export const Chat = () => {
  const dispatch = useAppDispatch()
  const user = useSelector((state: RootState) => state.user.user)
  const listConversation = useSelector((state: RootState) => state.conversation.listConversation)
  const listMessage = useSelector((state: RootState) => state.message.listMessage)
  const [messageContent, setMessageContent] = useState<string>("")
  let [searchParams, setSearchParams] = useSearchParams();
  const scrollableDiv = useRef<any>(null);
  const refContent = useRef<any>(null)

  const scrollToBottom = () => {
    const { scrollHeight, clientHeight } = scrollableDiv.current;
    const scrollPosition = scrollHeight - clientHeight;
    scrollableDiv.current.scrollTo({ top: scrollPosition, behavior: "smooth" });
  }
  const handleSendMessage = async () => {
    if (messageContent !== "") {
      const conversationId = searchParams.get('conversationId')
      const reqBody = {
        content: messageContent,
        conversation: conversationId
      }
      const resNewMessage = await dispatch(createMessageAsynkThunk(reqBody))
      socket.emit('clientSendMessage', resNewMessage.payload)
      const { scrollHeight, clientHeight } = scrollableDiv.current;
      const scrollPosition = scrollHeight - clientHeight;
      scrollableDiv.current.scrollTo({ top: scrollPosition, behavior: "smooth" });
      dispatch(getAllConversationAsyncThunk())
      refContent.current.value = ''
    }

  }
  const test = () => {
    console.log(listConversation)
  }
  useEffect(() => {
    const getAllConversation = () => {
      if (user.id) {
        dispatch(getAllConversationAsyncThunk())
      }
    }
    const getCurrentUser = () => {
      dispatch(currentUserAsyncThunk())
    }

    getCurrentUser()
    getAllConversation()
  }, [])
  useEffect(() => {
    socket.off('serverSendMessage').on('serverSendMessage', (data) => {
      console.log(data)
      dispatch(addMessageRedux(data))
    })
  }, [socket])

  return (
    <div className="chat">
      <Row>
        <Col span={6} style={{}}>
          <div className="chat-left">
            {listConversation.length > 0 ?
              listConversation.map((item, idx) =>
                <CardChatUser index={idx} _id={item._id} isSelect={item.isSelect} fullName={item.name} avatar={item.avatar} content={item.lastMessage !== undefined ? item.lastMessage.content : "Hãy bắt đầu trò truyện"} />
              )
              :
              null
            }
          </div>
        </Col>
        <Col span={1}></Col>
        <Col span={17} style={{}}>
          <div className="chat-right">
            <div className="chat-right-main">
              {
                listMessage !== undefined ?
                  listMessage.map((messageItem) => <CardMessage
                    isCreator={user.id === messageItem.creator.id ? true : false}
                    _id={messageItem._id}
                    content={messageItem.content}
                    fullName={`${messageItem.creator.firstName} ${messageItem.creator.lastName}`}
                    createdAt={messageItem.createdAt}
                    avatar={messageItem.creator.avatar}
                  />)
                  :
                  null
              }
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={6}></Col>
        <Col span={1}></Col>
        <Col span={17}>
          <div className="chat-input" ref={scrollableDiv}>
            <Row>
              <Col span={20}>
                <input ref={refContent} type="text" className="input-message" onChange={(e) => setMessageContent(e.target.value)} />
              </Col>
              <Col span={4}>
                <Button onClick={handleSendMessage} type="primary" className="" style={{
                  width: '80%',
                  height: 40,
                  backgroundColor: '#1a8cff'
                }} icon={<SendOutlined />}>Gửi</Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}