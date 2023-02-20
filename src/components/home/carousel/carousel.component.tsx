import { Carousel } from 'antd'
import "./carousel.style.scss"

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '350px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

const HomeCarousel: React.FC = () => {
    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
      };
    return (
        <div className='home-carousel'>
            <Carousel autoplay autoplaySpeed={2400}>
                <div className='carousel-slide'>
                    <img src='./images/carousel1.jpeg' />
                </div>
                <div className='carousel-slide'>
                    <img src='./images/carousel2.webp' />
                </div>
                <div className='carousel-slide'>
                    <img src='./images/carousel3.jpeg' />
                </div>
            </Carousel>
        </div>
    )
}

export default HomeCarousel