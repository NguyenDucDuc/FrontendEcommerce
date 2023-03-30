import { AimOutlined } from "@ant-design/icons"
import { Col, Row } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { number, string } from "yup"
import { AuthApi, endpoint } from "../../configs/Api"
import { updateTotalPriceCheckedList } from "../../store/slices/product-checked.slice"
import { RootState, useAppDispatch } from "../../store/store"
import CardConfirmCheckout from "./card-confirm-checkout/card-confirm-checkout.component"
import CardProductCheckout from "./card-product-checkout/card-product-checkout.component"
import "./checkout.style.scss"



const Checkout = () => {
    const listProductsChecked = useSelector((state: RootState) => state.productsChecked.listProductsChecked)
    const totalPrice = useSelector((state: RootState) => state.productsChecked.totalPrice)
    const dispatch = useAppDispatch()
    const [currentAddress, setCurrentAddress] = useState<any>()
    const [currentUser, setCurrentUser] = useState<any>()
    useEffect(() => {
        const calcPrice = () => {
            for (let i = 0; i < listProductsChecked.length; i++) {
                for(let j=0; j<listProductsChecked[i].products.length; j++){
                    let total = Number(listProductsChecked[i].products[j].price) * Number(listProductsChecked[i].products[j].quantity) + 40000
                    console.log(total)
                    dispatch(updateTotalPriceCheckedList(total))
                }
            }
        }
        const getCurrentAddress = async () => {
            const res = await AuthApi().get(endpoint.address.currentAddress)
            console.log(res.data.data)
            setCurrentAddress(res.data.data)
        }
        const getCurrentUser = async () => {
            const res = await AuthApi().get(endpoint.user.currentUser)
            setCurrentUser(res.data.data)
        }
        calcPrice()
        getCurrentAddress()
        getCurrentUser()
    }, [])

    const testOrder = async () => {
        if(listProductsChecked.length > 0){
            
            for(let i=0; i< listProductsChecked.length; i++){
                // create order details
                let orderDetails = []
                for(let j=0; j< listProductsChecked[i].products.length; j++){
                    const newOrderDetail = {
                        quantity: Number(listProductsChecked[i].products[j].quantity),
                        unitPrice: Number(listProductsChecked[i].products[j].price),
                        discount: 10.00,
                        productId: listProductsChecked[i].products[j].id,
                        productName: listProductsChecked[i].products[j].name
                    }
                    orderDetails.push(newOrderDetail)
                }
                console.log(orderDetails)
                const res = await AuthApi().post(endpoint.order.buyProduct, {
                    shipAddress: `${currentAddress.detail} ${currentAddress.street} - ${currentAddress.ward} - ${currentAddress.district} - ${currentAddress.city}`,
                    shopId: listProductsChecked[i].shopId,
                    payment: "Thanh toán khi nhận hàng",
                    state: 1,
                    orderDetails
                })
                console.log(res.data)
            }
        }
    }
    return (
        <div>
            <div className="address">
                <div className="address-child">
                    <Row>
                        <Col span={1}>
                            <AimOutlined style={{ fontSize: 25, color: 'red' }} />
                        </Col>
                        <Col span={23}>
                            <h3 style={{ color: 'red' }}>Địa chỉ nhận hàng</h3>
                        </Col>
                    </Row>
                    <Row>
                        {
                            currentUser !== undefined 
                            ?
                            <h4 style={{ marginTop: 20, marginBottom: 20 }}>{`${currentUser.firstName} ${currentUser.lastName} - ${currentUser.phone}`}</h4>
                            :
                            null
                        }
                    </Row>
                    <Row>
                        {
                            currentAddress !== undefined
                            ?
                                <h4>{`${currentAddress.detail} ${currentAddress.street} - ${currentAddress.ward} - ${currentAddress.district} - ${currentAddress.city}`}</h4>
                            :
                            null
                        }
                    </Row>
                </div>
            </div>
            <div className="list-product">
                {/* {
                    listProductsChecked.length > 0 ?
                        listProductsChecked.map((item, idx) => <CardProductCheckout shopName={item.shopName} name={item.name} key={idx} desc={item.desc} image={item.image} id={item.id} quantity={item.quantity} unitPrice={item.price} />)
                        :
                        null
                } */}
                {
                    listProductsChecked.length > 0 ?
                    listProductsChecked.map((item, idx) =>
                        item.products?.map((item, idx) => <CardProductCheckout shopName={item.shopName} name={item.name} key={idx} desc={item.desc} image={item.image} id={item.id} quantity={item.quantity} unitPrice={item.price} />)
                    )
                    : 
                    null
                }
            </div>
            <div className="confirm-checkout">
                {
                    totalPrice !== 0 ?
                        <CardConfirmCheckout testOrder={testOrder} totalPrice={totalPrice} />
                        : null
                }
            </div>
        </div>
    )
}

export default Checkout