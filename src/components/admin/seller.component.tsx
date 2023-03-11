import { Col, Row, Table } from "antd"
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import Api, { endpoint } from "../../configs/Api";


interface DataType {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}




const AdminSeller = () => {
  // const rowClick: any = () => {
  //   console.log("row click")
  // }
  const [sellers, setSellers] = useState<DataType[]>([])
  const [reload, setReload] = useState<boolean>(false)

  const handleBlockUser = async (record: DataType) => {
    const res = await Api.patch(endpoint.seller.lock(record.id))
    setReload(!reload)
  }
  const handleUnLock = async (recode: DataType) => {
    const res = await Api.patch(endpoint.seller.unLock(recode.id))
    console.log(res.data)
    setReload(!reload)
  }
  // Data
  const columns: ColumnsType<DataType> = [
    { title: 'Id', dataIndex: 'id', key: 'id' },
    { title: 'User name', dataIndex: 'userName', key: 'userName' },
    { title: 'First name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Status', dataIndex: 'isActive', key: 'isActive', 
      render: (_, record) => record.isActive == false ? <p key={record.id} style={{color: 'red'}}>Khóa</p> : <p key={record.id} style={{color: 'green'}} >Không khóa</p>
    },
    {
      title: 'Action',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => record.isActive == true ? <p onClick={() => handleBlockUser(record)} style={{cursor: 'pointer'}}>Khóa tài khoản</p> : <p style={{cursor: 'pointer'}} onClick={() => handleUnLock(record)}>Mở khóa</p>
    }
  ];


  useEffect(() => {
    const getAllSeller = async () => {
      const res = await Api.get(endpoint.seller.getAll)
      console.log(res.data)
      setSellers(res.data.data)
    }

    getAllSeller()
  }, [reload])
  return (
    <div style={{ marginTop: '50px' }}>
      {sellers.length > 0
        ?
        <Table
          columns={columns}
          dataSource={sellers}
          size="large"
        />
        :
        null
      }
    </div>
  )
}

export default AdminSeller