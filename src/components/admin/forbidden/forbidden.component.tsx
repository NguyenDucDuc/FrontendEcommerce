import { Button } from "antd"
import { useNavigate } from "react-router-dom"
import "./forbidden.style.scss"



const Forbidden = () => {
    const nav = useNavigate()
    return (
        <div className="forbidden">
            <div className="img-forbidden">
                <img src="/images/forbidden.png" />
            </div>
            <div className="btn-redirect">
                <Button type="primary" size="large" className="btn-color" onClick={() => nav('/admin/login')}>Đăng nhập với quyền quản trị viên</Button>
            </div>
            <h1 style={{ textAlign: 'center', fontSize: 100 }}>403</h1>
            <h2 style={{ textAlign: 'center', fontSize: 50 }}>Truy cập bị cấm</h2>
        </div>
    )
}

export default Forbidden