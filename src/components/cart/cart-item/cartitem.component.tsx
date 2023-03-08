import { Button, Checkbox, Col, InputNumber, Row } from "antd"
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useNavigate } from "react-router-dom";
import {  ICartItem } from "../../../store/slices/cartitem.slice";
import { useAppDispatch } from "../../../store/store";
import "./cartitem.style.scss"

interface IProps {
    id?: number;
    image?: string;
    desc?: string;
    price: number;
    quantity: number;
}

const CartItem: React.FC<IProps> = ({id, image, desc, price, quantity}) => {
    const valueCheckBox:ICartItem = {
        productId: id,
        image: image,
        desc: desc,
        price: price,
        quantity: quantity
    }
    const dispatch = useAppDispatch()
    const nav = useNavigate()
    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        console.log(e.target.checked)
        if(e.target.checked === true){
            
        }
        if(e.target.checked === false){
            
        }
    }
    return (
        <div className="cart-item">
            <Row>
                <Col span={24}>
                    <h4 className="cs-pointer" onClick={() => nav("/shop-profile")}>Hades Studio</h4>
                    <hr color="#e6e6e6"></hr>
                </Col>
            </Row>
            <Row justify="space-between" className="mgt-20">
                <Col span={2} style={{}}>
                    <div className="cart-img">
                        <img src={image} />
                    </div>
                </Col>
                <Col span={6} className="mgt-20">
                    <h4>{desc}</h4>
                </Col>
                <Col span={3} style={{}} className="mgt-20">
                    <p className="txt-red txt-bold">{price}đ</p>
                </Col>
                <Col span={3} style={{}} className="mgt-20">
                    <InputNumber min={1} max={10} defaultValue={quantity}  />
                </Col>
                <Col span={3} className="mgt-20">
                    <Button type="primary" className="btn-danger">Xóa</Button>
                </Col>
                <Col span={2} className="mgt-20">
                    <Checkbox value={valueCheckBox} onChange={handleCheckboxChange}>

                    </Checkbox>
                </Col>
            </Row>
        </div>
    )
}

export default CartItem