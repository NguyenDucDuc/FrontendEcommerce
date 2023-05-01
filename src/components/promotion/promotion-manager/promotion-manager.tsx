import Table, { ColumnsType } from 'antd/es/table';
import './promotion-manager.style.scss'
import { Button, Form, Input, Modal, Space, Spin, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../../../store/store';
import { deletePromotionAsyncThunk, getAllPromotionAsyncThunk, updatePromotionAsyncThunk } from '../../../store/slices/promotion.slice';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as formik from 'formik'
import moment from 'moment';

interface DataType {
  id: number;
  code: string;
  desc: string;
  value: number;
  dateEnd: string;
}

interface IModal {
  id: number;
  value: number;
  desc: string;
  dateEnd: string;
}



export const PromotionManager = () => {
  const listPromotion = useSelector((state: RootState) => state.promotion.listPromotion)
  const status = useSelector((state: RootState) => state.promotion.status)
  const data: DataType[] = listPromotion;
  const [descForm, setDescForm] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [value, setValue] = useState<number>(0)
  const [dateEnd, setDateEnd] = useState<string>('')
  const [record, setRecord] = useState<IModal>({ id: 0, desc: '', value: 0, dateEnd: '' })
  const { shopId } = useParams()
  const dispatch = useAppDispatch()
  useEffect(() => {
    const getAllPromotion = () => {
      dispatch(getAllPromotionAsyncThunk(Number(shopId)))
    }
    getAllPromotion()
  }, [])
  const handleDeletePromotion = (record: any) => {
    dispatch(deletePromotionAsyncThunk(record.id))
  }
  const columns: ColumnsType<DataType> = [
    {
      title: 'Id',
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
      title: 'Giá trị khuyến mãi',
      key: 'value',
      dataIndex: 'value',
    },
    {
      title: 'Id của sản phẩm',
      key: 'productId',
      dataIndex: 'productId',
    },
    {
      title: 'Ngày kết thúc',
      key: 'dateEnd',
      dataIndex: 'dateEnd',
      render: (_, record) => (<p>{record.dateEnd.split('T')[0]}</p>)
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type='primary' style={{ background: '#00cc99', marginRight: 50, width: 100 }} onClick={() => showModal(record)}>Sửa</Button>
          <Button type='primary' style={{ background: '#ff5050', width: 100 }} onClick={() => handleDeletePromotion(record)}>Xóa</Button>
        </>
      ),
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (record: any) => {
    setRecord(record)
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (desc !== '' && value !== 0 && dateEnd !== '') {
      const reqBody = {
        promotionId: record.id,
        desc,
        value,
        dateEnd
      }
      dispatch(updatePromotionAsyncThunk(reqBody))
      setDesc('')
      setValue(0)
      setDateEnd('')
      setIsModalOpen(false)
    } else {
      setIsModalOpen(true)
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };

  const validateBirthday = (rule: any, value: any) => {
    if (!value || !moment(value, 'YYYY-MM-DD', true).isValid()) {
      return Promise.reject('Hãy chọn ngày tháng năm');
    }
    return Promise.resolve();
  };

  if (status === 'pending')
    return (
      <Spin size='large' tip='Loading...' style={{
        width: '90%',
        marginTop: 170
      }} />
    )

  return (
    <div className="promotion-manager">
      {
        listPromotion.length > 0 ?
          <>
            <Table columns={columns} dataSource={data} pagination={false} />
            <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel} onOk={handleOk}>
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Mô tả"
                  name="desc"
                  rules={[{ required: true, message: 'Bắt buộc!' }]}

                >
                  <Input placeholder={record.desc} onChange={(e) => setDesc(e.target.value)} />
                </Form.Item>

                <Form.Item
                  label='Giá trị'
                  name="value"
                  rules={[{ required: true, message: 'Bắt buộc!' }, { pattern: /^\d+$/, message: 'Giá trị phải là số', }]}
                >
                  <Input placeholder={record.value.toString()} onChange={(e: any) => setValue(e.target.value)} />
                </Form.Item>

                <Form.Item
                  label='Ngày kết thúc'
                  name="dateEnd"
                  rules={[{ required: true, message: 'Bắt buộc!' }, { validator: validateBirthday }]}
                >
                  <Input placeholder={record.dateEnd} type='date' onChange={(e: any) => setDateEnd(e.target.value)} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  {/* <Button type="primary" htmlType="submit" style={{background: '#00cc99'}} >
              Cập nhật
            </Button> */}
                </Form.Item>
              </Form>
            </Modal>
          </>
          :
          null
      }
    </div>
  )
}