import "./Login.scss"
import { Button, Col, Input, Row } from 'antd'
import {useFormik} from 'formik'
import { useState } from "react"
import Api, { endpoint } from "../../ configs/Api"
import { useAppDispatch } from "../../store/store"
import { IReqLogin, loginAsyncThunk } from "../../store/slices/user.slice"





const Login = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorUsername, setErrorUsername] = useState<string>("")
    const [errorPassword, setErrorPassword] = useState<string>("")
    const dispatch = useAppDispatch()
    const handleLogin = async () => {
        username === "" ? setErrorUsername("username is required !") : setErrorUsername("")
        password === "" ? setErrorPassword("password is required !") : setErrorPassword("")
        if(username !== "" && password !== ""){
            const reqLogin:IReqLogin = {
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
                            <Input type="password"  placeholder="enter your password" size="large" onChange={e => setPassword(e.target.value)} />
                            <Button onClick={handleLogin} type="primary" style={{padding: '0 40px', margin: '10px 0'}}>Login</Button>
                            
                        </Col>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Login