import { Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { AuthApi, endpoint } from "../../../ configs/Api";



interface DataType {
    id: number;
    shopName: string;
    desc: string;
    rate: number;
    isBlock: boolean
}


const AdminShop = () => {
    // set up collumn
    const [reload, setReload] = useState<boolean>(true)
    const handleLockShop = async (record: DataType) => {
        const res = await AuthApi().patch(endpoint.shop.lock(record.id))
        console.log(res.data)
        if(res.data.status === 200){
            setReload(!reload)
        }
    }
    const handleUnLockShop = async (record: DataType) => {
        const res = await AuthApi().patch(endpoint.shop.unLock(record.id))
        console.log(res.data)
        if(res.data.status === 200){
            setReload(!reload)
        }
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Shop name',
            dataIndex: 'shopName',
            key: 'shopName',
        },
        {
            title: 'Rate',
            dataIndex: 'rate',
            key: 'rate',
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => record.isBlock == true ? <p key={record.id}>Khóa</p> : <p key={record.id}>Mở</p>
        },
        {
            title: "Action",
            key: 'action',
            render: (_, record) => record.isBlock == true ? <p key={record.id} style={{cursor: 'pointer'}} onClick={() => handleUnLockShop(record)}>Mở khóa shop</p> : <p key={record.id} style={{cursor: 'pointer'}} onClick={() => handleLockShop(record)}>Khóa shop</p>
        }
    ];
    //
    const [shops, setShops] = useState([])
    useEffect(() => {
        const getAllShop = async () => {
            const res = await AuthApi().get(endpoint.shop.getAll)
            console.log(res.data)
            setShops(res.data.data)
        }
        getAllShop()
    }, [reload])
    return (
        <div>
            {shops.length > 0
                ?
                <Table columns={columns} dataSource={shops} />
                : null
            }
        </div>
    )
}

export default AdminShop