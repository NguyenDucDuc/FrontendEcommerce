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
  name: string;
  price: string;
  rate: number;
  unitOnOrder: number;
  unitInStock: number;
  categoryId: number;
}

const ProductManage: React.FC = () => {
  const { shopId } = useParams();
  const [params, setParams] = useState<Params>({
    shopId: shopId,
  });
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [amountProduct, setAmountProduct] = useState<Number>();
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await getAllProduct(params);
    const result = extractData(res?.data?.listProduct, [
      "id",
      "name",
      "price",
      "rate",
      "unitOnOrder",
      "unitInStock",
      "categoryId",
      "amountPage",
      "amountProduct",
    ]);
    setDataSource(result);
    setAmountProduct(res?.data.amountProduct);
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
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return <Link to={`/product-detail/${record.id}`}>{record.name}</Link>;
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      align: "right",
    },
    {
      title: "Đánh giá",
      dataIndex: "rate",
      key: "rate",
      align: "center",
    },
    {
      title: "Đã bán",
      dataIndex: "unitOnOrder",
      key: "unitOnOrder",
      align: "center",
    },
    {
      title: "Kho",
      dataIndex: "unitInStock",
      key: "unitInStock",
      align: "center",
    },
    {
      title: "Thể loại",
      key: "category",
      dataIndex: "category",
      render: (_, { categoryId }) => {
        console.log(categoryId);
        
        return (
          <Tag color={categoryId === 2 ? "gold" : "red"} key={categoryId}>
            {categoryId === 2 ? "gold" : "red"}
          </Tag>
        );
      },
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
          total: amountProduct as number,
          defaultPageSize: PAGE_SIZE,
          current: currentPage,
        }}
      />
    </section>
  );
};

export default ProductManage;
