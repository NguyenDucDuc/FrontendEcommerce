import Table, { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import './promotion-manager.style.scss';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  RadioChangeEvent,
  Space,
  Spin,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../../../store/store';
import { updatePromotionAsyncThunk } from '../../../store/slices/promotion.slice';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { formatDateString } from '../../../utils/common';
import { Pagination } from '../../user-profile/manage-order/order-user';
import { axiosClient } from '../../../lib/axios/axios.config';
import { endpoint } from '../../../configs/Api';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

interface DataType {
  id: number;
  code: string;
  desc: string;
  value: number;
  dateEnd: string;
  isActive: boolean;
}

interface IModal {
  id: number;
  value: number;
  desc: string;
  dateEnd: string;
  isActive: boolean;
}

export const PromotionManager = () => {
  const listPromotion = useSelector(
    (state: RootState) => state.promotion.listPromotion
  );
  const status = useSelector((state: RootState) => state.promotion.status);
  const [desc, setDesc] = useState<string>('');
  const [value, setValue] = useState<number>(0);
  const [dateEnd, setDateEnd] = useState<string>('');
  const [record, setRecord] = useState<IModal>({
    id: 0,
    desc: '',
    value: 0,
    dateEnd: '',
    isActive: true,
  });
  const [promotions, setPromotions] = useState([]);
  const { shopId } = useParams();
  const dispatch = useAppDispatch();

  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    pageSize: 5,
  });

  const getAllPromotion = async (pageNumber: number) => {
    try {
      const res = await axiosClient.get(
        endpoint.promotion.getPromotionByShop(Number(shopId)),
        {
          params: {
            pageNumber,
          },
        }
      );
      if (res.status === 200) {
        setPromotions(res.data?.listPromotion);
        setPagination((pre) => {
          return { ...pre, total: res.data.totalRecords };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPromotion(pagination.current as number);
  }, []);

  const handleChangeTable = async (e: TablePaginationConfig) => {
    setPagination((pre) => {
      return { ...pre, current: e.current as number };
    });
    await getAllPromotion(e.current as number);
  };

  const handleDeletePromotion = async (id: number) => {
    try {
      const res: any = await axiosClient.delete(endpoint.promotion.delete(id));
      if (res.status === 200) {
        message.info(res.message);
        await getAllPromotion(pagination.current as number);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <a>{id}</a>,
    },
    {
      title: 'Mã code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Mô tả',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Hiệu lực',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <span>{isActive ? 'Còn hiệu lực' : 'Không còn hiệu lực'}</span>
      ),
    },

    {
      title: 'Giá trị khuyến mãi',
      key: 'value',
      dataIndex: 'value',
      align: 'center',
      render: (value) => <span>{value * 100}%</span>,
    },
    {
      title: 'Ngày kết thúc',
      key: 'dateEnd',
      dataIndex: 'dateEnd',
      align: 'center',
      render: (_, record) => <span>{formatDateString(record?.dateEnd)}</span>,
    },

    {
      key: '',
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button
              onClick={() => showModal(record)}
              icon={<EditOutlined style={{ color: 'green' }} />}
            ></Button>
            <Button
              onClick={() => handleDeletePromotion(record.id)}
              disabled={!record.isActive}
              icon={<DeleteOutlined style={{ color: 'red' }} />}
            ></Button>
          </Space>
        );
      },
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (record: any) => {
    setRecord(record);
    setIsModalOpen(true);
  };

  const [form] = Form.useForm();

  const handleUploadPromotion = async (id: number, promotionUpdate: any) => {
    try {
      if (promotionUpdate.value) {
        promotionUpdate.value /= 100;
      }
      const res: any = await axiosClient.put(
        endpoint.promotion.update(id),
        promotionUpdate
      );
      if (res.status === 200) {
        message.info(res.message);
        await getAllPromotion(pagination.current as number);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [valueRadio, setValueRadio] = useState(true);

  const onChange = (e: RadioChangeEvent) => {
    setValueRadio(e.target.value);
  };

  const handleOk = () => {
    form.validateFields().then(() => {
      handleUploadPromotion(record.id, form.getFieldsValue());
      form.resetFields();
      setDesc('');
      setValue(0);
      setDateEnd('');
      setValueRadio(true);
      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const validateBirthday = (rule: any, value: any) => {
    if (!value || !moment(value, 'YYYY-MM-DD', true).isValid()) {
      return Promise.reject('Hãy chọn ngày tháng năm');
    }
    return Promise.resolve();
  };

  if (status === 'pending')
    return (
      <Spin
        size="large"
        tip="Loading..."
        style={{
          width: '90%',
          marginTop: 170,
        }}
      />
    );

  return (
    <div className="promotion-manager">
      {
        <>
          <Table
            columns={columns}
            dataSource={promotions}
            onChange={handleChangeTable}
            pagination={{
              ...pagination,
              defaultPageSize: 5,
            }}
          />
          <Modal
            title="Chỉnh sửa khuyến mãi"
            open={isModalOpen}
            onCancel={handleCancel}
            onOk={handleOk}
          >
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              onFinish={onFinish}
              autoComplete="off"
              form={form}
            >
              <Form.Item label="Mô tả" name="desc">
                <Input
                  placeholder={record.desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Giá trị"
                name="value"
                rules={[
                  {
                    validator: (_, values) => {
                      console.log({ values });

                      if (values < 0 || values > 100)
                        return Promise.reject(
                          'Giá trị khuyến mãi chỉ được trong khoảng từ 0 -> 100'
                        );
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder={record.value.toString()}
                  onChange={(e: any) => setValue(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Giá trị" name="isActive">
                <Radio.Group onChange={onChange} value={valueRadio}>
                  <Space direction="horizontal">
                    <Radio value={true}>Kích hoạt</Radio>
                    <Radio value={false}>Bỏ kích hoạt</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="Ngày kết thúc" name="dateEnd">
                <Input
                  placeholder={record.dateEnd}
                  type="date"
                  onChange={(e: any) => setDateEnd(e.target.value)}
                />
              </Form.Item>
            </Form>
          </Modal>
        </>
      }
    </div>
  );
};
