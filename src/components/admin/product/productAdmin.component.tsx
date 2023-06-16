import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tag, message } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Params, Response } from '../../../models/http';
import { PAGE_SIZE } from '../../../constants/product';
import { authAxios, axiosClient } from '../../../lib/axios/axios.config';
import { extractData, extractData2, getAllProduct } from '../../../utils/product';
import { endpoint } from '../../../configs/Api';
import { formatCurrency, randomColor } from '../../../utils/common';

interface DataType {
  id: number;
  name: string;
  price: number;
  rate: number;
  unitOnOrder: number;
  unitInStock: number;
  categoryId: number;
}

const ProductAdmin: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: PAGE_SIZE,
  });
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [amountProduct, setAmountProduct] = useState<Number>();
  const [categories, setCategories] = useState<any>([]);

  const getCategory = useMemo(async () => {
    const resCate = await axiosClient.get(endpoint.category.getAll);
    setCategories(resCate.data);
  }, []);

  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await getAllProduct(params);
    const result = extractData2(res?.data?.listProduct, [
      'id',
      'name',
      'price',
      'rate',
      'unitOnOrder',
      'unitInStock',
      'categoryId',
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
      message.error('Đã có lỗi xảy ra !!');
    }
  };

  const handleChangeTable = (e: TablePaginationConfig) => {
    setParams((preParams) => {
      return { ...preParams, page: e.current, pageSize: e.pageSize };
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 10,
      key: 'id',
      render: (_, record) => {
        return <span>{record.id}</span>
      },
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        return (
          <Link
            style={{ textTransform: 'capitalize' }}
            to={`/product-detail/${record.id}`}
          >
            {record.name}
          </Link>
        );
      },
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (_, record) => <span>{formatCurrency(record.price)}</span>,
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rate',
      key: 'rate',
      align: 'center',
    },
    {
      title: 'Đã bán',
      dataIndex: 'unitOnOrder',
      key: 'unitOnOrder',
      align: 'center',
    },
    {
      title: 'Kho',
      dataIndex: 'unitInStock',
      key: 'unitInStock',
      align: 'center',
    },
    {
      title: 'Thể loại',
      key: 'category',
      dataIndex: 'category',
      render: (_, { categoryId }) => {
        const category = categories.filter(
          (item: any) => item.id === categoryId
        )[0];
        return (
          <Tag
            style={{ textTransform: 'capitalize' }}
            color={`${randomColor()}`}
            key={categoryId}
          >
            {category.name}
          </Tag>
        );
      },
    },
    {
      title: '',
      key: '',
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button
              onClick={() => handleDeleteProduct(record.id)}
              icon={<DeleteOutlined style={{ color: 'red' }} />}
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
          current: params.page,
          showSizeChanger: true,
          locale: { items_per_page: 'sản phẩm' },
          pageSizeOptions: ['5', '10'],
        }}
      />
    </section>
  );
};

export default ProductAdmin;
