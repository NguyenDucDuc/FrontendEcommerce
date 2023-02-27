import { Col, Row } from "antd"
import CardProduct from "../card-product/card.component"
import "./productsales.style.scss"


const ProductSales = () => {
    const arr = [1,2,3,4]
    return (
        <div className="products-sale">
            <Row>
                {arr.map(item => <Col span={6}>
                    <CardProduct />
                </Col>)
                }
                {arr.map(item => <Col span={6}>
                    <CardProduct />
                </Col>)
                }
            </Row>
        </div>
    )
}

export default ProductSales