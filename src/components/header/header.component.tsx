import { AppstoreOutlined, BellOutlined, DownOutlined, HomeOutlined, MailOutlined, MessageOutlined, NotificationFilled, NotificationOutlined, SettingOutlined, ShopOutlined, ShoppingCartOutlined, ShoppingFilled, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
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
import { getAllItemAsyncThunk, setNullCartItem } from "../../store/slices/cartitem.slice";
import { logoutAdmin } from "../../store/slices/user-admin.slice";
// import { socket } from "../../App";
import { endpoint } from "../../configs/Api";
import { authAxios } from "../../lib/axios/axios.config";
import { socket } from "../../utils/socket";
import { getAllConversationAsyncThunk, setNullConversation } from "../../store/slices/conversation.slice";

const Header = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const listProductCart = useSelector((state: RootState) => state.cartItem.listProducts)
  const cartCount = useSelector((state: RootState) => state.cartItem.totalProduct)
  const [isShowCartMini, setIsShowCartMini] = useState<boolean>(false)
  const [isShowNotifi, setIsShowNotifi] = useState<boolean>(false)
  const listConversation = useSelector((state: RootState) => state.conversation.listConversation)
  const [statusLogin, setStatusLogin] = useState<any>({
  })
  const [notification, setNotification] = useState<any[]>([]);
  const dispatch = useAppDispatch()
  const nav = useNavigate()
  const totalProductCart = useSelector((state: RootState) => state.cartItem.totalProduct)
  useEffect(() => {
    const getCurrentUser = async () => {
      const res = await dispatch(currentUserAsyncThunk())
      if (res.payload.id) {
        socket.emit('clientLogin', {
          userId: res.payload.id
        })
      }
    }
    const getCart = () => {
      dispatch(getAllItemAsyncThunk())
    }
    const checkLogin = () => {
      if (localStorage.getItem('accessToken')) {

      }
    }
    getCurrentUser()
    getCart()
    checkLogin()
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
  const accessToken = localStorage.getItem('accessToken')

  const loadNotification = async () => {
    try {
      const res = await authAxios().get(endpoint.notification.base);

      if (res.status === 200) {
        const listNotif = res.data.map((item: any) => {
          return { content: item.content, valueId: item.valueId };
        });
        setNotification(listNotif);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      loadNotification();
    } else {
      setNotification([]);
    }
  }, [accessToken]);

  useEffect(() => {
    socket.off("getNotification").on("getNotification", (data: any) => {
      console.log("getNotification");
      setNotification((prev) => {
        return [{ ...data }, ...prev];
      });
    });
  }, [socket]);

  useEffect(() => {
    const getAllConversation = () => {
      dispatch(getAllConversationAsyncThunk())
    }
    getAllConversation()
  }, [])

  const items: MenuProps['items'] = [
    {
      label: (<Link to="/" >Trang chủ</Link>),
      key: 'home',
      icon: <HomeOutlined />,
      style: {
        color: "black"
      }
    },
    !localStorage.getItem('accessToken') ? {
      label: <Link to='/login'>Đăng nhập</Link>,
      key: 'login',
      icon: <AppstoreOutlined />,
      style: {
        color: "black"
      }

    } : null,
    // user.userName !== "" ?
    //   {
    //     label: (<Link to="/admin/home">Quản trị</Link>),
    //     key: 'admin',
    //     icon: <SettingOutlined />,
    //     style: {
    //       color: "black"
    //     }
    //   } : null,
    user.userName !== "" ?
      {
        label: `${user.firstName} ${user.lastName}`,
        key: 'username',
        icon: <UserOutlined />,
        style: {
          color: "black",

        },
        children: [
          {
            label: "Đăng xuất",
            key: 'logout',
            onClick: () => {
              localStorage.removeItem("accessToken")
              dispatch(logout())
              dispatch(logoutAdmin())
              dispatch(setNullConversation())
              nav("/login")
              dispatch(setNullCartItem())
              socket.emit('logout');
              
            },
            style: {
              color: "black"
            }
          },
          {
            label: (<Link to="/user/profile">Hồ sơ</Link>),
            key: 'profile',
            style: {
              color: "black"
            }
          },
          {
            label: (<Link to="/register-seller">Đăng ký đối tác</Link>),
            key: 'registerSeller',
            style: {
              color: "black"
            }
          }
        ]
      } : null,
    user.userName
      ?
      null
      :
      {
        label: (<Link to="/register">Đăng ký</Link>),
        key: "register",
        style: {
          color: "black"
        }
      },
    user.userName !== "" ?
      {
        label: (<Link to="/shop-create">Tạo shop</Link>),
        key: "shopCreate",
        icon: <ShopOutlined/>,
        style: {
          color: "black"
        }
      }
      : null
  ];

  const [current, setCurrent] = useState('home');
  const [kw, setKw] = useState('')

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  const onSearch = (value: string) => {
    nav(`/categories/1?kw=${value}`)
    setKw('')
  }


  return (
    <div className="header">
      <div className="header-child">
        <Row>
          <Col span={10}>
          <h1
              onClick={() => nav('/')}
              style={{ color: '#00cc99', cursor: 'pointer' }}
            >
              Ecommerce
            </h1>
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
              placeholder="Nhập từ khóa ..."
              onSearch={onSearch}
              value={kw}
              onChange={(e) => setKw(e.target.value)}
              style={{ width: 400, borderColor: '#00cc99' }}
              size="large" />

          </Col>
          <Col span={6}>
            <Row justify="space-between">
              <Col span={4}>
              </Col>
              <Col span={4} onClick={() => nav("/chat")}>
                <Badge count={listConversation?.length} className="cs-pointer">
                  <MessageOutlined onClick={() => nav("/cart")} style={{ fontSize: '22px', color: "#00cc99" }} className="icon-color cs-pointer" />
                </Badge>
              </Col>
              <Col span={4} onMouseEnter={handleMouseEnterCartMini} onMouseLeave={handleMouseLeaveCartMini} onClick={() => nav("/cart")}>
                <Badge count={cartCount} className="cs-pointer">
                  <ShoppingCartOutlined onClick={() => nav("/cart")} style={{ fontSize: '25px', color: "#00cc99" }} className="icon-color cs-pointer" />
                </Badge>
                {
                  isShowCartMini === true
                    ?
                    <div className="cart-mini">
                      {listProductCart.length > 0 ? 
                        listProductCart.map((item) => <MiniCartItem image={item.image} name={item.name} price={item.unitPrice ? item.unitPrice : item.price} />)
                        :
                        null
                      }
                    </div>
                    :
                    null
                }
              </Col>
              <Col span={4} onMouseEnter={handleMouseEnterNotification} onMouseLeave={handleMouseLeaveNotification}>
                <Badge count={notification?.length} className="cs-pointer">
                  <BellOutlined onClick={() => nav("/notification")} style={{ fontSize: '25px', color: "#00cc99" }} className="icon-color cs-pointer" />
                </Badge>
                {isShowNotifi === true ? (
                  <div className="cart-mini notification">
                    {notification.map((item: any) => (
                      <MiniCardNotification
                        content={item.content}
                        valueId={item.valueId}
                      />
                    ))}
                  </div>
                ) : null}
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