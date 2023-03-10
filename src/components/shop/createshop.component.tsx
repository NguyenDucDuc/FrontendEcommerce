import { WarningOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, notification, Row } from "antd"
import { useState } from "react";
import Api, { AuthApi, endpoint } from "../../ configs/Api";
import "./createshop.style.scss"



const ShopCreate = () => {
    const [api, contextHolder] = notification.useNotification();
    const [image, setImage] = useState<any>()
    const onFinish = async (values: any) => {
        try {
            console.log('Success:', values);
            console.log(image)
            const formData = new FormData()
            formData.append("shopName", values.shopName)
            formData.append("desc", values.desc)
            formData.append("image", image)
            const res = await AuthApi().post(endpoint.shop.create, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log(res.data)
        } catch (error: any) {
            console.log(error.response.data.errors)
            api.open({
                icon: <WarningOutlined style={{color: 'red'}} /> ,
                message: 'Create error',
                description:`${error.response.data.errors}`,
                duration: 4
              });
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const imageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            setImage(event.target.files[0])
        }
    }
    return (
        <div className="create-shop">
            {contextHolder}
            <Row>
                <Col span={12}>
                    <img src="./images/login-ecommerce.png" />
                </Col>
                <Col span={12}>
                    <h1 className="text-center mgb-40 text-color mgt-20">Crete Your Store</h1>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Shop name"
                            name="shopName"
                            rules={[{ required: true, message: 'Please input your shop name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="desc"
                            rules={[{ required: true, message: 'Please input your description!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Choose your shop avatar !' }]}
                        >
                            <Input type="file" onChange={(e) => imageChange(e)} />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox style={{ accentColor: 'red' }}>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" className="btn-color">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default ShopCreate