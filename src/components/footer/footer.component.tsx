import { Col, Row } from 'antd'
import './footer.style.scss'
import { Link } from 'react-router-dom'
import Icon from '@ant-design/icons/lib/components/Icon'
import { AimOutlined, FacebookFilled, InstagramFilled, MailFilled, PhoneFilled, PhoneOutlined } from '@ant-design/icons'


export const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer__width_80'>
        <Row gutter={[100, 0]}>
          <Col span={6}>
            <h2 className='text-color'>ECOMERCE</h2>
            <div className='footer-line'></div>
            <p style={{ lineHeight: 1.7, textAlign: 'justify', marginTop: 20 }}>Chúng tôi muốn tạo ra một sàn thương mại điện tử tốt nhất để phục vụ nhu cầu mua sắm hiện nay của tất cả mọi người.
              Luôn luôn quan tâm đến trải nghiệm của khách hàng, niềm vui của khách hàng là thành công lớn đối với chúng tôi.
            </p>
          </Col>
          <Col span={6}>
            <h2 className='text-color'>DANH MỤC</h2>
            <div className='footer-line'></div>
            <div className='footer-category' style={{ marginTop: 20, lineHeight: 3, color: 'black' }}>
              <Link to='' className='txt-black'><p>Áo thun</p></Link>
              <Link to='' className='txt-black'><p>Máy tính các loại</p></Link>
              <Link to='' className='txt-black'><p>Thời trang nam</p></Link>
              <Link to='' className='txt-black'><p>Đồ điện gia dụng</p></Link>
              <Link to='' className='txt-black'><p>Phụ kiện nội trợ</p></Link>
            </div>

          </Col>
          <Col span={6}>
            <h2 style={{}} className='text-color'>LINK NHANH </h2>
            <div className='footer-line'></div>
            <div className='footer-category' style={{ marginTop: 20, lineHeight: 3 }}>
              <Link to='' className='txt-black'><p>Danh sách sản phẩm</p></Link>
              <Link to='' className='txt-black'><p>Đăng nhập</p></Link>
              <Link to='' className='txt-black'><p>Đăng ký người dùng</p></Link>
              <Link to='' className='txt-black'><p>Tạo cửa hàng của bạn</p></Link>
              <Link to='' className='txt-black'><p>Giỏ hàng</p></Link>
            </div>
          </Col>
          <Col span={6}>
            <h2 style={{}} className='text-color'>LIÊN HỆ</h2>
            <div className='footer-line'></div>
            <div className='footer-category' style={{ marginTop: 20, lineHeight: 3 }}>
              <Link to='' className='txt-black'><p><PhoneFilled style={{ fontSize: 18, marginRight: 10 }} />032 6789 999 </p></Link>
              <Link to='' className='txt-black'><p><MailFilled style={{ fontSize: 18, marginRight: 10 }} />ecommerce@app.vn</p></Link>
              <Link to='' className='txt-black'><p><FacebookFilled style={{ fontSize: 18, marginRight: 10 }} />facebook.com/ecommerce.vn</p></Link>
              <Link to='' className='txt-black'><p><InstagramFilled style={{ fontSize: 18, marginRight: 10 }} />ecommerce.vn.app</p></Link>
              <Link to='' className='txt-black'><p><AimOutlined style={{ fontSize: 18, marginRight: 10 }} />600 Điện Biên Phủ - Phường 1 - Quận 3</p></Link>

            </div>
          </Col>
        </Row>
      </div>
      <div className='copy-right'>
        <p style={{textAlign: 'center', padding: '45px 0', color: 'white'}}>2023 COPY RIGHT: ECOMMERCE-VN-APP.COM</p>
      </div>
    </div>
  )
}