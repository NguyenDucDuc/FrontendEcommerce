import { Link, useNavigate } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons';
import '../style-commond/commond.style.scss';
import './card.style.scss';

const CardProduct = () => {
  const nav = useNavigate();
  const handleGoToProductDetail = () => {
    nav('/product-detail');
  };
  return (
    <>
      <div className="home-product-item">
        <div className="home-product-item__img">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/de5pwc5fq/image/upload/v1666977594/Ecommerce/cdhqeuem1ol7vzhs60qo.png"
              alt="Ảnh sản phẩm"
            />
          </Link>
        </div>
        <h4 className="home-product-item__name">
          13 Nguyên Tắc Nghĩ Giàu Làm Giàu - Think And Grow Rich (Tái Bản 2019)
        </h4>
        <div className="home-product-item__price">
          <span className="home-product-item__price-old">26.000.000đ</span>
          <span className="home-product-item__price-current">24.999.000đ</span>
        </div>
        <div className="home-product-item__action">
          <span className="point">4.8</span>
          <span className="home-product-item__rating">
            <StarFilled color="yellow" />
          </span>
          <span className="line-bulkhead"></span>
          <span className="home-product-item__sold">Đã bán 1000</span>
        </div>
        <div className="home-product-item__origin">
          <span className="home-product-item__brand">HanoiComputer</span>
          <span className="home-product-item__origin-name">Acer</span>
        </div>
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
