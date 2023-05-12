import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, DatePicker, DatePickerProps, Form, Input, InputRef, Row, Select, Spin, Upload, notification } from "antd"
import axios from "axios";
import { useRef, useState } from "react";
import Api, { endpoint } from "../../configs/Api";
import "./register.style.scss"
import { useNavigate } from "react-router-dom";


export const city = [
    {
        value: "Hòa Bình",
        label: "Hòa Bình",
        district: [
            {
                value: "TP Hòa Bình",
                label: "TP Hòa Bình",
                ward: [
                    {
                        value: "Xã Trung Minh",
                        label: "Xã Trung Minh",
                    },
                    {
                        value: "Xã Yên Mông",
                        label: "Xã Yên Mông",
                    },
                    {
                        value: "Xã Sủ Ngòi",
                        label: "Xã Sủ Ngòi",
                    },
                    {
                        value: "Xã Thái Thịnh",
                        label: "Xã Thái Thịnh",
                    },
                    {
                        value: "Xã Thống Nhất",
                        label: "Xã Thống Nhất",
                    }
                ]
            },
            {
                value: "Huyện Kì Sơn",
                label: "Huyện Kì Sơn",
                ward: [
                    {
                        value: "Xã Dân Hạ",
                        label: "Xã Dân Hạ",
                    },
                    {
                        value: "Xã Dân Hòa",
                        label: "Xã Dân Hòa",
                    },
                    {
                        value: "Xã Độc Lập",
                        label: "Xã Độc Lập",
                    },
                    {
                        value: "Xã Hợp Thịnh",
                        label: "Xã Hợp Thịnh",
                    },
                    {
                        value: "Xã Mông Hóa",
                        label: "Xã Mông Hóa",
                    },
                    {
                        value: "Xã Yên Quang",
                        label: "Xã Yên Quang",
                    }
                ]
            },
            {
                value: "Huyện Lương Sơn",
                label: "Huyện Lương Sơn",
            },
            {
                value: "Huyện Kim Bôi",
                label: "Huyện Kim Bôi",
            },
            {
                value: "Huyện Cao Phong",
                label: "Huyện Cao Phong",
            },
            {
                value: "Huyện Tân Lạc",
                label: "Huyện Tân Lạc",
            },
            {
                value: "Huyện Mai Châu",
                label: "Huyện Mai Châu",
            },
            {
                value: "Huyện Lạc Sơn",
                label: "Huyện Lạc Sơn",
            },
            {
                value: "Huyện Yên Thủy",
                label: "Huyện Yên Thủy",
            },
            {
                value: "Huyện Lạc Thủy",
                label: "Huyện Lạc Thủy",
            },
        ]
    },
    {
        value: "Sơn La",
        label: "Sơn La",
        district: [
            {
                value: "TP Sơn La",
                label: "TP Sơn La",
                ward: [
                    {
                        value: "Xã Chiềng Xôm",
                        label: "Xã Chiềng Xôm",
                    },
                    {
                        value: "Xã Chiêng Ngần",
                        label: "Xã Chiêng Ngần",
                    },
                    {
                        value: "Xã Hua La",
                        label: "Xã Hua La",
                    },
                    {
                        value: "Xã Chiềng Đen",
                        label: "Xã Chiềng Đen",
                    }
                ]
            },
            {
                value: "Huyện Quỳnh Nhai",
                label: "Huyện Quỳnh Nhai",
            },
            {
                value: "Huyện Thuận Châu",
                label: "Huyện Thuận Châu",
            },
            {
                value: "Huyện Mường La",
                label: "Huyện Mường La",
            },
            {
                value: "Huyện Bắc Yên",
                label: "Huyện Bắc Yên",
            },
            {
                value: "Huyện Phủ Yên",
                label: "Huyện Phủ Yên",
            },
            {
                value: "Huyện Mộc Châu",
                label: "Huyện Mộc Châu",
            },
            {
                value: "Huyện Thuận Châu",
                label: "Huyện Thuận Châu",
            },
            {
                value: "Huyện Yên Châu",
                label: "Huyện Yên Châu",
            },
            {
                value: "Huyện Mai Châu",
                label: "Huyện Mai Châu",
            },
        ]
    },
    {
        value: "Điện Biên",
        label: "Điện Biên",
        district: [
            {
                value: "TP Điện Biên",
                label: "TP Điện Biên",
            },
            {
                value: "Huyện Mường Lay",
                label: "Huyện Mường Lay",
            },
            {
                value: "Huyện Mường Nhé",
                label: "Huyện Mường Nhé",
            },
            {
                value: "Huyện Mường Chà",
                label: "Huyện Mường Chà",
            },
            {
                value: "Huyện Tủa Chùa",
                label: "Huyện Tủa Chùa",
            },
            {
                value: "Huyện Tuần Giáo",
                label: "Huyện Tuần Giáo",
            },
            {
                value: "Huyện Nậm Pồ",
                label: "Huyện Nậm Pồ",
            },
        ]
    },
    {
        value: "Lai Châu",
        label: "Lai Châu"
    },
    {
        value: "Lào Cai",
        label: "Lào Cai"
    },
    {
        value: "Yên Bái",
        label: "Yên Bái"
    },
    {
        value: "Thanh Hóa",
        label: "Thanh Hóa"
    },
    {
        value: "Nghệ An",
        label: "Nghệ An"
    },
    {
        value: "Quảng Bình",
        label: "Quảng Bình"
    },
    {
        value: "Hà Tĩnh",
        label: "Hà Tĩnh"
    },
    {
        value: "Thừa Thiên Huế",
        label: "Thừa Thiên Huế"
    },
    {
        value: "TP Hồ Chí Minh",
        label: "TP Hồ Chí Minh",
        district: [
            {
                value: "Quận 1",
                label: "Quận 1",
                ward: [
                    {
                        value: "Phuờng 1",
                        label: "Phường 1",
                    },
                    {
                        value: "Phuờng 2",
                        label: "Phường 2",
                    },
                    {
                        value: "Phuờng 3",
                        label: "Phường 3",
                    },
                    {
                        value: "Phuờng 4",
                        label: "Phường 4",
                    },
                    {
                        value: "Phuờng 5",
                        label: "Phường 5",
                    },
                    {
                        value: "Phuờng 6",
                        label: "Phường 6",
                    },
                    {
                        value: "Phuờng 7",
                        label: "Phường 7",
                    },
                    {
                        value: "Phuờng 8",
                        label: "Phường 8",
                    },
                    {
                        value: "Phuờng 9",
                        label: "Phường 9",
                    },
                    {
                        value: "Phuờng 10",
                        label: "Phường 10",
                    },
                    {
                        value: "Phuờng 11",
                        label: "Phường 11",
                    }
                ]
            },
            {
                value: "Quận 2",
                label: "Quận 2",
                ward: [
                    {
                        value: "Phuờng 1",
                        label: "Phường 1",
                    },
                    {
                        value: "Phuờng 2",
                        label: "Phường 2",
                    },
                    {
                        value: "Phuờng 3",
                        label: "Phường 3",
                    },
                    {
                        value: "Phuờng 4",
                        label: "Phường 4",
                    },
                    {
                        value: "Phuờng 5",
                        label: "Phường 5",
                    },
                    {
                        value: "Phuờng 6",
                        label: "Phường 6",
                    },
                    {
                        value: "Phuờng 7",
                        label: "Phường 7",
                    },
                    {
                        value: "Phuờng 8",
                        label: "Phường 8",
                    },
                    {
                        value: "Phuờng 9",
                        label: "Phường 9",
                    },
                    {
                        value: "Phuờng 10",
                        label: "Phường 10",
                    },
                    {
                        value: "Phuờng 11",
                        label: "Phường 11",
                    }
                ]
            },
            {
                value: "Quận 3",
                label: "Quận 3",
                ward: [
                    {
                        value: "Phuờng 1",
                        label: "Phường 1",
                    },
                    {
                        value: "Phuờng 2",
                        label: "Phường 2",
                    },
                    {
                        value: "Phuờng 3",
                        label: "Phường 3",
                    },
                    {
                        value: "Phuờng 4",
                        label: "Phường 4",
                    },
                    {
                        value: "Phuờng 5",
                        label: "Phường 5",
                    },
                    {
                        value: "Phuờng 6",
                        label: "Phường 6",
                    },
                    {
                        value: "Phuờng 7",
                        label: "Phường 7",
                    },
                    {
                        value: "Phuờng 8",
                        label: "Phường 8",
                    },
                    {
                        value: "Phuờng 9",
                        label: "Phường 9",
                    },
                    {
                        value: "Phuờng 10",
                        label: "Phường 10",
                    },
                    {
                        value: "Phuờng 11",
                        label: "Phường 11",
                    }
                ]
            },
            {
                value: "Quận 4",
                label: "Quận 4",
                ward: [
                    {
                        value: "Phuờng 1",
                        label: "Phường 1",
                    },
                    {
                        value: "Phuờng 2",
                        label: "Phường 2",
                    },
                    {
                        value: "Phuờng 3",
                        label: "Phường 3",
                    },
                    {
                        value: "Phuờng 4",
                        label: "Phường 4",
                    },
                    {
                        value: "Phuờng 5",
                        label: "Phường 5",
                    },
                    {
                        value: "Phuờng 6",
                        label: "Phường 6",
                    },
                    {
                        value: "Phuờng 7",
                        label: "Phường 7",
                    },
                    {
                        value: "Phuờng 8",
                        label: "Phường 8",
                    },
                    {
                        value: "Phuờng 9",
                        label: "Phường 9",
                    },
                    {
                        value: "Phuờng 10",
                        label: "Phường 10",
                    },
                    {
                        value: "Phuờng 11",
                        label: "Phường 11",
                    }
                ]
            },
            {
                value: "Quận 5",
                label: "Quận 5",
                ward: [
                    {
                        value: "Phuờng 1",
                        label: "Phường 1",
                    },
                    {
                        value: "Phuờng 2",
                        label: "Phường 2",
                    },
                    {
                        value: "Phuờng 3",
                        label: "Phường 3",
                    },
                    {
                        value: "Phuờng 4",
                        label: "Phường 4",
                    },
                    {
                        value: "Phuờng 5",
                        label: "Phường 5",
                    },
                    {
                        value: "Phuờng 6",
                        label: "Phường 6",
                    },
                    {
                        value: "Phuờng 7",
                        label: "Phường 7",
                    },
                    {
                        value: "Phuờng 8",
                        label: "Phường 8",
                    },
                    {
                        value: "Phuờng 9",
                        label: "Phường 9",
                    },
                    {
                        value: "Phuờng 10",
                        label: "Phường 10",
                    },
                    {
                        value: "Phuờng 11",
                        label: "Phường 11",
                    }
                ]
            },
            {
                value: "Quận 6",
                label: "Quận 6",
                ward: [
                    {
                        value: "Phuờng 1",
                        label: "Phường 1",
                    },
                    {
                        value: "Phuờng 2",
                        label: "Phường 2",
                    },
                    {
                        value: "Phuờng 3",
                        label: "Phường 3",
                    },
                    {
                        value: "Phuờng 4",
                        label: "Phường 4",
                    },
                    {
                        value: "Phuờng 5",
                        label: "Phường 5",
                    },
                    {
                        value: "Phuờng 6",
                        label: "Phường 6",
                    },
                    {
                        value: "Phuờng 7",
                        label: "Phường 7",
                    },
                    {
                        value: "Phuờng 8",
                        label: "Phường 8",
                    },
                    {
                        value: "Phuờng 9",
                        label: "Phường 9",
                    },
                    {
                        value: "Phuờng 10",
                        label: "Phường 10",
                    },
                    {
                        value: "Phuờng 11",
                        label: "Phường 11",
                    }
                ]
            },
            {
                value: "Quận 7",
                label: "Quận 7",
            },
            {
                value: "Quận 8",
                label: "Quận 8",
            },
            {
                value: "Quận 9",
                label: "Quận 9",
            },
            {
                value: "Quận 10",
                label: "Quận 10",
            },
            {
                value: "Quận 11",
                label: "Quận 11",
            },
            {
                value: "Quận 12",
                label: "Quận 12",
            },
            {
                value: "Quận Gò Vấp",
                label: "Quận Gò Vấp",
                ward: [
                    {
                        value: "Phuờng 1",
                        label: "Phường 1",
                    },
                    {
                        value: "Phuờng 2",
                        label: "Phường 2",
                    },
                    {
                        value: "Phuờng 3",
                        label: "Phường 3",
                    },
                    {
                        value: "Phuờng 4",
                        label: "Phường 4",
                    },
                    {
                        value: "Phuờng 5",
                        label: "Phường 5",
                    },
                    {
                        value: "Phuờng 6",
                        label: "Phường 6",
                    },
                    {
                        value: "Phuờng 7",
                        label: "Phường 7",
                    },
                    {
                        value: "Phuờng 8",
                        label: "Phường 8",
                    },
                    {
                        value: "Phuờng 9",
                        label: "Phường 9",
                    },
                    {
                        value: "Phuờng 10",
                        label: "Phường 10",
                    },
                    {
                        value: "Phuờng 11",
                        label: "Phường 11",
                    }
                ]
            },
            {
                value: "Quận Tân Bình",
                label: "Quận Tân Bình",
                ward: [
                    {
                        value: "Phuờng 1",
                        label: "Phường 1",
                    },
                    {
                        value: "Phuờng 2",
                        label: "Phường 2",
                    },
                    {
                        value: "Phuờng 3",
                        label: "Phường 3",
                    },
                    {
                        value: "Phuờng 4",
                        label: "Phường 4",
                    },
                    {
                        value: "Phuờng 5",
                        label: "Phường 5",
                    },
                    {
                        value: "Phuờng 6",
                        label: "Phường 6",
                    },
                    {
                        value: "Phuờng 7",
                        label: "Phường 7",
                    },
                    {
                        value: "Phuờng 8",
                        label: "Phường 8",
                    },
                    {
                        value: "Phuờng 9",
                        label: "Phường 9",
                    },
                    {
                        value: "Phuờng 10",
                        label: "Phường 10",
                    },
                    {
                        value: "Phuờng 11",
                        label: "Phường 11",
                    }
                ]
            }
        ]
    },
    {
        value: "Vũng Tàu",
        label: "Vũng Tàu"
    },
    {
        value: "Bình Phước",
        label: "Bình Phước"
    },
    {
        value: "Bình Dương",
        label: "Bình Dương"
    },
    {
        value: "Đồng Nai",
        label: "Đồng Nai"
    },
    {
        value: "Tây Ninh",
        label: "Tây Ninh"
    },
    {
        value: "Phú Thọ",
        label: "Phú Thọ"
    },
    {
        value: "Hà Giang",
        label: "Hà Giang"
    },
    {
        value: "Tuyên Quang",
        label: "Tuyên Quang"
    },
    {
        value: "Cao Bằng",
        label: "Cao Bằng"
    },
    {
        value: "Bắc Kạn",
        label: "Bắc Kạn"
    },
    {
        value: "Thái Nguyên",
        label: "Thái Nguyên"
    },
    {
        value: "Lạng Sơn",
        label: "Lạng Sơn"
    },
    {
        value: "Bắc Giang",
        label: "Bắc Giang"
    },
    {
        value: "Quảng Ninh",
        label: "Quảng Ninh"
    },
    {
        value: "Quảng Nam",
        label: "Quảng Nam"
    },
    {
        value: "Đà Nẵng",
        label: "Đà Nẵng"
    },
    {
        value: "Quãng Ngãi",
        label: "Quãng Ngãi"
    },
    {
        value: "Bình Định",
        label: "Bình Định"
    },
    {
        value: "Phú Yên",
        label: "Phú Yên"
    },
    {
        value: "Khánh Hòa",
        label: "Khánh Hòa"
    },
    {
        value: "Ninh Thuận",
        label: "Ninh Thuận"
    },
    {
        value: "Bình Thuận",
        label: "Bình Thuận"
    },
    {
        value: "An Giang",
        label: "An Giang"
    },
    {
        value: "Bạc Liêu",
        label: "Bạc Liêu"
    },
    {
        value: "Cà Mau",
        label: "Cà Mau"
    },
    {
        value: "Bến Tre",
        label: "Bến Tre"
    },
    {
        value: "Cần Thơ",
        label: "Cần Thơ"
    },
    {
        value: "Đồng Tháp",
        label: "Đồng Tháp"
    },
    {
        value: "Hậu Giang",
        label: "Hậu Giang"
    },
    {
        value: "Kiên Giang",
        label: "Kiên Giang"
    },
    {
        value: "Tiền Giang",
        label: "Tiền Giang"
    },
    {
        value: "Long An",
        label: "Long An"
    },
    {
        value: "Sóc Trăng",
        label: "Sóc Trăng"
    },
    {
        value: "Trà Vinh",
        label: "Trà Vinh"
    },
    {
        value: "Vĩnh Long",
        label: "Vĩnh Long"
    },
    {
        value: "Kon Tum",
        label: "Kon Tum"
    },
    {
        value: "Gia Lai",
        label: "Gia Lai"
    },
    {
        value: "Dak Lak",
        label: "Dak Lak"
    },
    {
        value: "Dak Nong",
        label: "Dak Nong"
    },
    {
        value: "Lâm Đồng",
        label: "Lâm Đồng"
    },
    {
        value: "Hà Nội",
        label: "Hà Nội"
    },
    {
        value: "Bắc Ninh",
        label: "Bắc Ninh"
    },
    {
        value: "Hà Nam",
        label: "Hà Nam"
    },
    {
        value: "Hải Dương",
        label: "Hải Dương"
    },
    {
        value: "Hải Phòng",
        label: "Hải Phòng"
    },
    {
        value: "Hưng Yên",
        label: "Hưng Yên"
    },
    {
        value: "Nam Định",
        label: "Nam Định"
    },
    {
        value: "Thái Bình",
        label: "Thái Bình"
    },
    {
        value: "Vĩnh Phúc",
        label: "Vĩnh Phúc"
    },
    {
        value: "Ninh Bình",
        label: "Ninh Bình"
    },
]


