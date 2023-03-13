import "./login.style.scss"
import { Button, Checkbox, Col, Form, Input, notification, Row, Spin } from 'antd'
import { useFormik } from 'formik'
import { useState } from "react"
import Api, { endpoint } from "../../ configs/Api"
import { RootState, useAppDispatch } from "../../store/store"
import { facebookLoginAsyncThunk, googleLoginAsyncThunk, IReqFacebookLogin, IReqGoogleLogin, IReqLogin, loginAsyncThunk } from "../../store/slices/user.slice"
import { GoogleLogin } from "@react-oauth/google"
import jwtDecode from "jwt-decode"
import { GiftOutlined, WarningOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


interface IResponseGoogleLogin {
    email: string;
    family_name: string;
    given_name: string;
    picture: string;
}



const Login = () => {
    const [errorResponse, setErrorResponse] = useState<string>("")
    const status = useSelector((state: RootState) => state.user.status)
    const dispatch = useAppDispatch()
    const nav = useNavigate()
    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const reqLogin: IReqLogin = {
            username: values.username,
            password: values.password
        }
        const resLoginAsyncThunk = await dispatch(loginAsyncThunk(reqLogin))
        console.log(resLoginAsyncThunk)
        if (resLoginAsyncThunk.type.includes('rejected')) {
            setErrorResponse(resLoginAsyncThunk.payload.data)
            // show notification
            notification.open({
                message: 'Error message',
                description: resLoginAsyncThunk.payload.data,
                icon: <WarningOutlined style={{ color: 'red' }} />,
                duration: 5
            });

        } else {
            setErrorResponse("")
            localStorage.setItem("accessToken", resLoginAsyncThunk.payload.accessToken)
            notification.open({
                message: 'Login success',
                description: '',
                icon: <GiftOutlined style={{ color: 'green' }} />,
                duration: 5
            });
            nav("/home")
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    if(status === "pending"){
        return <Spin tip="Loading..." size="large">
            <div className="login">
                
            </div>
        </Spin>
    }
    return (
        <div className="login">
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
                                <Button type="primary" htmlType="submit" className="btn-color">
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Login