import { Button, Checkbox, Col, InputNumber, Row } from "antd"
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { valueType } from "antd/es/statistic/utils";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthApi, endpoint } from "../../../configs/Api";
import {  decreaseTotalPrice, decreaseTotalPriceTotalProductPayment, ICartItem, increaseTotalPrice, increaseTotalPriceTotalProductPayment } from "../../../store/slices/cartitem.slice";
import { addItemChecked, ICheckedItem, removeItemChecked } from "../../../store/slices/product-checked.slice";
import { RootState, useAppDispatch } from "../../../store/store";
import "./cartitem.style.scss"

interface IProps {
    id?: number;
    image?: string;
    desc?: string;
    price: number;
    quantity: number;
    name?: string;
}

const CartItem: React.FC<IProps> = ({id, image, desc, price, quantity, name}) => {
    const valueCheckBox:ICartItem = {
        id: id,
        image: image,
        desc: desc,
        price: price,
        quantity: quantity,
        name: name
    }
    const [inputNumber, setInputNumber] = useState<number>(quantity)
    const dispatch = useAppDispatch()
    const nav = useNavigate()
    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        console.log(e.target.checked)
        if(e.target.checked === true){
            const totalPrice = price * inputNumber
            dispatch(increaseTotalPriceTotalProductPayment({totalPrice: totalPrice}))
            // add from redux checked item
            const newItemChecked: ICheckedItem = {
                id: id,
                name: name,
                desc: desc,
                quantity: quantity,
                price: price,
                image: image
            }
            dispatch(addItemChecked(newItemChecked))
        }
        if(e.target.checked === false){
            const totalPrice = price * inputNumber
            dispatch(decreaseTotalPriceTotalProductPayment({totalPrice: totalPrice}))
            console.log(totalPrice)
            // remove from redux checked item
            const newItemChecked: ICheckedItem = {
                id: id,
                name: name,
                desc: desc,
                quantity: quantity,
                price: price
            }
            dispatch(removeItemChecked(newItemChecked))
        }
    }
    const handleQuantityChange = async (value: number|string|null) => {
        setInputNumber(Number(value))
        // update to database
        const res = await AuthApi().patch(endpoint.productCart.update, {
            productId: id,
            quantity: value
        })
        console.log(res.data)
        // update UI
    }
    const onStep = (value: number, info: any) => {
        if(info.type === "up"){
            dispatch(increaseTotalPrice({unitPrice: Number(price)}))
        }
        if(info.type === "down"){
            dispatch(decreaseTotalPrice({unitPrice: Number(price)}))
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
                        <LazyLoadImage src={image} />
                    </div>
                </Col>
                <Col span={6} className="mgt-20">
                    <h4>{name}  |  {desc}</h4>
                </Col>
                <Col span={3} style={{}} className="mgt-20">
                    <p className="txt-red txt-bold">{price}đ</p>
                </Col>
                <Col span={3} style={{}} className="mgt-20">
                    <InputNumber min={1} max={10} defaultValue={quantity} onChange={handleQuantityChange} onStep={onStep} />
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