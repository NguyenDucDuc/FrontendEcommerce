import CartItem from "./cart-item/cartitem.component"
import "./cart.style.scss"


const Cart = () => {
    return (
        <div className="cart">
            <CartItem id={1} image="https://cf.shopee.vn/file/sg-11134201-22120-60igl1u0z8kv26" price={350000} desc="Áo varsity thánh giá nam cực khét. Giá chỉ bằng 2 cốc trà sữa." />
            <CartItem id={1} image="https://cf.shopee.vn/file/sg-11134201-22120-60igl1u0z8kv26" price={150000} desc="Áo varsity thánh giá nam cực khét. Giá chỉ bằng 2 cốc trà sữa." />
            <CartItem id={1} image="https://cf.shopee.vn/file/sg-11134201-22120-60igl1u0z8kv26" price={650000} desc="Áo varsity thánh giá nam cực khét. Giá chỉ bằng 2 cốc trà sữa." />
            <CartItem id={1} image="https://cf.shopee.vn/file/sg-11134201-22120-60igl1u0z8kv26" price={250000} desc="Áo varsity thánh giá nam cực khét. Giá chỉ bằng 2 cốc trà sữa." />
        </div>
    )
}

export default Cart