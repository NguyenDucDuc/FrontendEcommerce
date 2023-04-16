import { Button, Checkbox, Col, InputNumber, Row } from "antd"
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { valueType } from "antd/es/statistic/utils";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Api, { AuthApi, endpoint } from "../../../configs/Api";
import { decreaseCartCount, decreaseTotalPrice, decreaseTotalPriceTotalProductPayment, deleteItemAsyncThunk, ICartItem, increaseTotalPrice, increaseTotalPriceTotalProductPayment } from "../../../store/slices/cartitem.slice";
import { addItemChecked, ICheckedItem, removeItemChecked, updateQuantityCheckedList } from "../../../store/slices/product-checked.slice";
import { RootState, useAppDispatch } from "../../../store/store";
import "./cartitem.style.scss"

interface IProps {
    id?: number;
    image?: string;
    desc?: string;
    price: number;
    quantity: number;
    name?: string;
    shopId: number;
}

const CartItem: React.FC<IProps> = ({ id, image, desc, price, quantity, name, shopId }) => {
    const valueCheckBox: ICartItem = {
        id: id,
        image: image,
        desc: desc,
        price: price,
        quantity: quantity,
        name: name,
        shopId: shopId
    }
    const [shop, setShop] = useState<any>({
        shopName: ""
    })
    const [inputNumber, setInputNumber] = useState<number>(quantity)
    const dispatch = useAppDispatch()
    const nav = useNavigate()
    const [check, setCheck] = useState<boolean>()
    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        console.log(e.target.checked)
        if (e.target.checked === true) {
            // set check box == true
            setCheck(e.target.checked)
            const totalPrice = price * inputNumber
            dispatch(increaseTotalPriceTotalProductPayment({ totalPrice: totalPrice }))
            // add from redux checked item
            const newItemChecked: ICheckedItem = {
                id: id,
                name: name,
                desc: desc,
                quantity: quantity,
                price: price,
                image: image,
                shopName: shop.shopName,
                shopId: shopId
            }
            dispatch(addItemChecked(newItemChecked))
        }
        if (e.target.checked === false) {
            // set state checkbox == false
            setCheck(e.target.checked)
            const totalPrice = price * inputNumber
            dispatch(decreaseTotalPriceTotalProductPayment({ totalPrice: totalPrice }))
            console.log(totalPrice)
            // remove from redux checked item
            const newItemChecked: ICheckedItem = {
                id: id,
                name: name,
                desc: desc,
                quantity: quantity,
                price: price,
                image: image,
                shopName: shop.shopName,
                shopId: shopId
            }
            dispatch(removeItemChecked(newItemChecked))
        }
    }
    const handleQuantityChange = async (value: number | string | null) => {
        setInputNumber(Number(value))
        // update into checked list product
        dispatch(updateQuantityCheckedList({ productId: id, quantity: Number(value), shopId: shopId }))
        // update to database
        const res = await AuthApi().patch(endpoint.productCart.update, {
            productId: id,
            quantity: value
        })
        console.log(res.data)
        // update UI
    }
    const onStep = (value: number, info: any) => {
        if (info.type === "up" && check === true) {
            dispatch(increaseTotalPrice({ unitPrice: Number(price) }))

        }
        if (info.type === "down" && check == true) {
            dispatch(decreaseTotalPrice({ unitPrice: Number(price) }))
        }
    }

    const handleDeleteCartItem = async () => {
        if(id !== undefined){
            await dispatch(deleteItemAsyncThunk(id))
        }
    }

    useEffect(() => {
        const getShopInfo = async () => {
            if (shopId !== 0) {
                const res = await AuthApi().get(endpoint.shop.getDetail(shopId))
                console.log(res.data)
                setShop(res.data.data)
            }
        }
        getShopInfo()
    }, [])
    return (
        <div className="cart-item">
            <Row>
                <Col span={24}>
                    <h4 className="cs-pointer" onClick={() => nav("/shop-profile")}>{shop.shopName}</h4>
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
                    <Button type="primary" className="btn-danger" onClick={handleDeleteCartItem}>Xóa</Button>
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