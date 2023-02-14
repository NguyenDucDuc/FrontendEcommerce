import "./Login.scss"
import { Button, Col, Input, Row } from 'antd'
import { useFormik } from 'formik'
import { useState } from "react"
import Api, { endpoint } from "../../ configs/Api"
import { useAppDispatch } from "../../store/store"
import { facebookLoginAsyncThunk, googleLoginAsyncThunk, IReqFacebookLogin, IReqGoogleLogin, IReqLogin, loginAsyncThunk } from "../../store/slices/user.slice"
import { GoogleLogin } from "@react-oauth/google"
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login'
import jwtDecode from "jwt-decode"


interface IResponseGoogleLogin {
    email: string;
    family_name: string;
    given_name: string;
    picture: string;
}

interface IResponseFacebookLogin {
    email?: string;
    name?: string;
    picture?: {
        data?: {
            url?: string;
        }
    }
    id?: string;
}


const Login = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorUsername, setErrorUsername] = useState<string>("")
    const [errorPassword, setErrorPassword] = useState<string>("")
    const dispatch = useAppDispatch()
    const handleLogin = async () => {
        username === "" ? setErrorUsername("username is required !") : setErrorUsername("")
        password === "" ? setErrorPassword("password is required !") : setErrorPassword("")
        if (username !== "" && password !== "") {
            const reqLogin: IReqLogin = {
                username: username,
                password: password
            }
            dispatch(loginAsyncThunk(reqLogin))
        }
    }
    return (
        <div className="login">

            <div className="login-form">
                <Row>
                    <Col span={13} className="login-form-left">
                        <img src="./images/login-ecommerce.png" />
                    </Col>
                    <Col span={11} className="login-form-right">
                        <Col span={18} className="login-form-right__center">
                            <h1>USER LOGIN</h1>
                            {errorUsername !== "" ? <p>{errorUsername}</p> : null}
                            <Input type="text" placeholder="enter your user name" size="large" onChange={e => setUsername(e.target.value)} />
                            {errorPassword !== "" ? <p>{errorPassword}</p> : null}
                            <Input type="password" placeholder="enter your password" size="large" onChange={e => setPassword(e.target.value)} />
                            <Button onClick={handleLogin} type="primary" style={{ padding: '0 40px', margin: '10px 0' }}>Login</Button>
                            <div className="login-diff">
                                <GoogleLogin onSuccess={(res) => {
                                    const decode: IResponseGoogleLogin = jwtDecode(res.credential || "")
                                    if (decode) {
                                        const reqGoogleLogin: IReqGoogleLogin = {
                                            email: decode.email,
                                            firstName: decode.family_name,
                                            lastName: decode.given_name,
                                            avatar: decode.picture
                                        }
                                        dispatch(googleLoginAsyncThunk(reqGoogleLogin))
                                    }
                                }}
                                    shape="pill"
                                    size="large"
                                />

                                <FacebookLogin
                                    appId="1179926095991698"
                                    autoLoad={true}
                                    fields="name,email,picture"
                                    callback={(res:ReactFacebookLoginInfo) => {
                                        const reqFacebookLogin: IReqFacebookLogin = {
                                            userId: parseInt(res.id?.slice(-4)||"88"),
                                            firstName: res.name,
                                            avatar: res.picture?.data.url,
                                            email: res.email
                                        }
                                        dispatch(facebookLoginAsyncThunk(reqFacebookLogin))
                                    }} 
                                    textButton="Login with facebook"
                                    size="small"
                                    icon="fa fa-facebook"
                                    buttonStyle={{background: 'white', color: '#595959', borderRadius: '40px', fontWeight: 'bold', fontSize: '14px', textTransform: 'none'}}
                                />
                            </div>
                        </Col>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Login