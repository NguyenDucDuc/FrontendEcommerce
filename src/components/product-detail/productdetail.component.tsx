import { CloseOutlined, EyeOutlined, HeartOutlined, MessageOutlined, SendOutlined, ShoppingCartOutlined, WarningOutlined } from "@ant-design/icons"
import { Avatar, Button, Col, Input, InputNumber, Rate, Row } from "antd"
import "./productdetail.style.scss"
import "../style-commond/commond.style.scss"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ProductMain from "./product-main/productmain.component"
import ShopInfo from "./shop-info/shopinfo.component"
import ProductDesc from "./product-desc/productdesc.component"
import ProductAttribute from "./product-attribute/productattribute.component"
import ProductRate from "./product-rate/productrate.component"

const attributeDemo = {
    Category: "Áo thun",
    Color: "Đen",
    Weight: "250gsm",
    Height: '75cm',
    Quantity: 90
}

const ProductDetail = () => {
    const [showChatBox, setShowChatBox] = useState<boolean>(false)
    const nav = useNavigate()
    const handleOnChangeRate = (values: number) => {
        console.log(values)
    }
    const handleChangeShowChatBox = () => {
        setShowChatBox(true)
        console.log(showChatBox)
    }
    const handleChangeHideChatBox = () => {
        setShowChatBox(false)
    }
    return (
        <div className="product-detail-father">
            <ProductMain img="https://cf.shopee.vn/file/189172eea31b4fa7a18dd7a17e0813e1" 
            desc="Gấu bông heo nhiều kích cỡ, giá cực tốt, nhanh tay mua ngay đi nào !" 
            rateCount={329}
            saleCount={1208}
            size={["S", "M", "L", "XL"]}
            price={299000}
            />

            {/* Shop Information */}
            <ShopInfo handleShowChatBox={handleChangeShowChatBox} />
            
            <ProductAttribute attributes={attributeDemo} />

            <ProductDesc />

            <ProductRate />
            {/* chat box */}
            {
                showChatBox === true ?
                    <div className="message">
                        <Row className="mgt-10">
                            <Col span={22}>
                            <h4 className="mgl-40">Hades studio</h4>
                            </Col>
                            <Col span={2}>
                                <CloseOutlined style={{color: 'red', fontWeight: 'bold'}} className="cs-pointer" onClick={handleChangeHideChatBox} />
                            </Col>
                        </Row>
                        <div className="message-content">

                        </div>
                        <Row className="message-input">
                            <Col span={17}>
                                <Input type="text" />
                            </Col>
                            <Col span={1}>
                            </Col>
                            <Col span={3}>
                                <Button className="btn-color" style={{ color: 'white' }} icon={<SendOutlined />}>Send</Button>
                            </Col>
                        </Row>
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default ProductDetail
