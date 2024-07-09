import { Link, useLocation } from 'react-router-dom';
import { PlusCircleOutlined, StarFilled } from '@ant-design/icons';
import '../style-commond/commond.style.scss';
import './card.style.scss';
import { Product } from '../../models/models';
import { formatCurrency } from '../../utils/common';
import { Button } from 'antd';
import { useAppDispatch } from '../../store/store';
import { addProduct } from '../../store/slices/product-compare.slice';

interface Props {
  product?: Product;
}

const CardProduct: React.FC<Props> = ({ product }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

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
            {product?.priceDiscount !== undefined
              ? formatCurrency(product?.price as number)
              : ''}
            {/* {formatCurrency(product?.price as number)} */}
          </span>
          <span className="home-product-item__price-current">
            {product?.priceDiscount === undefined
              ? formatCurrency(product?.price as number)
              : formatCurrency(product?.priceDiscount as number)}
            {/* {formatCurrency(product?.priceDiscount as number)} */}
          </span>
        </div>
        <div className="home-product-item__action">
          <span className="point">{product?.rate}</span>
          <span className="home-product-item__rating">
            <StarFilled color="yellow" />
          </span>
          <span className="line-bulkhead"></span>
          <span className="home-product-item__sold">{`Đã bán ${product?.unitOnOrder}`}</span>
          {location.pathname.includes('categories') && (
            <span style={{ marginLeft: 10 }}>
              <Button
                style={{
                  padding: '2px 4px',
                  fontSize: 12,
                  borderColor: 'transparent',
                }}
                onClick={() => {
                  dispatch(addProduct(product as Product));
                }}
              >
                <PlusCircleOutlined />
                So sánh
              </Button>
            </span>
          )}
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
          <span className="home-product-item__sale-off-percent">
            {product?.promotion ? `${product?.promotion.value * 100}%` : '0%'}
          </span>
          <span className="home-product-item__sale-off-label">GIẢM</span>
        </div>
      </div>
    </>
  );
};

export default CardProduct;
