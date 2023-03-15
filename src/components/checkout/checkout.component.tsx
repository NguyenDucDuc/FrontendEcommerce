import { AimOutlined } from "@ant-design/icons"
import { Col, Row } from "antd"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import CardConfirmCheckout from "./card-confirm-checkout/card-confirm-checkout.component"
import CardProductCheckout from "./card-product-checkout/card-product-checkout.component"
import "./checkout.style.scss"



const Checkout = () => {
    const listProductsChecked = useSelector((state: RootState) => state.productsChecked.listProductsChecked)
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
                        <h4 style={{ marginTop: 20, marginBottom: 20 }}>Nguyễn Đức Đức-0356879921</h4>
                    </Row>
                    <Row>
                        <h4>623 Điện Biên Phủ - Phường 1 - Quận 3 - TP.Hồ Chí Minh</h4>
                    </Row>
                </div>
            </div>
            <div className="list-product">
                {
                    listProductsChecked.length > 0 ? 
                    listProductsChecked.map((item, idx) => <CardProductCheckout key={idx} productName={item.desc} image={item.image} id={item.id} quantity={item.quantity} unitPrice={item.price} />)
                    :
                    null
                }
            </div>
            <div className="confirm-checkout">
                <CardConfirmCheckout />
            </div>
        </div>
    )
}

export default Checkout