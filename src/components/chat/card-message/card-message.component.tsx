import { Col, Row } from 'antd'
import './card-message.style.scss'
import React from 'react'


interface IProps {
    isSender: boolean
}

export const CardMessage: React.FC<IProps> = ({isSender}) => {
    return (
        <div className='card-message'>
            <div className='card-message-info'>
                <Row>
                    <Col span={5}>
                        <img src='https://i.pravatar.cc/300' style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50
                        }} />
                    </Col>
                    <Col span={18}>
                        <div style={{ marginTop: 5 }}>
                            <p style={{ fontWeight: 'bold' }}>Nguyễn Đức Đức</p>
                            <p style={{ color: '#a6a6a6' }}>15:30</p>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className='card-message-content'>
                <div className='card-message-content__auto'>
                    <p style={isSender ? {background: '#0099e6'}: {}}>kjansd asjdnakd  js njs jsn sjn s kjansd asjdnakd  js njs jsn sjn s</p>
                </div>
            </div>
        </div>
    )
}