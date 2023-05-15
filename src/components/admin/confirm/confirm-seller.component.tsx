import { Button, Card, Col, Row, Statistic, Tag, notification } from 'antd'
import './confirm-seller.style.scss'
import { CarryOutOutlined, DollarOutlined, UserOutlined } from '@ant-design/icons'
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { AuthAdminApi, AuthApi, endpoint } from '../../../configs/Api';


interface DataType {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}


export const ConfirmSeller = () => {
  const [api, contextHolder] = notification.useNotification();
  const [listSellerUnOfficial, setListSellerUnOfficial] = useState<any []>([])
  const handleConfirm = async (record: DataType) => {
    const res = await AuthAdminApi().post(endpoint.seller.confirm(record.id))
    console.log(res.data)
    if(res.data.status === 200){
        api.success({
          message: `Thông báo`,
          description: `Xác nhận thành công.`,
          duration: 4
        });
        const newListSellerUnOfficial = listSellerUnOfficial.filter((item) => item.id !== record.id)
        setListSellerUnOfficial(newListSellerUnOfficial)
    }
  }
  // data
  const columns: ColumnsType<DataType> = [
    { title: 'Id người dùng', dataIndex: 'id', key: 'id' },
    { title: 'Tên tài khoản', dataIndex: 'userName', key: 'userName' },
    { title: 'Họ, tên lót', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Tên', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Trạng thái', dataIndex: 'isActive', key: 'isActive',
      render: (_, record) => record.isActive == false ? <Tag key={record.id} color="#ff0066">Khóa</Tag> : <Tag key={record.id} color="#0099ff" >Không khóa</Tag>
    },
    {
      title: '',
      dataIndex: 'confirm',
      key: 'confirm',
      render: (_, record) => (
        <Button type='primary'
        onClick={() => handleConfirm(record)}
        style={{
          background: '#1a8cff'
        }}>Xác nhận</Button>
      )
    }
  ];

  useEffect(() => {
    const getListUserUnOfficial = async () => {
      const res = await AuthApi().get(endpoint.seller.getAllUnOfficial)
      console.log(res.data)
      setListSellerUnOfficial(res.data.data)
    }

    getListUserUnOfficial()
  }, [])
  return (
    <div className="admin-confirm-seller">
      {contextHolder}
      <div className="admin-confirm-seller__w-90">
        <div className="admin-confirm-seller-stats">
          <Row gutter={[60, 0]}>
            <Col span={8}>
              <Card bordered={false}>
                <Statistic
                  title="Tổng số khách hàng"
                  value={0}
                  precision={0}
                  valueStyle={{ color: '#0099ff', fontWeight: 'bold' }}
                  prefix={<UserOutlined />}
                  suffix=""
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                <Statistic
                  title="Tổng số lượt mua"
                  value={0}
                  precision={0}
                  valueStyle={{ color: '#0099ff', fontWeight: 'bold' }}
                  prefix={<CarryOutOutlined />}
                  suffix=""
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                <Statistic
                  title="Số khách hàng mới trong tháng"
                  value={0}
                  precision={0}
                  valueStyle={{ color: '#0099ff', fontWeight: 'bold' }}
                  prefix={<DollarOutlined />}
                  suffix=""
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* <div className="admin-seller-chart">
          <Line data={data} />
        </div> */}

        <div className="data-table">
          <Table
            columns={columns}
            dataSource={listSellerUnOfficial}
            size="large"
          />
        </div>
      </div>
    </div>
  )
}