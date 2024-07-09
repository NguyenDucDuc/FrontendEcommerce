import { Button, Col, Form, Input, Row, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AuthApi, endpoint } from '../../../configs/Api';
import { RootState } from '../../../store/store';
import './profile.style.scss';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../../../lib/axios/axios.config';

const Profile = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const nav = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [shops, setShops] = useState<any[]>([]);
  const getShopByUserId = async () => {
    const res = await axiosClient.get(
      endpoint.shop.getShopByUserID(user.id as number)
    );
    if (res.status === 200) {
      setShops(res.data);
    }
  };

  useEffect(() => {
    getShopByUserId();
  }, []);

  const onFinish = async (values: any) => {
    let body: any = {};
    const decode: any = await jwtDecode(
      localStorage.getItem('accessToken') || ''
    );
    if (values.firstName !== '' && values.firstName !== user.firstName) {
      body.firstName = values.firstName;
    }
    if (values.lastName !== '' && values.lastName !== user.lastName) {
      body.lastName = values.lastName;
    }
    if (values.email !== '' && values.email !== user.email) {
      body.email = values.email;
    }
    if (values.phone !== '' && values.phone !== user.phone) {
      body.phone = values.phone;
    }
    if (values.birthDay !== user.birthDay) {
      body.birthDay = values.birthDay;
    }
    if (values.passWord !== '') {
      body.passWord = values.passWord;
    }
    const res = await AuthApi().patch(
      endpoint.user.updateUser(decode.userId),
      body
    );
    console.log(res.data);
    if (res.data.status === 200) {
      api.success({
        message: 'Thông báo',
        description: 'Cập nhật thông tin thành công!',
        duration: 3,
      });
      setTimeout(() => {
        nav('/');
      }, 1500);
    } else {
      api.error({
        message: 'Thông báo',
        description: 'Cập nhật thất bại, vui lòng kiểm tra lại!!!',
        duration: 3,
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="profile">
      {contextHolder}
      <h1 style={{ marginLeft: '20px' }}>Hồ Sơ Của Tôi</h1>
      <p style={{ marginLeft: '20px' }}>
        Bạn có thể cập nhật thông tin cá nhân của mình.
      </p>
      <div className="profile-child">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          size="large"
        >
          {shops.length > 0 ? (
            <>
              <Form.Item label="Các cửa hàng của bạn">
                <Row gutter={16}>
                  {shops.map((shop: any) => (
                    <Col>
                      <Button onClick={() => nav(`/shop/${shop.id}/dashboard`)}>
                        {shop.shopName}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </Form.Item>
            </>
          ) : (
            ''
          )}

          <Form.Item label="Tên tài khoản" name="userName">
            <Input placeholder={user.userName} disabled />
          </Form.Item>
          <Form.Item label="Mật khẩu" name="passWord">
            <Input.Password />
          </Form.Item>

          <Form.Item label="Họ, tên đệm" name="firstName">
            <Input placeholder={user.firstName} />
          </Form.Item>

          <Form.Item label="Tên Chính" name="lastName">
            <Input placeholder={user.lastName} />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="phone">
            <Input placeholder={user.phone} />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input placeholder={user.email} />
          </Form.Item>

          <Form.Item label="Ngày sinh" name="birthDay">
            <Input type="date" placeholder={user.birthDay} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="btn-color">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
