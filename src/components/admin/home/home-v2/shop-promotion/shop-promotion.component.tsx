import Table, { ColumnsType } from 'antd/es/table';
import './shop-promotion.style.scss'
import { Button, Space, Tag } from 'antd';


interface DataType {
    id: number;
    image: string;
    productName: string;
    orderCount: number;
    rate: number;
}



export const ShopPromotion = () => {

    const columns: ColumnsType<DataType> = [
        {
            title: 'Id sản phẩm',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render:(_, record) => (
                <img src='https://down-vn.img.susercontent.com/file/sg-11134201-23020-68ew7nzrt8mvf8' style={{
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                    border: '3px solid #ff1a8c'
                }} />
            )
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Số lượng đã bán',
            key: 'orderCount',
            dataIndex: 'orderCount',
        },
        {
            title: 'Tổng đánh giá',
            key: 'rate',
            dataIndex: 'rate',
        },
        {
            title: 'Chi tiết',
            key: 'detail',
            render: (_, record) => (
                <Button type='primary' style={{background: '#0099ff'}}>Chi tiết</Button>
            )
        }
    ];
    
    const data: DataType[] = [
        {
            id: 1,
            productName: 'John Brown',
            orderCount: 32,
            image: 'nasd',
            rate: 4.3
        },
        {
            id: 1,
            productName: 'John Brown',
            orderCount: 32,
            image: 'nasd',
            rate: 4.3
        },
        {
            id: 1,
            productName: 'John Brown',
            orderCount: 32,
            image: 'nasd',
            rate: 4.3
        },
        {
            id: 1,
            productName: 'John Brown',
            orderCount: 32,
            image: 'nasd',
            rate: 4.3,
        }
    ];
    return (
        <div className='shop-promotion'>
            <Table columns={columns} dataSource={data} pagination={false} />
        </div>
    )
}