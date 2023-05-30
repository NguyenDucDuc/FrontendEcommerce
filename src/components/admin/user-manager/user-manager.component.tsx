import { CarryOutOutlined, DeleteOutlined, DollarOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Card, Col, Input, Modal, Row, Select, Space, Statistic, Tag, notification } from "antd"
import './user-manager.style.scss'
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { AuthAdminApi, endpoint } from "../../../configs/Api";


interface DataType {
  id: number;
  userName: string;
  firstName: string;
  lastName: number;
  email: string;
}

interface IUser {
  id: number;
  userName: string;
  firstName: string;
  lastName: number;
  email: string;
}

interface IRole {
  name: string;
}

interface IRoleSelect {
  value: string;
  label: string;
}

export const UserManager = () => {
  const [api, contextHolder] = notification.useNotification();
  const [listUser, setListUser] = useState<IUser[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenRemoveRole, setIsModalOpenRemoveRole] = useState(false);
  const [role, setRole] = useState<any>('')
  const [allRole, setAllRole] = useState<IRole[]>([])
  const [userIdGrant, setUserIdGrant] = useState<number>(0)
  const [roleOption, setRoleOption] = useState<any[]>([
    { value: 'seller', label: 'Người bán' },
    { value: 'staff', label: 'Nhân viên' },
  ])

  const showModal = async (userId: number) => {
    // gán id của record cho user cần gán quyền
    setUserIdGrant(userId)
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (role !== '') {
      if (role === 'seller') {
        const res = await AuthAdminApi().post(endpoint.seller.grant(userIdGrant))
        if (res.data.status === 200) {
          api.success({
            message: 'Thông báo',
            description:
              'Gán quyền thành công',
            duration: 3,
          });
        }
        setIsModalOpen(false);
      } else if (role === 'staff') {
        const res = await AuthAdminApi().post(endpoint.staff.grant(userIdGrant))
        if (res.data.status === 200) {
          api.success({
            message: 'Thông báo',
            description:
              'Gán quyền thành công',
            duration: 3,
          });
        }
        setIsModalOpen(false);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalRemoveRole = async (userId: number) => {
    const res = await AuthAdminApi().get(endpoint.user.getAllRole(userId))
    console.log(res.data)
    setAllRole(res.data.data)
    setIsModalOpenRemoveRole(true);
  };

  const handleOkRemoveRole = () => {
    setIsModalOpenRemoveRole(false);
    console.log(role)
  };

  const handleCancelRemoveRole = () => {
    setIsModalOpenRemoveRole(false);
  };

  const handleSelectChange = (value: string) => {
    console.log(`selected ${value}`);
    setRole(value)
  };

  const handleRemoveRole = (roleName: string) => {
    console.log(roleName)
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên tài khoản',
      dataIndex: 'userName',
      key: 'userName',
      render: (text) => <a style={{}}>{text}</a>,
    },
    {
      title: 'Họ, tên lót',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Tên',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>

          <Row>
            <Col span={8}>
              <Button style={{ background: '#0099ff', color: 'white' }}
                onClick={() => showModal(record.id)}
              >Gán quyền</Button>
            </Col>
            <Col span={8}>
              <Button style={{ background: '#00cc99', color: 'white' }}
                onClick={() => showModalRemoveRole(record.id)}
              >Gỡ quyền</Button>
            </Col>
          </Row>
        </>
      ),
    },
  ];

  const data: DataType[] = [

  ];
  useEffect(() => {
    const getAllUser = async () => {
      const res = await AuthAdminApi().get(endpoint.user.getUserNotAdmin)
      setListUser(res.data.data)
    }
    getAllUser()
  }, [])


  return (
    <div className="admin-user">
      {contextHolder}
      <div className="admin-user__w-90">
        <div className="admin-user-stats">
          <Row gutter={[60, 0]}>
            <Col span={8}>
              <Card bordered={false}>
                <Statistic
                  title="Tổng số khách hàng"
                  value={0}
                  precision={0}
                  valueStyle={{ color: '#0099ff', fontWeight: 'bold' }}
                  prefix={<UserOutlined />}
                  suffix=""
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                <Statistic
                  title="Tổng số lượt mua"
                  value={0}
                  precision={0}
                  valueStyle={{ color: '#0099ff', fontWeight: 'bold' }}
                  prefix={<CarryOutOutlined />}
                  suffix=""
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                <Statistic
                  title="Số khách hàng mới trong tháng"
                  value={0}
                  precision={0}
                  valueStyle={{ color: '#0099ff', fontWeight: 'bold' }}
                  prefix={<DollarOutlined />}
                  suffix=""
                />
              </Card>
            </Col>
          </Row>
        </div>

        <div className="admin-seller-chart">
          {/* <Line data={data} /> */}
        </div>

        <div className="data-table">
          {/* {sellers.length > 0
            ?
            <Table
              columns={columns}
              dataSource={sellers}
              size="large"
            />
            :
            null
          } */}
          <Table columns={columns} dataSource={listUser} />
          <Modal title="Chọn quyền" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Select
              style={{ width: 170 }}
              placeholder='Chọn quyền'
              onChange={handleSelectChange}
              options={roleOption
              }
            />
          </Modal>
          <Modal title="Gỡ quyền" open={isModalOpenRemoveRole} onOk={handleOkRemoveRole} onCancel={handleCancelRemoveRole}>
            {
              allRole.map(item =>
                <Row style={{
                  marginTop: 15
                }}>
                  <Col span={5}>
                    <Tag color="cyan" style={{}}>{item.name}</Tag>
                  </Col>
                  <Col span={6}>
                    {
                      item.name !== 'Khách hàng' ?
                        <p style={{
                          color: 'red',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                          onClick={() => handleRemoveRole(item.name)}
                        >X</p>
                        :
                        null
                    }
                  </Col>
                </Row>
              )
            }

          </Modal>
        </div>
      </div>
    </div>
  )
}