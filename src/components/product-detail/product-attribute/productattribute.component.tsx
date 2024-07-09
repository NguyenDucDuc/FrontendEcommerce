import "./productattribute.style.scss";
import "../../style-commond/commond.style.scss";
import { Col, Row } from "antd";
import { Attribute } from "../../../models/models";

interface IProps {
  attributes: Array<Attribute>;
}

const ProductAttribute: React.FC<IProps> = ({ attributes }) => {
  console.log({ attributes });

  return (
    <div className="product-attribute">
      <h2 className="title">Chi tiết sản phẩm</h2>
      <hr></hr>
      <div className="product-attribute-info">
        {attributes !== undefined
          ? attributes.map((item: Attribute) => (
              <Row key={item.id}>
                <Col span={4}>
                  <p
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    {item.name}:
                  </p>
                </Col>
                <Col span={20}>
                  <p style={{ color: "black" }}>{item.value}</p>
                </Col>
              </Row>
            ))
          : null}
      </div>
    </div>
  );
};

export default ProductAttribute;
