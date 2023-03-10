import { AppstoreOutlined, BellOutlined, DownOutlined, MailOutlined, NotificationFilled, NotificationOutlined, SettingOutlined, ShoppingCartOutlined, ShoppingFilled, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Button, Col, Dropdown, Menu, MenuProps, Row, Space, Spin, Typography } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../store/store";
import "./header.style.scss"
import "../style-commond/commond.style.scss"
import { currentUserAsyncThunk, logout } from "../../store/slices/user.slice";
import MiniCartItem from "./mini-cart-item/minicartitem.component";
import MiniCardNotification from "../notification/mini-card-notification/minicardnotification.component";


const Header = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const cartCount = useSelector((state: RootState) => state.cartItem.totalProduct )
    const [isShowCartMini, setIsShowCartMini] = useState<boolean>(false)
    const [isShowNotifi, setIsShowNotifi] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const nav = useNavigate()
    useEffect( () => {
        const getCurrentUser = () => {
            dispatch(currentUserAsyncThunk())
        }
        getCurrentUser()
    }, [])
    const handleMouseEnterCartMini = () => {
        setIsShowCartMini(true)
    }
    const handleMouseLeaveCartMini = () => {
        setIsShowCartMini(false)
    }
    const handleMouseEnterNotification = () => {
        setIsShowNotifi(true)
    }
    const handleMouseLeaveNotification = () => {
        setIsShowNotifi(false)
    }
    const items: MenuProps['items'] = [
        {
            label: (<Link to="/home" >Trang chủ</Link>),
            key: 'home',
            icon: <MailOutlined />,
            style: {
                color: "#884dff"
            }
        },
        {
            label: (<Link to="/login" >Đăng nhập</Link>),
            key: 'login',
            icon: <AppstoreOutlined />,
            style: {
                color: "#884dff"
            }
        },
        {
            label: (<Link to="/admin/home">Quản trị</Link>),
            key: 'admin',
            icon: <SettingOutlined />,
            style: {
                color: "#884dff"
            }
        },
        {
            label: `${user.firstName} ${user.lastName}`,
            key: 'username',
            icon: <UserOutlined />,
            style: {
                color: "#884dff",

            },
            children: [
                {
                    label: "Đăng xuất",
                    key: 'logout',
                    onClick: () => {
                        localStorage.removeItem("accessToken")
                        dispatch(logout())
                    },
                    style: {
                        color: "#884dff"
                    }
                },
                {
                    label: (<Link to="/user/profile">Hồ sơ</Link>),
                    key: 'profile',
                    style: {
                        color: "#884dff"
                    }
                },
                {
                    label: (<Link to="/register-seller">Đăng ký đối tác</Link>),
                    key: 'registerSeller',
                    style: {
                        color: "#884dff"
                    }
                }
            ]
        },
        {
            label: (<Link to="/register">Đăng ký</Link>),
            key: "register",
            style: {
                color: "#884dff"
            }
        },
        {
            label: (<Link to="/shop-create">Tạo shop</Link>),
            key: "shopCreate",
            style: {
                color: "#884dff"
            }
        }
    ];
    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    const onSearch = (value: string) => {
        console.log(value)
    }


    return (
        <div className="header">
            <div className="header-child">
                <Row>
                    <Col span={10}>
                        <h1 style={{ color: "#884dff" }}>Ecommerce</h1>
                    </Col>
                    <Col span={14}>
                        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px', marginLeft: '25px' }}>
                    <Col span={10}>
                    </Col>
                    <Col span={8}>
                        <Search
                            placeholder="Tìm kiếm"
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={onSearch}

                        />
                    </Col>
                    <Col span={6}>
                        <Row justify="space-between">
                            <Col span={4}>
                            </Col>
                            <Col  span={4} onMouseEnter={handleMouseEnterCartMini} onMouseLeave={handleMouseLeaveCartMini} onClick={() => nav("/cart")}>
                                <Badge count={cartCount} className="cs-pointer">
                                    <ShoppingCartOutlined onClick={() => nav("/cart")} style={{ fontSize: '25px', color: "#884dff" }} className="icon-color cs-pointer" />
                                </Badge>
                                {
                                    isShowCartMini === true
                                        ?
                                        <div className="cart-mini">
                                            <MiniCartItem />
                                            <MiniCartItem />
                                            <MiniCartItem />
                                            <MiniCartItem />
                                        </div>
                                        :
                                        null
                                }
                            </Col>
                            <Col  span={4} onMouseEnter={handleMouseEnterNotification} onMouseLeave={handleMouseLeaveNotification}>
                                <Badge count={100} className="cs-pointer">
                                    <BellOutlined onClick={() => nav("/notification")} style={{ fontSize: '25px', color: "#884dff" }} className="icon-color cs-pointer" />
                                </Badge>
                                {
                                    isShowNotifi === true
                                        ?
                                        <div className="cart-mini notification">
                                            <MiniCardNotification />
                                            <MiniCardNotification />
                                            <MiniCardNotification />
                                        </div>
                                        :
                                        null
                                }
                            </Col>
                            <Col span={8}></Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Header