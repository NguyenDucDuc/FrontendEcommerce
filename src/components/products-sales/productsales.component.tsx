import { AppstoreOutlined, DesktopOutlined, MailOutlined, MobileOutlined, StarOutlined } from "@ant-design/icons"
import { Col, Menu, MenuProps, Pagination, Row, Slider } from "antd"
import { SliderMarks } from "antd/es/slider"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CardProduct from "../card-product/card.component"
import "./productsales.style.scss"


const ProductSales = () => {
    const arr = [1, 2, 3, 4]
    // set up item category
    const nav = useNavigate()
    const items: MenuProps['items'] = [
        {
            label: 'Tất cả',
            key: 'all',
            icon: <StarOutlined />,
            onClick: () => {
                nav(`/products`)
            }
        },
        {
            label: 'Quần áo',
            key: 'clothes',
            icon: <MailOutlined />,
            onClick: () => {
                nav(`/products?category=clothes`)
            }
        },
        {
            label: 'Giày dép',
            key: 'footwear',
            icon: <AppstoreOutlined />,
            onClick: () => {
                nav(`/products?category=footwear`)
            }
        },
        {
            label: 'Điện thoại',
            key: 'mobile',
            icon: <MobileOutlined />,
            onClick: () => {
                nav(`/products?category=mobile`)
            }
        },
        {
            label: 'Máy tính',
            key: 'computer',
            icon: <DesktopOutlined />,
            onClick: () => {
                nav(`/products?category=desktop`)
            }
        },
        {
            label: 'Mỹ phẩm',
            key: 'cosmetic',
            icon: <AppstoreOutlined />,
            onClick: () => {
                nav(`/products?category=cosmetic`)
            }
        },
    ];
    const marks: SliderMarks = {
        0: '0đ',
        200000: '200.000đ',
        500000: '500.000đ',
        800000: '800.000đ',
        1000000: {
            style: {
                color: 'red'
            },
            label: <strong>1.000.000đ</strong>
        }
      };
    //
    const [categoryCurrent, setcategoryCurrent] = useState('all');

    const onClickNavCategory: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setcategoryCurrent(e.key);
    };
    const onChangeSlide = (value: number) => {
        console.log(value)
    }
    const onChangePage = (page:number, pageSize: number) => {
        nav(`/products?category=${categoryCurrent}&page=${page}&pageSize=${pageSize}`)
    }
    return (
        <div className="products-sale">
            <div className="nav-category">
                <Menu onClick={onClickNavCategory} selectedKeys={[categoryCurrent]} mode="horizontal" items={items} />
                
            </div>
            <Row gutter={[10,10]}>
                {arr.map(item => <Col span={6}>
                    <CardProduct />
                </Col>)
                }
                {arr.map(item => <Col span={6}>
                    <CardProduct />
                </Col>)
                }
                {arr.map(item => <Col span={6}>
                    <CardProduct />
                </Col>)
                }
            </Row>
            <div className="pagination">
                <Row>
                    <Col span={9}>

                    </Col>
                    <Col span={6}>
                        <Pagination defaultCurrent={1} total={50} onChange={onChangePage} pageSize={12} />
                    </Col>
                    <Col span={9}>
                        
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ProductSales