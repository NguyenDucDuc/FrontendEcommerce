import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login.component";
import Header from "./components/header/header.component";
import ReactGa from "react-ga";
import Register from "./components/register/register.component";
import ShopCreate from "./components/shop/createshop.component";
import Home from "./pages/home/home.component";
import Admin from "./components/admin/admin.component";
import AdminSeller from "./components/admin/seller.component";
import AdminShop from "./components/admin/shop/shop.component";
import HomeAdmin from "./components/admin/home/home.component";
import MainLayout from "./components/layout/main.layout";
import ProductDetail from "./components/product-detail/productdetail.component";
import ProductSales from "./components/products-sales/productsales.component";
import ShopProfile from "./components/shop-profile/shopprofile.component";
import Cart from "./components/cart/cart.component";
import Notification from "./components/notification/notification.component";

import "./components/style-commond/commond.style.scss";

import UserProfile from './components/user-profile/userprofile.component';
import Profile from './components/user-profile/profile/profile.component';
import Address from './components/user-profile/address/address.component';
import { io } from 'socket.io-client';
import RegisterSeller from './components/register-seller/register-seller.component';
import Checkout from './components/checkout/checkout.component';
import LoginAdmin from './components/admin/login/login-admin.component';
import Forbidden from './components/admin/forbidden/forbidden.component';
import AddProduct from "./components/add-product/AddProduct";


export const socket = io("http://localhost:5000");

function App() {
  useEffect(() => {
    socket.emit("test", "kk");
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/product-detail/:productId"
              element={<ProductDetail />}
            />
            <Route path="/shop-create" element={<ShopCreate />} />
            <Route path="/products" element={<ProductSales />} />
            <Route path="/shop-profile" element={<ShopProfile />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/user" element={<UserProfile />}>
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/user/address" element={<Address />} />
            </Route>
            <Route path="/register-seller" element={<RegisterSeller />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
        {/* Route Admin */}
        <Routes>
          <Route path="/admin" element={<Admin />}>
            <Route path='/admin/login' element={<LoginAdmin />} />
            <Route path="/admin/home" element={<HomeAdmin />} />
            <Route path="/admin/sellers" element={<AdminSeller />} />
            <Route path="/admin/shops" element={<AdminShop />} />
            <Route path='/admin/forbidden' element={<Forbidden />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
