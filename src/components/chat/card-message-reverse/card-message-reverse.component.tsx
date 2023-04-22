import { Col, Row } from 'antd'
import './card-message-reverse.style.scss'


export const CardMessageReverse = () => {
    return (
        <div className='card-message-reverse'>
            <div className='card-message-reverse-info'>
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
            <div className='card-message-reverse-content'>
                <div className='card-message-reverse-content__auto'>
                    <p style={{}}>kjansd asjdnakd  js njs jsn sjn s kjansd asjdnakd  js njs jsn sjn s </p>
                </div>
            </div>
        </div>
    )
}