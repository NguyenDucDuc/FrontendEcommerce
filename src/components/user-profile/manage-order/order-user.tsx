import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Space, Table, Tag, message } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import React, { useEffect, useMemo, useState } from "react";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";

import Modal from "antd/es/modal/Modal";
import { Params, Response } from "../../../models/http";
import { PAGE_SIZE } from "../../../constants/product";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { DataTypeOrder, DataTypeOrderDetail } from "../../../models/models";
import { endpoint } from "../../../configs/Api";
import { authAxios, axiosClient } from "../../../lib/axios/axios.config";
import { extractData } from "../../../utils/product";
import { ParamsOrderDetail, STATUS_ACTION } from "../../../constants/order";
import { formatCurrency, formatDateString, getOrderDetail } from "../../../utils/common";

interface Pagination {
  total?: number;
  pageSize?: number;
  current?: number;
}

const OrderUser: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [params, setParams] = useState<Params>({
    userId: user.id,
    pageSize: PAGE_SIZE,
    state: searchParams.get("state")
      ? (searchParams.get("state") as string)
      : null,
  });

  const [dataSource, setDataSource] = useState<DataTypeOrder[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
  });
  const [dataSourceDetail, setDataSourceDetail] = useState<
    DataTypeOrderDetail[]
  >([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const res = await authAxios().get(endpoint.order.getOrder, {
        params,
      });

      const result = extractData(res?.data.listOrder, [
        "id",
        "userId",
        "firstName",
        "lastName",
        "isActive",
        "avatar",
        "status",
        "payment",
        "shipAddress",
        "chargeId",
        "updatedAt",
      ]);

      setDataSource(result);
      setPagination({
        total: res.data.amountOrder,
        pageSize: res.data.pageSize,
        current: res.data.page,
      });
    } catch (error) {
      setDataSource([]);
      setPagination({
        total: 0,
        pageSize: 0,
        current: 0,
      });
    }
  };

  useEffect(() => {
    setParams({
      userId: user.id,
      pageSize: PAGE_SIZE,
      state: searchParams.get("state")
        ? (searchParams.get("state") as string)
        : null,
    });
  }, [location]);

  useEffect(() => {
    fetchData();
  }, [params]);

  const handleConfirmOrder = async (orderId: number, action: string, url?: string) => {
    try {
      const res: Response = await authAxios().post(
        `${url || endpoint.order.confirmOrder}`,
        {
          orderId: orderId,
          action: action,
        }
      );

      if (res.status === 200) {
        message.success(res.message);
        if (action === STATUS_ACTION.CANCEL && res.data.chargeId !== "0") {
          const refund: any = await axiosClient.post(endpoint.payment.refund, {
            chargeId: res.data.chargeId,
          });
          if (refund) {
            const shopUpdate = await axiosClient.put(
              endpoint.shop.update(res.data.shopId),
              {
                amount: -refund.amount,
              }
            );
            if (shopUpdate.status === 200) {
              message.info(
                `Tài khoản của bạn sẽ được hoàn lại ${formatCurrency(
                  refund.amount
                )}.`
              );
            }
          }
        }
        await fetchData();
      } else {
        message.info(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewOrderDetail = async (params: ParamsOrderDetail) => {
    const customer = await axiosClient.get(endpoint.customer.getDetail(params.userId as number))
    params.customerId = customer.data.id
    const data: Response | boolean = await getOrderDetail(params);
    if (typeof data !== "boolean") {
      const result = extractData(data.data.listOrderDetail, [
        "id",
        "productName",
        "shopName",
        "quantity",
        "unitPrice",
        "discount",
        "productId",
        "orderId",
      ]);
      setDataSourceDetail(result);
      setIsModalOpen(true);
    }
  };

  const handleChangeTable = (e: TablePaginationConfig) => {
    setPagination((pre) => {
      return { ...pre, current: e.current as number, pageSize: e.pageSize };
    });
    setParams((preParams) => {
      return { ...preParams, page: e.current as number, pageSize: e.pageSize };
    });
  };

  const columns: ColumnsType<DataTypeOrder> = [
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
          // <Link to={`/product-detail/${record.id}`}>
          //   <Avatar style={{ marginRight: "20px" }} src={record.avatar} />
          //   {`${record.firstName} ${record.lastName}`}
          // </Link>
          <span>
            <Avatar style={{ marginRight: "20px" }} src={record.avatar} />
            {`${record.firstName} ${record.lastName}`}
          </span>
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
      render: (_, record) => <span>{formatDateString(record.updatedAt)}</span>,
    },
    {
      title: "",
      key: "",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button
              // onClick={showModal}
              onClick={() =>
                handleViewOrderDetail({
                  orderId: record.id,
                  userId: user.id,
                })
              }
              icon={<SearchOutlined style={{ color: "black" }} />}
            ></Button>
            <Button
              onClick={() =>
                handleConfirmOrder(record.id, STATUS_ACTION.CANCEL, endpoint.order.confirmOrderForCustomer)
              }
              icon={<CloseCircleOutlined style={{ color: "red" }} />}
            ></Button>
          </Space>
        );
      },
    },
  ];

  const columnsOrderDetail: ColumnsType<DataTypeOrderDetail> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 10,
      key: "id",
      render: (id) => <span>{id}</span>,
    },
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      key: "productName",
      render: (_, record) => (
        <Link style={{textTransform: 'capitalize'}} to={`/product-detail/${record.productId}`}>
          {record.productName}
        </Link>
      ),
    },
    {
      title: "Cửa hàng",
      dataIndex: "shopName",
      key: "shopName",
      align: "center",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Đơn giá",
      dataIndex: "unitPrice",
      key: "unitPrice",
      align: "right",
      render: (_, record) => (
        <span>{record.unitPrice && formatCurrency(record.unitPrice)}</span>
      ),
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
          ...pagination,
          defaultPageSize: 2,
          showSizeChanger: true,
          locale: { items_per_page: "đơn hàng" },
          pageSizeOptions: ["1", "2"],
        }}
      />

      <Modal
        title="Chi tiết đơn hàng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Table
          columns={columnsOrderDetail}
          dataSource={dataSourceDetail}
          rowKey={(record) => record.id}
          pagination={{}}
        />
      </Modal>
    </section>
  );
};

export default OrderUser;
