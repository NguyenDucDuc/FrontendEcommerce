import { Button, Card, Col, Row, Spin, Statistic, Table, Tag } from "antd"
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api, { AuthAdminApi, AuthApi, endpoint } from "../../configs/Api";
import './seller.style.scss'
import { CarryOutOutlined, DollarOutlined, UserOutlined } from "@ant-design/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


interface DataType {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}




const SellerAdmin = () => {
  // const rowClick: any = () => {
  //   console.log("row click")
  // }
  const nav = useNavigate()
  const [sellers, setSellers] = useState<DataType[]>([])
  const [reload, setReload] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(true)
  const [dataChart, setDataChart] = useState<any[]>([])

  const handleBlockUser = async (record: DataType) => {
    const res = await AuthAdminApi().patch(endpoint.seller.lock(record.id))
    setReload(!reload)
  }
  const handleUnLock = async (recode: DataType) => {
    const res = await AuthAdminApi().patch(endpoint.seller.unLock(recode.id))
    console.log(res.data)
    setReload(!reload)
  }
  // Data
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
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        // record.isActive == true ? <p onClick={() => handleBlockUser(record)} style={{ cursor: 'pointer' }}>Khóa tài khoản</p> : <p style={{ cursor: 'pointer' }} onClick={() => handleUnLock(record)}>Mở khóa</p>
        record.isActive == true ? <Button type="primary" onClick={() => handleBlockUser(record)} style={{ background: '#ff1a1a' }}>Khóa tài khoản</Button> : <Button type="primary" style={{ background: '#00cc99' }} onClick={() => handleUnLock(record)}>Mở khóa</Button>
      )
    }
  ];

  // data chartjs
  const data: any = {
    labels: dataChart.length > 0 && dataChart.map((item: any) => item.month),
    datasets: [
      {
        label: 'My First dataset',
        data: dataChart.length > 0 && dataChart.map((item: any) => item.countCustomer),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
      }
    ],
  };


  useEffect(() => {
    const getAllSeller = async () => {
      const res = await Api.get(endpoint.seller.getAll)
      setSellers(res.data.data)
    }
    const getDataChart = async () => {
      const res = await AuthApi().get(endpoint.stats.countUserByMonth)
      setDataChart(res.data.data)
    }
    getDataChart()
    getAllSeller()
  }, [reload])

  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await AuthAdminApi().get(endpoint.user.roleAdmin)
      } catch (error) {
        nav("/admin/forbidden")
      }

    }
    checkRole()
    setShow(false)
  }, [])
  if (show === true) {
    return <Spin tip="Loading..." size="large">
      <div style={{ height: 600 }}>

      </div>
    </Spin>
  }
  return (
    <div  className="admin-seller">
      <div className="admin-seller__w-90">
        <div className="admin-seller-stats">
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

        <div className="admin-seller-chart">
          <Line data={data} />
        </div>

        <div className="data-table">
          {sellers.length > 0
            ?
            <Table
              columns={columns}
              dataSource={sellers}
              size="large"
            />
            :
            null
          }
        </div>
      </div>
    </div>
  )
}

export default SellerAdmin