import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag, message } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { extractData, getAllProduct } from "../../../../utils/product";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Params, Response } from "../../../../models/http";
import { authAxios } from "../../../../lib/axios/axios.config";
import { endpoint } from "../../../../configs/Api";
import { PAGE_SIZE } from "../../../../constants/product";

interface DataType {
  id: number;
  customerId: number;
  shipAddress: string;
  status: string;
  payment: string;
  updatedAt: string;
}

const OrderManage: React.FC = () => {
  const { shopId } = useParams();
  const [params, setParams] = useState<Params>({
    shopId: shopId,
  });
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [amountOrder, setAmountOrder] = useState<Number>();
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await authAxios().get(endpoint.order.getOrder, {
      params,
    });

    const result = extractData(res?.data, [
      "id",
      "customerId",
      "status",
      "payment",
      "shipAddress",
      "updatedAt",
    ]);
    
    setDataSource(result);
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  const handleDeleteProduct = async (productID: number) => {
    try {
      const res: Response = await authAxios().delete(
        `${endpoint.product.main}/${productID}`
      );
      if (res.status === 200) {
        message.success(res.message);
        setDataSource((preDataSource) => {
          return preDataSource.filter((item) => item.id !== productID);
        });
      } else {
        message.info(res.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Đã có lỗi xảy ra !!");
    }
  };

  const handleChangeTable = (e: TablePaginationConfig) => {
    setParams((preParams) => {
      return { ...preParams, page: e.current };
    });
    setCurrentPage(e.current as number);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 10,
      key: "id",
      render: (id) => <span>{id}</span>,
    },
    {
      title: "Khách hàng",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <Link to={`/product-detail/${record.id}`}>{record.customerId}</Link>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "payment",
      key: "payment",
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "shipAddress",
      key: "shipAddress",
      align: "center",
    },
    {
      title: "Ngày giao",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
    },
    {
      title: "",
      key: "",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button
              onClick={() => navigate(`${record.id}/edit`)}
              icon={<EditOutlined style={{ color: "green" }} />}
            ></Button>
            <Button
              onClick={() => handleDeleteProduct(record.id)}
              icon={<DeleteOutlined style={{ color: "red" }} />}
            ></Button>
          </Space>
        );
      },
    },
  ];

  return (
    <section>
      <Table
        columns={columns}
        dataSource={dataSource}
        onChange={handleChangeTable}
        rowKey={(record) => record.id}
        pagination={{
          total: 10,
          defaultPageSize: PAGE_SIZE,
          current: currentPage,
        }}
      />
    </section>
  );
};

export default OrderManage;
