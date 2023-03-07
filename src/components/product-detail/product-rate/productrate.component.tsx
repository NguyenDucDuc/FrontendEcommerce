import { Col, Rate, Row } from "antd"
import CardRate from "./card-rate/cardrate.component"
import "./productrate.style.scss"
import TotalRate from "./total-rate/total-rate.component"


const ProductRate = () => {
    return (
        <div className="product-rate" >
            <h2 className="mgl-25" style={{ paddingTop: '40px' }}>Đánh giá sản phẩm</h2>
            <hr></hr>
            <TotalRate />
            <div className="user-rate">
                {/* Comment */}
                <CardRate />
                <CardRate />
                <CardRate />
            </div>
        </div>
    )
}

export default ProductRate

