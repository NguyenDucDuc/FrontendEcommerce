import { Button, Form, Input, Select } from "antd"
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthApi, endpoint } from "../../../ configs/Api";
import { RootState } from "../../../store/store";
import { city } from "../../register/register.component";
import "./address.style.scss"



const Address = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const [currentAddress, setCurrentAddress] = useState<any>()
    const [wards, setWards] = useState<any>([])
    const [districts, setDistricts] = useState<any>([])
    useEffect( () => {
        const getCurrentAddress = async () => {
            const res = await AuthApi().get(endpoint.address.currentAddress)
            console.log(res.data)
            setCurrentAddress(res.data.data)
        }
        getCurrentAddress()
    }, [])

    const onFinish = async (values: any) => {
        
        let body: any = {}
        const decode: any = await jwtDecode(localStorage.getItem("accessToken")||"")
        if(values.city !== undefined && values.city !== currentAddress.city){
            
            body.city = values.city
        }
        if(values.district !== undefined && values.district !== currentAddress.district){
            
            body.district = values.district
        }
        if(values.ward !== undefined && values.ward !== currentAddress.ward){
            
            body.ward = values.ward
        }
        if(values.street !== undefined && values.street !== currentAddress.street){
            let streetName = values.street.split(" ")
            let stringStreet = ""
            for(let i=1; i< streetName.length; i++){
                if(i === streetName.length - 1){
                    stringStreet += streetName[i]
                } else {
                    stringStreet += `${streetName[i]} `
                }
                
                
            }
            body.street = stringStreet
        }
        if(values.street !== undefined && values.street.split(" ")[0]){
            body.detail = values.street.split(" ")[0]
        }
       
        const res = await AuthApi().patch(endpoint.address.updateAddress(decode.userId), body)
        console.log(res.data)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const handleCityChange = (value: string) => {
        console.log(value)
        const district = city.find(c => c.value === value)
        console.log(district)
        if(district !== undefined) {
            setDistricts(district.district)
        }
    }
    const handleDistrictChange = (value: string) => {
        const w = districts.find((item: any) => item.value === value)
        console.log(w)
        setWards(w.ward)
    }
    return (
        <div className="profile-address">
            <h1>Địa Chỉ Của Tôi</h1>
            {currentAddress !== undefined ? 
                <p>Địa chỉ hiện tại: {`${currentAddress.detail} ${currentAddress.street}, ${currentAddress.ward}, ${currentAddress.district}, ${currentAddress.city}`}</p>
                :
                null
            }
            <div className="profile-address-child">
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
                    <Select options={wards} showSearch  />
                </Form.Item>

                <Form.Item
                    label="Đường"
                    name="street"
                >
                    <Input placeholder="Nhập tên đường" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" className="btn-color">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            </div>
        </div>
    )
}

export default Address