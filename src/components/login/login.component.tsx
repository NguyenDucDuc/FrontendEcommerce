import "./login.style.scss"
import { Button, Checkbox, Col, Form, Input, Modal, notification, Row, Spin } from 'antd'
import { useFormik } from 'formik'
import { useEffect, useState } from "react"
import { RootState, useAppDispatch } from "../../store/store"
import Api, { AuthApi, endpoint } from "../../configs/Api"
import { facebookLoginAsyncThunk, googleLoginAsyncThunk, IReqFacebookLogin, IReqGoogleLogin, IReqLogin, loginAsyncThunk, updateStatusFulfilled } from "../../store/slices/user.slice"
import { GoogleLogin } from "@react-oauth/google"
import jwtDecode from "jwt-decode"
import { GiftOutlined, WarningOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getAllItemAsyncThunk, setNullCartItem } from "../../store/slices/cartitem.slice"
import LazyLoad from "react-lazy-load"
import { socket } from '../../App'
import { getAllConversationAsyncThunk } from "../../store/slices/conversation.slice"


interface IResponseGoogleLogin {
  email: string;
  family_name: string;
  given_name: string;
  picture: string;
}



const Login = () => {
  const [api, contextHolder] = notification.useNotification();
  const [errorResponse, setErrorResponse] = useState<string>("")
  const [emailReset, setEmailReset] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const status = useSelector((state: RootState) => state.user.status)
  const dispatch = useAppDispatch()
  const nav = useNavigate()
  useEffect(() => {
    dispatch(updateStatusFulfilled())
  }, [])
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const reqLogin: IReqLogin = {
      username: values.username,
      password: values.password
    }
    const resLoginAsyncThunk = await dispatch(loginAsyncThunk(reqLogin))

    if (resLoginAsyncThunk.type.includes('rejected')) {
      console.log('asbdjasbd')
      setErrorResponse(resLoginAsyncThunk.payload.errors)
      // show notification
      notification.open({
        message: 'Error message',
        description: resLoginAsyncThunk.payload.errors,
        icon: <WarningOutlined style={{ color: 'red' }} />,
        duration: 5
      });

    } else {
      setErrorResponse("")
      localStorage.setItem("accessToken", resLoginAsyncThunk.payload.accessToken)
      notification.success({
        message: 'Thông báo',
        description: 'Đăng nhập thành công',
        duration: 4
      });
      // dispatch to get product in cart for user
      dispatch(getAllItemAsyncThunk())
      // get conversation
      dispatch(getAllConversationAsyncThunk())
      // emit socket 
      socket.emit('clientLogin', {
        userId: resLoginAsyncThunk.payload.user.id
      })
      nav("/")
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const googleLogin = async (acceessToken: string | undefined) => {
    console.log(acceessToken)
    const info: any = jwtDecode(acceessToken || "")
    console.log(info)
    if (info) {
      dispatch(setNullCartItem())
      const reqBody: IReqGoogleLogin = {
        email: info.email,
        firstName: info.family_name,
        lastName: info.given_name,
        avatar: info.picture
      }
      const resGoogleLogin = await dispatch(googleLoginAsyncThunk(reqBody))
      if (resGoogleLogin) {
        localStorage.setItem('accessToken', resGoogleLogin.payload.accessToken)
        console.log("success")
        nav("/")
      }
    }

  }
  const goToResetPassword = () => {
    nav('/reset-password')
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (emailReset != "") {
      const res = await AuthApi().post(endpoint.user.resetPassword, {
        userName: emailReset
      })
      console.log(res.data)
      if (res.data.status == 200) {
        api.success({
          message: 'Thông báo!!',
          description: 'Kiểm tra email để lấy mật khẩu mới!',
          duration: 3,
        });
      };
      setEmailReset("")
      setIsModalOpen(false);
    } else {
      console.log('asd')
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (status === "pending") {
    return <Spin tip="Loading..." size="large">
      <div className="login">
        <div className="form-login">

        </div>
      </div>
    </Spin>
  }
  return (
    <div className="login">
      {contextHolder}
      <div className="form-login">
        <Row className="">
          <Col span={12}>
            <img src="./images/login-ecommerce.png" />
          </Col>
          <Col span={11} className="mg-lr">

            <h1 className="text-color text-center mgb-60 mgt-20">Đăng Nhập</h1>
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
              <Form.Item
                label="Tên tài khoản"
                name="username"
                rules={[{ required: true, message: 'Bắt buộc!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: 'Bắt buộc!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Nhớ mật khẩu</Checkbox>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Row>
                  <Col span={12}>
                    <Button type="primary" htmlType="submit" className="btn-color">
                      Đăng nhập
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button type="primary" style={{ background: '#3399ff' }} onClick={showModal}>
                      Quên mật khẩu
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
            {/* google login */}
            <Row>
              <Col span={8}></Col>
              <Col span={16}>
                <GoogleLogin
                  onSuccess={(credentialResponse) => googleLogin(credentialResponse.credential)}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Modal title="Lấy lại mật khẩu" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <label>Nhập tên tài khoản của bạn</label>
          <Input type="text" required onChange={e => setEmailReset(e.target.value)} />
          <p><b>Lưu ý</b>: sau khi điền tên tài khoản và chọn lấy lại mật khẩu, một mật khẩu mới sẽ được gửi tới email đã đăng ký của bạn, từ đó bạn có thể sử dụng email đó để đăng nhập.</p>
        </Modal>
      </div>

    </div>
  )
}

export default Login