import {
  DollarOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic, Table } from "antd";
import React, { useEffect, useState } from "react";

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
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { Response } from "../../../models/http";
import { authAxios } from "../../../lib/axios/axios.config";
import { endpoint } from "../../../configs/Api";
import {
  capitalizeText,
  formatCurrency,
  randomColor,
} from "../../../utils/common";
import Stats from "../../../components/stats/stats.component";
import { ColumnsType } from "antd/es/table";
import { optionsChart } from "../../../constants/stats";

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

interface DataType {
  name: string;
  revenue: number;
}

const MainDashBoard = () => {
  const { shopId } = useParams();
  const [shop, setShop] = useState<any>();
  const [statsData, setStatsData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [],
      },
    ],
  });
  const [dataTable, setDataTable] = useState();

  const fetchData = async () => {
    const res: Response = await authAxios().get(
      endpoint.shop.getDetail(Number(shopId))
    );
    const resStats: Response = await authAxios().post(
      `${endpoint.shop.getDetail(Number(shopId))}/stats`,
      {
        type: "PRODUCT",
        shopId: shopId,
        name: "",
      }
    );
    if (resStats.status === 200) {
      const temp = {
        labels: resStats.data.reduce((acc: [], item: any) => {
          return [...acc, capitalizeText(item.name)];
        }, []),

        datasets: [
          {
            label: "Tổng tiền bán được",
            data: resStats.data.reduce((acc: [], item: any) => {
              return [...acc, item.revenue];
            }, []),

            backgroundColor: resStats.data.reduce((acc: [], item: any) => {
              return [...acc, randomColor()];
            }, []),
          },
        ],
      };
      setStatsData(temp);
      setDataTable(
        resStats.data.map((item: any) => {
          return {
            ...item,
            revenue: formatCurrency(item.revenue),
          };
        })
      );
    }
    setShop(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <span style={{ textTransform: "capitalize" }}>{text}</span>
      ),
    },
    {
      title: "Doanh thu",
      dataIndex: "revenue",
      key: "revenue",
    },
  ];

  return (
    <div className="home-admin-v2">
      <h1 style={{ textAlign: "center", fontSize: "26px", paddingTop: "20px" }}>
        {shop?.shopName}
      </h1>
      <div className="home-admin-v2-data">
        <Row gutter={[30, 0]}>
          <Col span={8}>
            <Card bordered={false} className="box-shadow">
              <Statistic
                title="Số dư"
                value={formatCurrency(shop?.totalPrice)}
                precision={0}
                valueStyle={{ color: "#00cc99", fontWeight: "bold" }}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Số sản phẩm"
                value={shop?.amountProduct}
                precision={0}
                valueStyle={{ color: "#00cc99", fontWeight: "bold" }}
                prefix={<UnorderedListOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Điểm đánh giá"
                value={shop?.rate}
                precision={0}
                valueStyle={{ color: "#00cc99", fontWeight: "bold" }}
                prefix={<OrderedListOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </div>

      <div className="home-admin-v2-data" style={{ minHeight: "500px" }}>
        <Row gutter={[64, 64]}>
          <Col span={12}>
            <h3 style={{ textAlign: "center", padding: "20px" }}>Biểu đồ</h3>
            <Doughnut
              data={statsData}
              options={optionsChart}
              style={{ width: "100%", height: "100%" }}
            />
          </Col>
          <Col span={12}>
            <h3 style={{ textAlign: "center", padding: "20px" }}>
              Thống kê doanh thu
            </h3>
            <Table
              columns={columns}
              dataSource={dataTable}
              pagination={{
                defaultPageSize: 5,
              }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default MainDashBoard;
