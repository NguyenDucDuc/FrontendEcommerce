import { Button, Checkbox, Form, Input, notification } from "antd";
import { useAppDispatch } from "../../../store/store";
import { createPromotionAsyncThunk } from "../../../store/slices/promotion.slice";



export const PromotionCreate = () => {
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useAppDispatch()
    const onFinish = async (values: any) => {
        console.log(values)
        const res = await dispatch(createPromotionAsyncThunk({...values, shopId: 3}))
        if(res.meta.requestStatus === 'fulfilled'){
            api.success({
                message: `Thông báo`,
                description: 'Tạo phiếu giảm giá thành công',
                duration: 3
              });
        }
        console.log(res)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="promotion-create">
             {contextHolder}
            <h2>Tạo phiếu giảm giá cho cửa hàng của bạn</h2>
            <Form
                size="large"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, marginTop: 50 }}

                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Mô tả khuyễn mãi"
                    name="desc"
                    rules={[{ required: true, message: 'Bắt buộc!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Giá trị khuyến mãi"
                    name="value"
                    rules={[{ required: true, message: 'Bắt buộc!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Id của sản phẩm"
                    name="productId"
                    rules={[{ required: true, message: 'Bắt buộc!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Ngày kết thúc"
                    name="dateEnd"
                    rules={[{ required: true, message: 'Bắt buộc!' }]}
                >
                    <Input type="date" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" className="btn-color" style={{ width: 150 }}>
                        Tạo
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}