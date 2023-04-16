import { Link } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import "../style-commond/commond.style.scss";
import "./card.style.scss";
import { Product } from "../../models/models";
import { formatCurrency } from "../../utils/common";

interface Props {
  product?: Product;
}

const CardProduct: React.FC<Props> = ({ product }) => {
  return (
    <>
      <div className="home-product-item">
        <div className="home-product-item__img">
          <Link
            className="home-product-item__link"
            to={`/product-detail/${product?.id}`}
          >
            <img src={product?.image} alt="Ảnh sản phẩm" />
          </Link>
        </div>
        <h4 className="home-product-item__name">{product?.name}</h4>
        <div className="home-product-item__price">
          <span className="home-product-item__price-old">
            {formatCurrency(product?.price as number)}
          </span>
          <span className="home-product-item__price-current">
            {formatCurrency(product?.price as number)}
          </span>
        </div>
        <div className="home-product-item__action">
          <span className="point">{product?.rate}</span>
          <span className="home-product-item__rating">
            <StarFilled color="yellow" />
          </span>
          <span className="line-bulkhead"></span>
          <span className="home-product-item__sold">{`Đã bán ${product?.unitOnOrder}`}</span>
        </div>
        {/* <div className="home-product-item__origin">
          <span className="home-product-item__brand">HanoiComputer</span>
          <span className="home-product-item__origin-name">Acer</span>
        </div> */}
        <div className="home-product-item__favourite">
          <i className="fa-solid fa-check"></i>
          <span>Yêu thích</span>
        </div>
        <div className="home-product-item__sale-off">
          <span className="home-product-item__sale-off-percent">10%</span>
          <span className="home-product-item__sale-off-label">GIẢM</span>
        </div>
      </div>
    </>
  );
};

export default CardProduct;
