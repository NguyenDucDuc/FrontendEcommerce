import './home.style.scss';
import '../../components/style-commond/commond.style.scss';
import CategoryList from '../../components/category/category.component';
import FlashSale from '../../components/flash-sale/sale.component';
import { Link } from 'react-router-dom';
import BrandMall from '../../components/brand/BrandMall';
import Banner from '../../components/banner/Banner';
import TrendSearch from '../../components/trend-keyword/TrendSearch';
import ProductTab from '../../components/tab-product/ProductTab';

const Home: React.FC = () => {
  return (
    <main className="main">
      <Banner />
      <CategoryList />
      <FlashSale />
      <section className="section-simple banner-promotion">
        <img
          className="banner-image"
          alt="Ảnh của banner-promotion"
          src="https://cf.shopee.vn/file/sg-50009109-dad31cf036ecbffd5b0f1a143ba2d8ad"
        />

        <div className="click-sections-wrapper">
          <Link
            to={'https://shopee.vn/m/shopee-cashback'}
            className="click-section"
            target="_self"
          ></Link>
        </div>
      </section>
      <BrandMall />
      <TrendSearch />
      <ProductTab />
    </main>
  );
};

export default Home;
