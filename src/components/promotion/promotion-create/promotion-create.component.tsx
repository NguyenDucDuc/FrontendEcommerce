import { Button, Checkbox, Form, Input, InputNumber, notification } from 'antd';
import { useAppDispatch } from '../../../store/store';
import { createPromotionAsyncThunk } from '../../../store/slices/promotion.slice';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';

export const PromotionCreate = () => {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { shopId } = useParams();
  const [form] = useForm();
  const onFinish = async (values: any) => {
    await form
      .validateFields()
      .then()
      .catch(() => {
        return;
      });
    if (shopId) {
      const res = await dispatch(
        createPromotionAsyncThunk({ ...values, shopId: shopId })
      );
      if (res.meta.requestStatus === 'fulfilled') {
        api.success({
          message: `Thông báo`,
          description: 'Tạo phiếu giảm giá thành công',
          duration: 4,
        });
        setTimeout(() => {
          nav(`/shop/${shopId}/dashboard/promotion-manager`);
        }, 1500);
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="promotion-create">
      {contextHolder}
      <h2 style={{ margin: '10px' }}>
        Tạo phiếu giảm giá cho cửa hàng của bạn
      </h2>
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
        form={form}
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
          rules={[
            {
              validator: (_, values) => {
                console.log({ values });

                if (values < 0 || values > 1)
                  return Promise.reject(
                    'Giá trị khuyến mãi chỉ được trong khoảng từ 0 -> 1'
                  );
                return Promise.resolve();
              },
            },
          ]}
        >
          <InputNumber
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item
          label="Ngày kết thúc"
          name="dateEnd"
          rules={[{ required: true, message: 'Bắt buộc!' }]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="btn-color"
            style={{ width: 150 }}
          >
            Tạo
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
