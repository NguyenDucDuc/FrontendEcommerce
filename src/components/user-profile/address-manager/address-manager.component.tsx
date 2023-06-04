import { Button, Form, Input, Modal, Select, Space, Tag, notification } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { AuthApi, endpoint } from "../../../configs/Api";
import { city } from "../../register/register.component";


interface DataType {
  id: number;
  detail: number;
  street: string;
  ward: string;
  district: string;
  city: string;
  isSelect: boolean
}


export const AddressManager = () => {
  const [api, contextHolder] = notification.useNotification();
  const [reload, setReload] = useState<boolean>(true)
  const [addresses, setAddresses] = useState<DataType[]>([])
  const [wards, setWards] = useState<any>([])
  const [districts, setDistricts] = useState<any>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSetDefault = async (addressId: number) => {
    const res = await AuthApi().post(endpoint.address.setDefault(addressId))
    console.log(res.data)
    if(res.data.status === 200) setReload(!reload)
  }
  const handleDeleteAddress = async (addressId: number) => {
    console.log(123)
    const res = await AuthApi().post(endpoint.address.delete(addressId))
    if(res.data.status === 200){
      api.success({
        message: 'Thông báo',
        description: 'Xóa thành công!!!',
      });
      const newAddresses = addresses.filter((addressItem) => addressItem.id !== addressId)
      console.log(newAddresses)
      setAddresses(newAddresses)
    }
  }
  const columns: ColumnsType<DataType> = [
    {
      title: 'Số nhà',
      dataIndex: 'detail',
      key: 'detail',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Tên đường',
      dataIndex: 'street',
      key: 'street',
    },
    {
      title: 'Phường',
      dataIndex: 'ward',
      key: 'ward',
    },
    {
      title: 'Quận',
      key: 'district',
      dataIndex: 'district',
    },
    {
      title: 'Thành phố',
      key: 'city',
      dataIndex: 'city'
    },
    {
      title: 'Số điện thoại',
      key: 'phone',
      dataIndex: 'phone'
    },
    {
      title: 'Trạng thái',
      key: 'isSelect',
      dataIndex: 'isSelect',
      render: (_, record) => record.isSelect ? <Tag color="#00cc99">Mặc định</Tag> : null
    },
    {
      title: '',
      key: '',
      dataIndex: '',
      render: (_, record) => !record.isSelect ? <Button onClick={() => handleSetDefault(record.id)} type="primary" className="btn-color">Mặc định</Button> : null
    },
    {
      title: '',
      key: '',
      dataIndex: '',
      render: (_, record) => !record.isSelect ? <Button onClick={() => handleDeleteAddress(record.id)} type="primary" style={{background: 'red'}}>Xóa</Button> : null
    },
  ];

  const onFinish = async (values: any) => {
    console.log(values)
    const res = await AuthApi().post(endpoint.address.create, {
      detail: values.detail,
      street: values.street,
      district: values.district,
      ward: values.ward,
      city: values.city,
      phone: values.phone
    })
    if(res.data.status === 200){
      api.success({
        message: 'Thông báo',
        description: 'Thêm mới địa chỉ thành công!!!',
      });
      setIsModalOpen(false)
      setAddresses([...addresses, res.data.data])
    }    
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const handleCityChange = (value: string) => {
    console.log(value)
    const district = city.find(c => c.value === value)
    console.log(district)
    if (district !== undefined) {
      setDistricts(district.district)
    }
  }
  const handleDistrictChange = (value: string) => {
    const w = districts.find((item: any) => item.value === value)
    console.log(w)
    setWards(w.ward)
  }
  useEffect(() => {
    const getAllAddress = async () => {
      const res = await AuthApi().get(endpoint.address.getAll)
      setAddresses(res.data.data)
    }
    getAllAddress()
  }, [reload])
  return (
    <div className="address-manager" style={{
      marginLeft: 20
    }}>
      {contextHolder}
      <h1>Quản lý địa chỉ</h1>
      <Button onClick={showModal} type="primary" className="btn-color" style={{
        marginTop: 20
      }}>Thêm mới</Button>
      <Table columns={columns} dataSource={addresses} style={{
        marginTop: 40
      }} />

      <Modal title="Thêm mới địa chỉ" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            label="Thành phố"
            name="city"
          >
            <Select options={city} showSearch onChange={handleCityChange} />
          </Form.Item>

          <Form.Item
            label="Quận/huyện"
            name="district"
          >
            <Select options={districts} showSearch onChange={handleDistrictChange} />
          </Form.Item>

          <Form.Item
            label="Phường/xã"
            name="ward"
          >
            <Select options={wards} showSearch />
          </Form.Item>

          <Form.Item
            label="Đường"
            name="street"
          >
            <Input placeholder="Nhập tên đường" />
          </Form.Item>

          <Form.Item
            label="Chi tiết"
            name="detail"
          >
            <Input placeholder="Số nhà" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="btn-color" size="middle">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}