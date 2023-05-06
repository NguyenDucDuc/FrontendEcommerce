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
import {
  adminAxios,
  authAxios,
  axiosClient,
} from "../../lib/axios/axios.config";
import { endpoint } from "../../configs/Api";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
  shopId?: number;
}

interface DataType {
  name: string;
  quantity?: number;
  revenue: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Tên",
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
const columns2: ColumnsType<DataType> = [
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    render: (text: string) => (
      <span style={{ textTransform: "capitalize" }}>{text}</span>
    ),
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
  },
];

const StatsAdmin: React.FC<Props> = () => {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [type, setType] = useState(searchParams.get("type"));

  const [shops, setShops] = useState<any[]>([]);
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

  useEffect(() => {
    setType(searchParams.get("type"));
  }, [location]);

  const generateOptions = (list: Array<any>) => {
    return list.map((item) => {
      return {
        value: item["id"],
        label: capitalizeText(item["shopName"]),
      };
    });
  };

  const fetchShop = async () => {
    const shops = await axiosClient.get(`${endpoint.shop.getAll}/get-all`);
    console.log({ shops });

    setShops([{ value: null, label: "" }, ...generateOptions(shops.data)]);
  };

  useEffect(() => {
    if (localStorage.getItem("accessTokenAdmin")) {
      fetchShop();
    } else {
      nav("/admin/forbidden");
    }
  }, []);

  useEffect(() => {
    getRevenueStats({ type: (type as string).toUpperCase() });
  }, [type]);

  const getRevenueStats = async (params: ParamsStats) => {
    try {
      const res = await adminAxios().post(
        `${endpoint.admin.main}/stats`,
        params
      );
      if (res.status === 200) {
        if (type === "total_product") {
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
        } else {
          const temp = {
            labels: res.data.reduce((acc: [], item: any) => {
              return [...acc, capitalizeText(item.name)];
            }, []),

            datasets: [
              {
                label: "Tổng sản phẩm bán được",
                data: res.data.reduce((acc: [], item: any) => {
                  return [...acc, item.quantity];
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
                revenue: item.quantity,
              };
            })
          );
        }
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
      { type: (type as string).toUpperCase() },
      datePic ? { date: datePic } : {}
    );

    await getRevenueStats(params);
  };

  const resetField = () => {
    form.resetFields();
    getRevenueStats({ type: (type as string).toUpperCase() });
  };

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
              <Form.Item label="Cửa hàng" name="shopId">
                <Select options={shops} style={{ width: "100%" }} />
              </Form.Item>
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
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: "40px" }}
                >
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
            {type === "total_product" ? (
              <Bar
                data={statsData}
                options={optionsChart}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Doughnut
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
            {type === "total_product" ? (
              <Table
                columns={columns}
                dataSource={dataTable}
                pagination={{
                  defaultPageSize: 5,
                }}
              />
            ) : (
              <Table
                columns={columns2}
                dataSource={dataTable}
                pagination={{
                  defaultPageSize: 5,
                }}
              />
            )}
          </Col>
        </Row>
      </section>
    </>
  );
};

export default StatsAdmin;
