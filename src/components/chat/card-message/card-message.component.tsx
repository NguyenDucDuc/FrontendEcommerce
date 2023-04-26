import { Col, Row } from 'antd'
import './card-message.style.scss'
import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../store/store'
import moment from 'moment'
interface IProps {
    _id: string
    content: string
    createdAt: string
    fullName: string
    avatar: string
    isCreator: boolean
}

export const CardMessage: React.FC<IProps> = ({_id, content, createdAt, fullName, isCreator, avatar}) => {
    const hour = moment(createdAt).fromNow()
    return (
        <div className='card-message' style={isCreator ? {marginLeft: '40%'} : {}}>
            <div className='card-message-info' style={isCreator ? {marginLeft: '65%'} : {}}>
                <Row>
                    <Col span={5}>
                        <img src={avatar} style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50
                        }} />
                    </Col>
                    <Col span={18}>
                        <div style={{ marginTop: 5 }}>
                            <p style={{ fontWeight: 'bold' }}>{fullName}</p>
                            <p style={{ color: '#a6a6a6' }}>{hour}</p>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className='card-message-content' >
                <div className='card-message-content__auto'>
                    <p style={isCreator ? {background: '#1a8cff', color: 'white'} : {}}>{content}</p>
                </div>
            </div>
        </div>
    )
}