const Register = () => {
    const [api, contextHolder] = notification.useNotification()
    const nav = useNavigate()
    const [avatar, setAvatar] = useState<any>([])
    const [wards, setWards] = useState<any>([])
    const [districts, setDistricts] = useState<any>([])
    const [status, setStaus] = useState<boolean>(false)
    const onFinish = async (values: any) => {
        values.avatar = avatar
        console.log('Success:', values);
        let formData = new FormData()
        formData.append("userName", values.userName)
        formData.append("passWord", values.passWord)
        formData.append("firstName", values.firstName)
        formData.append("lastName", values.lastName)
        formData.append("avatar", avatar)
        formData.append("phone", values.phone)
        formData.append("email", values.email)
        formData.append("city", values.city)
        formData.append("district", values.district)
        formData.append("ward", values.ward)
        formData.append("street", values.street)
        formData.append("detail", values.detail)
        formData.append("birthDay", values.birthDay)
        setStaus(true)
        const res = await Api.post(endpoint.user.register, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        setStaus(false)
        if (res.data.status == 201) {
            api.success({
                message: `Thông báo`,
                description: 'Tạo tài khoản thành công.',
                duration: 3,
            })

            setTimeout(() => {
                nav('/login')
            },500)
        }
        console.log(res.data)

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const display = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setAvatar(event.target.files[0])
        }

    }

    const upload = async () => {
        let formData = new FormData()
        formData.append("avatar", avatar)
        const res = await Api.post("/user/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        console.log(res.data)
    }

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(dateString)
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
    if (status === true) {
        return <Spin size="large" tip="Tài khoản của bạn đang được tạo, vui lòng chờ trong giây lát!" style={{
            width: '100%',
            margin: '0 auto',
            marginTop: 300
        }} />
    }
    return (
        <div className="register">
            {contextHolder}
            <Row>
                <Col span={12}>
                    <div className="register-img">
                        <img src="images/login-ecommerce.png" />
                    </div>
                </Col>
                <Col span={12}>
                    <Form size="large"
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off">
                        <Form.Item
                            label="Tên tài khoản"
                            name="userName"
                            rules={[{ required: true, message: 'Bắt buộc!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Họ, tên lót"
                            name="firstName"
                            rules={[{ required: true, message: 'Bắt buộc!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Tên chính"
                            name="lastName"
                            rules={[{ required: true, message: 'Bắt buộc!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Ngày sinh"
                            name="birthDay"
                            rules={[{ required: true, message: 'Bắt buộc!' }]}>
                            <Input type="date" />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Bắt buộc!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Bắt buộc!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Tỉnh/Thành phố"
                            name="city"
                            rules={[{ required: true, message: 'Bắt buộc!' }]}>
                            <Select options={city} showSearch onChange={handleCityChange} />
                        </Form.Item>

                        <Form.Item
                            label="Quận/Huyện"
                            name="district"
                            rules={[{ required: true, message: 'Bắt buộc!' }]}>
                            <Select options={districts} showSearch onChange={handleDistrictChange} />
                        </Form.Item>

                        <Form.Item
                            label="Phường/Xã"
                            name="ward"
                            rules={[{ required: true, message: 'Bắt buộc!' }]}>
                            <Select options={wards} showSearch />
                        </Form.Item>

                        <Form.Item
                            label="Đường"
                            name="street"
                            rules={[{ required: true, message: 'Bắt buộc!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Số nhà"
                            name="detail"
                            rules={[{ required: true, message: 'Bắt buộc!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Ảnh đại diện"
                            name="avatar"
                            rules={[{ required: true, message: 'Bắt buộc!' }]}>
                            <Input type="file" onChange={(e) => display(e)} />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="passWord"
                            rules={[{ required: true, message: 'Bắt buộc!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox >Nhớ mật khẩu</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" className="btn-color" size="large">
                                Đăng ký
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Register