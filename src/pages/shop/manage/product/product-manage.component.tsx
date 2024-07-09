import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  message,
} from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import React, { useEffect, useMemo, useState } from 'react';
import { extractData, extractData2, getAllProduct } from '../../../../utils/product';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Params, Response } from '../../../../models/http';
import { authAxios, axiosClient } from '../../../../lib/axios/axios.config';
import { endpoint } from '../../../../configs/Api';
import { PAGE_SIZE } from '../../../../constants/product';
import {
  formatCurrency,
  randomColor,
} from '../../../../utils/common';
import { useForm } from 'antd/es/form/Form';

interface DataType {
  id: number;
  name: string;
  price: number;
  rate: number;
  unitOnOrder: number;
  unitInStock: number;
  categoryId: number;
  isActive: boolean;
  priceDiscount?: number;
}

const ProductManage: React.FC = () => {
  const { shopId } = useParams();
  const [params, setParams] = useState<Params>({
    shopId: shopId,
    page: 1,
    pageSize: PAGE_SIZE,
    isActive: 0,
  });
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [amountProduct, setAmountProduct] = useState<Number>();
  const [categories, setCategories] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promotions, setPromotions] = useState<any>([]);
  const [recordProduct, setRecordProduct] = useState<any>();

  const generateOptions = (list: Array<any>) => {
    return list.map((item) => {
      return {
        value: item['id'],
        label: item['value'],
      };
    });
  };

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
      'priceDiscount',
      'rate',
      'unitOnOrder',
      'unitInStock',
      'categoryId',
      'amountPage',
      'amountProduct',
      'isActive',

    ]);
    setDataSource(result);
    setAmountProduct(res?.data.amountProduct);
  };

  const getAllPromotion = async () => {
    try {
      const res = await axiosClient.get(
        endpoint.promotion.getPromotionByShop(Number(shopId)),
        {
          params: {
            pageNumber: -1,
          },
        }
      );

      if (res.status === 200) {
        const promotionData = generateOptions(res.data?.listPromotion);
        setPromotions(promotionData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    getAllPromotion();
  }, [params]);

  const handleDeleteProduct = async (productID: number) => {
    try {
      const res: Response = await authAxios().delete(
        `${endpoint.product.main}/${productID}`
      );
      if (res.status === 200) {
        message.success(res.message);
        await fetchData()
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
      render: (id) => <span>{id}</span>,
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
      title: 'Tình trạng',
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'center',
      render: (_, record) => <span>{record.isActive ? 'Còn bán' : 'Không bán'}</span>,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (_, record) => <span>{record.priceDiscount ? formatCurrency(record.priceDiscount) : formatCurrency(record.price)}</span>,
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
              onClick={() => {
                setRecordProduct(record);
                setIsModalOpen(true);
              }}
              icon={<PlusOutlined style={{ color: 'blue' }} />}
            ></Button>
            <Button
              onClick={() => navigate(`${record.id}/edit`)}
              icon={<EditOutlined style={{ color: 'green' }} />}
            ></Button>
            <Button
              onClick={() => handleDeleteProduct(record.id)}
              icon={<DeleteOutlined style={{ color: 'red' }} />}
            ></Button>
          </Space>
        );
      },
    },
  ];

  const [form] = useForm();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addPromotionForProduct = async (
    promotionId: number,
    productId: number
  ) => {
    try {
      const res: Response = await axiosClient.post(
        endpoint.promotion.addPromotionForProduct,
        {
          productId,
          promotionId,
        }
      );

      if (res.status === 201) {
        message.success(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = () => {
    addPromotionForProduct(form.getFieldsValue().promotionId, recordProduct.id);
    setIsModalOpen(false);
  };

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
      <Modal
        title="Thêm khuyến mãi cho sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="productId"
            rules={[{ required: true, message: 'Bắt buộc!' }]}
          >
            <Input
              style={{ textTransform: 'capitalize' }}
              placeholder={recordProduct?.name}
              value={recordProduct?.id}
              disabled
            />
          </Form.Item>

          <Form.Item
            label="Giá trị khuyến mãi"
            name="promotionId"
            rules={[{ required: true, message: 'Bắt buộc!' }]}
          >
            <Select options={promotions} />
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
};

export default ProductManage;
