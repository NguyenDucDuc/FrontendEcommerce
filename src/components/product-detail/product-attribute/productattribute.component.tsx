import "./productattribute.style.scss"
import "../../style-commond/commond.style.scss"
import { Col, Row } from "antd"


interface IProps {
    attributes: any
}

const ProductAttribute: React.FC<IProps> = ({ attributes }) => {
    return (
        <div className="product-attribute">
            <h2 className="title">Chi tiết sản phẩm</h2>
            <hr></hr>
            <div className="product-attribute-info">
                {Object.keys(attributes).map((item) => <Row>
                    <Col span={3}><p style={{fontWeight: 'bold'}}>{item}</p></Col>
                    <Col span={20}><p style={{color:'red'}}>{attributes[item]}</p></Col>
                </Row>)}


            </div>
        </div>
    )
}

export default ProductAttribute