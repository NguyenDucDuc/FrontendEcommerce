import { GoogleLogin } from "@react-oauth/google";
import { Button, Checkbox, Col, Form, Input, Row } from "antd"
import { loginAdminAsyncThunk } from "../../../store/slices/user-admin.slice";
import { useAppDispatch } from "../../../store/store";
import "./login-admin.style.scss"


const LoginAdmin = () => {
    const dispatch = useAppDispatch()
    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const reqBody = {
            userName: values.username,
            passWord: values.password
        }
        const dp = await dispatch(loginAdminAsyncThunk(reqBody))
        if (dp.meta.requestStatus === 'fulfilled') {
            localStorage.setItem("accessTokenAdmin", dp.payload.accessToken)
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="login-admin">
            <Row>
                <Col span={12}>
                    <img src="/images/login-admin.png" />
                </Col>
                <Col span={12}>
                    <div className="form-login-admin">
                        <Form
                            name="basic"
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Tên tài khoản"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input size="large" />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password size="large" />
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button size="large" className="btn-color" type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default LoginAdmin