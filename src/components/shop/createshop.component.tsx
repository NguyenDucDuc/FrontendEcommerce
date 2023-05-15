import { WarningOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, notification, Row } from "antd"
import { useEffect, useState } from "react";
import Api, { AuthApi, endpoint } from "../../configs/Api";
import "./createshop.style.scss"
import { useNavigate } from "react-router-dom";



const ShopCreate = () => {
    const [api, contextHolder] = notification.useNotification();
    const [image, setImage] = useState<any>()
    const nav = useNavigate()
    useEffect( () => {
        const checkSellerOfficial = async () => {
            const res = await AuthApi().get(endpoint.seller.checkOfficial)
            console.log(res.data)
            if(res.data.data.length === 0 || res.data.status === 400){
                nav('/shop-forbidden')
            }
        }
        checkSellerOfficial()
    }, [])
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
                    <h1 className="text-center mgb-40 text-color mgt-20">Tạo cửa hàng của bạn</h1>
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
                            label="Tên shop"
                            name="shopName"
                            rules={[{ required: true, message: 'Vui lòng nhập tên shop!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mô tả"
                            name="desc"
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả về shop!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Ảnh đại diện"
                            name="image"
                            rules={[{ required: true, message: 'Vui lòng chọn ảnh đại diện!' }]}
                        >
                            <Input type="file" onChange={(e) => imageChange(e)} />
                        </Form.Item>

                        

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" className="btn-color">
                                Xác nhận
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default ShopCreate