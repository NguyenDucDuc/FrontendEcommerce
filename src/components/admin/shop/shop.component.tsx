import { Button, Card, Col, Row, Space, Spin, Statistic, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAdminApi, AuthApi, endpoint } from "../../../configs/Api";
import './shop.style.scss'
import { CarryOutFilled, CarryOutOutlined, DollarOutlined, MoneyCollectOutlined, UserOutlined } from "@ant-design/icons";
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
import { Line } from 'react-chartjs-2';

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
    shopName: string;
    desc: string;
    rate: number;
    isBlock: boolean
}


const AdminShop = () => {
    // set up collumn
    const nav = useNavigate()
    const [show, setShow] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(true)
    const [statsShop, setStatsShop] = useState<any>(null)
    const [dataChart, setDataChart] = useState<any>(null)
    const handleLockShop = async (record: DataType) => {
        const res = await AuthAdminApi().patch(endpoint.shop.lock(record.id))
        console.log(res.data)
        if (res.data.status === 200) {
            setReload(!reload)
        }
    }
    const handleUnLockShop = async (record: DataType) => {
        const res = await AuthAdminApi().patch(endpoint.shop.unLock(record.id))
        console.log(res.data)
        if (res.data.status === 200) {
            setReload(!reload)
        }
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Shop name',
            dataIndex: 'shopName',
            key: 'shopName',
        },
        {
            title: 'Rate',
            dataIndex: 'rate',
            key: 'rate',
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => record.isBlock == true ? <Tag key={record.id} color="#0099ff">Khóa</Tag> : <Tag key={record.id} color="#ff1a75">Mở</Tag>
        },
        {
            title: "Action",
            key: 'action',
            render: (_, record) => record.isBlock == true ? <Button key={record.id} style={{ background: '#00cc99' }} type="primary" onClick={() => handleUnLockShop(record)}>Mở khóa shop</Button> : <Button key={record.id} type="primary" style={{ background: '#ff3333', color: 'white' }} onClick={() => handleLockShop(record)}>Khóa shop</Button>
        }
    ];
    //
    const [shops, setShops] = useState([])
    // data chart
      const data = {
        labels: dataChart !== null && dataChart.map((item: any) => item.month),
        datasets: [
          {
            label: 'Thống kê số cửa hàng mới theo tháng',
            data: dataChart !== null && dataChart.map((item: any) => item.countShop),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.4,
          } 
        ],
      };

    useEffect(() => {
        const getAllShop = async () => {
            try {
                const res = await AuthAdminApi().get(endpoint.shop.getAll)
                console.log(res.data)
                setShops(res.data.data)
            } catch (error) {
                nav("/admin/forbidden")
            }
        }
        const getStatsShop = async () => {
            const res = await AuthAdminApi().get(endpoint.stats.statsShop)
            setStatsShop(res.data.data)
        }
        const getDataChart = async () => {
            const res = await AuthAdminApi().get(endpoint.stats.countShopByMonth)
            setDataChart(res.data.data)
        }
        getStatsShop()
        getDataChart()
        setShow(true)
        getAllShop()
    }, [reload])

    if (show === false) {
        return <Spin tip="Loading..." size="large">
            <div style={{ height: 500 }}>

            </div>
        </Spin>
    }

    return (
        <div className="admin-shop-manager">
            <div className="admin-shop-manager__w-90">
                <div className="data-stats">
                    <Row gutter={[60, 0]}>
                        <Col span={8}>
                            <Card bordered={false}>
                                <Statistic
                                    title="Tổng số cửa hàng"
                                    value={statsShop !== null ? statsShop.countShop : 0}
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
                                    title="Tổng sản phẩm"
                                    value={statsShop !== null ? statsShop.countProduct : 0}
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
                                    title="Tổng số khách hàng"
                                    value={statsShop !== null ? statsShop.countCustomer : 0}
                                    precision={0}
                                    valueStyle={{ color: '#0099ff', fontWeight: 'bold' }}
                                    prefix={<DollarOutlined />}
                                    suffix=""
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div className="chart-shop">
                    <Line data={data}  />
                </div>
                <div className="data-table">
                    {shops.length > 0
                        ?
                        <Table columns={columns} dataSource={shops} pagination={false} />
                        : null
                    }
                </div>

            </div>

        </div>
    )
}

export default AdminShop