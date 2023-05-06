import React, { useEffect, useState } from "react";
import "./stats.style.scss";
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
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
} from "antd";
import { authAxios, axiosClient } from "../../lib/axios/axios.config";
import { endpoint } from "../../configs/Api";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import {
  capitalizeText,
  formatCurrency,
  randomColor,
  removeUndefine,
} from "../../utils/common";
import { Bar, Doughnut } from "react-chartjs-2";
import { ColumnsType } from "antd/es/table";
import { optionsChart } from "../../constants/stats";
import dayjs from "dayjs";
import { ENDPOINT } from "../../constants/api";
import { generateOptions } from "../../utils/generateOptions";
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

interface Props {}

interface ParamsStats {
  name?: string;
  type?: string;
  date?: any;
  quater?: number;
  month?: number;
  year?: number;
}

interface DataType {
  name: string;
  revenue: number;
}

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

const Stats: React.FC<Props> = () => {
  const { shopId } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [type, setType] = useState(searchParams.get("type"));
  const [categories, setCategories] = useState<any[]>([]);

  const [datePic, setDatePic] = useState<any>();
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
  const [form] = Form.useForm();

  const fetchCategory = async () => {
    const categories = await axiosClient.get(`${ENDPOINT.CATEGORY}`);
    setCategories([{value: null, label: ''}, ...generateOptions(categories.data)]);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    setType(searchParams.get("type"));
  }, [location]);

  useEffect(() => {
    getRevenueStats({ name: "", type: (type as string).toUpperCase() });
  }, [type]);

  const getRevenueStats = async (params: ParamsStats) => {
    try {
      const res = await authAxios().post(
        `${endpoint.shop.getDetail(Number(shopId))}/stats`,
        params
      );
      if (res.status === 200) {
        const temp = {
          labels: res.data.reduce((acc: [], item: any) => {
            return [...acc, capitalizeText(item.name)];
          }, []),

          datasets: [
            {
              label: "Tổng tiền bán được",
              data: res.data.reduce((acc: [], item: any) => {
                return [...acc, item.revenue];
              }, []),

              backgroundColor: res.data.reduce((acc: [], item: any) => {
                return [...acc, randomColor()];
              }, []),
            },
          ],
        };
        setStatsData(temp);
        setDataTable(
          res.data.map((item: any) => {
            return {
              ...item,
              revenue: formatCurrency(item.revenue),
            };
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values: ParamsStats) => {
    const params = Object.assign(
      {
        ...removeUndefine(values),
      },
      { type: (type as string).toUpperCase(), name: "" },
      datePic ? { date: datePic } : {}
    );

    await getRevenueStats(params);
  };

  const resetField = () => {
    form.resetFields()
    getRevenueStats({ name: "", type: (type as string).toUpperCase() });
  }

  return (
    <>
      <section className="stats__container">
        <h2>thống kê doanh thu</h2>
        <Form
        form={form}
          name="basic"
          layout="vertical"
          style={{ maxWidth: 800, marginTop: "20px" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row justify={"center"} gutter={[32, 0]}>
            <Col span={12}>
              {type === "product" ? (
                <Form.Item label="Tên sản phẩm" name="name">
                  <Input style={{ width: "100%" }} />
                </Form.Item>
              ) : (
                <Form.Item label="Danh mục" name="categoryId">
                  <Select options={categories} style={{ width: "100%" }} />
                </Form.Item>
              )}
            </Col>
            <Col span={12}>
              <Form.Item label="Ngày" name="date">
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={(e: any) => {
                    if (e) {
                      setDatePic(e.$d);
                    } else {
                      setDatePic(null);
                    }
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Quý" name="quater">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tháng" name="month">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Năm" name="year">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12} style={{ display: "flex", alignItems: "center" }}>
              <Form.Item style={{ margin: 0 }}>
                <Button type="primary" htmlType="submit" style={{marginRight: '40px'}}>
                  Tìm kiếm
                </Button>
                <Button type="primary" onClick={resetField}>
                  Đặt lại
                </Button>
              </Form.Item>
            </Col>
           
          </Row>
        </Form>
        <Row style={{ width: "100%" }} gutter={[64, 64]}>
          <Col span={12}>
            <h3 style={{ textAlign: "center", padding: "20px" }}>Biểu đồ</h3>
            {type === "product" ? (
              <Doughnut
                data={statsData}
                options={optionsChart}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Bar
                data={statsData}
                options={optionsChart}
                style={{ width: "100%", height: "100%" }}
              />
            )}
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
      </section>
    </>
  );
};

export default Stats;
