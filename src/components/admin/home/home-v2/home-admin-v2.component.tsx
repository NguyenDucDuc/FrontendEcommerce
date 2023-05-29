import { Card, Col, Row, Statistic } from 'antd'
import './home-admin-v2.style.scss'
import { ArrowUpOutlined, GroupOutlined, OrderedListOutlined, UserOutlined } from '@ant-design/icons'
import { ShopPromotion } from './shop-promotion/shop-promotion.component';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);



export const HomeAdminV2 = () => {

  const data = {
    labels: ['Cột 1', 'Cột 2', 'Cột 3', 'Cột 4', 'Cột 5'],
    datasets: [
      {
        label: 'Dữ liệu cột',
        data: [12, 19, 3, 8, 7],
        backgroundColor: [
          '#0099ff',
          '#0099ff',
          '#0099ff'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 0,
        barPercentage: 0.6,
      }
    ]
  };
  const options: any = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false
          }
        }
      ]
    }
  };

  const dataRight: any =
  {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
    datasets: [
      {
        label: ['data 1'],
        data: [15, 30, 25,3,18],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
      },
      {
        label: ['data2'],
        data: [9, 2, 20,13,8],
        fill: false,
        borderColor: 'rgb(255, 51, 153)',
        tension: 0.4,
      },
    ],
  }
  const optionRight: any = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
  return (
    <div className='home-admin-v2'>
      <div className='home-admin-v2-data'>
        <Row gutter={[60, 0]}>
          <Col span={8} >
            <Card bordered={false} className='box-shadow'>
              <Statistic
                title="Nguời dùng hôm nay"
                value={97}
                precision={0}
                valueStyle={{ color: '#00cc99', fontWeight: 'bold' }}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={8} >
            <Card bordered={false}>
              <Statistic
                title="Tổng đơn hàng trong ngày"
                value={140}
                precision={0}
                valueStyle={{ color: '#00cc99', fontWeight: 'bold' }}
                prefix={<OrderedListOutlined />}
              />
            </Card>
          </Col>
          <Col span={8} >
            <Card bordered={false}>
              <Statistic
                title="Khách hàng mới"
                value={12}
                precision={0}
                valueStyle={{ color: '#00cc99', fontWeight: 'bold' }}
                prefix={<GroupOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </div>
      <div className='home-admin-v2-chart'>
        <Row gutter={[20, 0]}>
          <Col span={10}>
            <div className='chart-left'>
              <Bar data={data} options={options} style={{ width: '100%', height: 340 }} />
              <p style={{ textAlign: 'center', marginTop: 20 }}>Biểu đồ thống kê</p>
            </div>
          </Col>
          <Col span={14}>
            <div className='chart-right'>
              <Line data={dataRight} options={optionRight} />
            </div>
          </Col>
        </Row>
      </div>

      {/* <ShopPromotion /> */}
    </div>
  )
}