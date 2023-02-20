import { Col, Progress, Row } from "antd"
import "./home.style.scss"
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

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [2,1,5,4,7,8,9],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [9,3,7,6,3,4,1],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  


const HomeAdmin = () => {
    return (
        <div className="home-admin">
            <section className="section1">
                <Row>
                    <Col span={6} lg={6} xs={24}>
                        <div className="card-home-admin">
                            <Progress type="circle" percent={70} format={() => '20 user'} style={{ margin: '20px auto' }} />
                        </div>
                    </Col>
                    <Col span={6} lg={6} xs={24}>
                        <div className="card-home-admin">
                            <Progress type="circle" percent={20} format={() => '120 đối tác'} style={{ margin: '20px auto' }} strokeColor="#ff3377" />
                        </div>
                    </Col>
                    <Col span={6} lg={6} xs={24}>
                        <div className="card-home-admin">
                            <Progress type="circle" percent={80} format={() => '4000 sản phẩm'} style={{ margin: '20px auto'}} strokeColor="#00cc66" />
                        </div>
                    </Col>
                    <Col span={6} lg={6} xs={24}>
                        <div className="card-home-admin">
                            <Progress type="circle" percent={80} format={() => '300 khách hàng'} style={{ margin: '20px auto' }} strokeColor="#bf00ff" />
                        </div>
                    </Col>
                </Row>
            </section>
            <section className="section2">
                <div className="home-admin-chart">
                    <Row>
                        <Col span={24}>
                            <Line options={options} data={data} />
                        </Col>
                    </Row>
                </div>
            </section>
        </div>
    )
}

export default HomeAdmin