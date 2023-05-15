import { Button } from "antd"
import { useNavigate } from "react-router-dom"



export const ForbiddenV2 = () => {
    const nav = useNavigate()
    return(
        <div className="forbidden-create-shop" style={{
            width: 500,
            margin: '0 auto',
            marginTop: 100
        }}>
            <img src="../images/forbidden.png" style={{
                width: '100%',
                objectFit: 'cover',
                margin: '0 auto'
            }} />
            <Button type="primary" className="btn-color" style={{
                marginLeft: 80
            }} onClick={() => nav('/register-seller')}>Bạn chưa đăng ký đối tác. Đăng ký tại đây!</Button>
        </div>
    )
}