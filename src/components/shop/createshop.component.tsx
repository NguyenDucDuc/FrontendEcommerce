import { Button, Checkbox, Form, Input } from "antd"
import { useState } from "react";
import Api, { AuthApi, endpoint } from "../../ configs/Api";




const ShopCreate = () => {
    const [image, setImage] = useState<any>()
    const onFinish = async (values: any) => {
        console.log('Success:', values);
        console.log(image)
        const formData = new FormData()
        formData.append("shopName", values.shopName)
        formData.append("desc", values.desc)
        formData.append("image", image)
        const res = await AuthApi(). post(endpoint.shop.create, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        console.log(res.data)
      };
      
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
      const imageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files !== null){
            setImage(event.target.files[0])
        }
      }
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
                autoComplete="off"
            >
                <Form.Item
                    label="Shop name"
                    name="shopName"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="desc"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input type="file" onChange={(e) => imageChange(e)} />
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
        </div>
    )
}

export default ShopCreate