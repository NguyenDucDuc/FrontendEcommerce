import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, DatePickerProps, Form, Input, InputRef, Upload } from "antd"
import axios from "axios";
import { useRef, useState } from "react";
import Api, { endpoint } from "../../ configs/Api";





const Register = () => {
    const [av, setAv] = useState<any>()
    const [avatar, setAvatar] = useState<any>()
    const onFinish = async (values: any) => {
        values.avatar = avatar
        console.log('Success:', values);
        let formData = new FormData()
        formData.append("userName", values.userName)
        formData.append("passWord", values.passWord)
        formData.append("firstName", values.firstName)
        formData.append("lastName", values.lastName)
        formData.append("avatar", avatar)
        formData.append("phone", values.phone)
        formData.append("email", values.email)
        formData.append("city", values.city)
        formData.append("district", values.district)
        formData.append("ward", values.ward)
        formData.append("street", values.street)
        formData.append("detail", values.detail)
        formData.append("birthDay", values.birthDay)
        const res = await Api.post(endpoint.user.register, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        console.log(res.data)
        
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const display = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files)
        {
            setAvatar(event.target.files[0])
        }
        
    }
    const display2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files)
        {
            setAv(event.target.files[0])
        }
        
    }
    const upload = async () => {
        let formData = new FormData()
        formData.append("avatar", avatar)
        const res = await Api.post("/user/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        console.log(res.data)
    }

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(dateString)
      };
    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
                <Form.Item
                    label="Username"
                    name="userName"
                    rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="First name"
                    name="firstName"
                    rules={[{ required: true, message: 'Please input your first name!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Last name"
                    name="lastName"
                    rules={[{ required: true, message: 'Please input your last name!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Birth day"
                    name="birthDay"
                    rules={[{ required: true, message: 'Please input your last name!' }]}>
                    <Input type="date" />
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your last name!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your last name!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="City"
                    name="city"
                    rules={[{ required: true, message: 'Please input your last name!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="District"
                    name="district"
                    rules={[{ required: true, message: 'Please input your last name!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Ward"
                    name="ward"
                    rules={[{ required: true, message: 'Please input your last name!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Street"
                    name="street"
                    rules={[{ required: true, message: 'Please input your last name!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Avatar"
                    name="avatar"
                    rules={[{ required: true, message: 'Please input your last name!' }]}>
                    <Input type="file" onChange={(e) => display(e)} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="passWord"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            <DatePicker onChange={onChange} />
        </div>
    )
}

export default Register