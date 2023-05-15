import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login.component";
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

import UserProfile from "./components/user-profile/userprofile.component";
import Profile from "./components/user-profile/profile/profile.component";
import Address from "./components/user-profile/address/address.component";
import { io } from "socket.io-client";
import RegisterSeller from "./components/register-seller/register-seller.component";
import Checkout from "./components/checkout/checkout.component";
import LoginAdmin from "./components/admin/login/login-admin.component";
import Forbidden from "./components/admin/forbidden/forbidden.component";
import AddProduct from "./components/add-product/AddProduct";
import Shop from "./pages/shop/shop.component";
import DashBoardShop from "./pages/shop/manage/dashboard.component";
import MainDashBoard from "./pages/shop/manage/main.component";
import ProductManage from "./pages/shop/manage/product/product-manage.component";
import EditProduct from "./components/edit-product/EditProduct";
import OrderManage from "./pages/shop/manage/order/order-manage.component";
import { Chat } from "./components/chat/chat.component";
import OrderUser from "./components/user-profile/manage-order/order-user";
import { Promotion } from "./components/promotion/promotion.component";
import { PromotionManager } from "./components/promotion/promotion-manager/promotion-manager";
import { PromotionCreate } from "./components/promotion/promotion-create/promotion-create.component";
import Main from "./pages/main/main";
import { HomeAdminV2 } from "./components/admin/home/home-v2/home-admin-v2.component";
import AdminCustomer from "./components/admin/seller.component";
import SellerAdmin from "./components/admin/seller.component";
import Stats from "./components/stats/stats.component";
import StatsAdmin from "./components/stats-admin/stats-admin.component";
import { ForbiddenV2 } from "./components/shop/forbidden.component";
import { ConfirmSeller } from "./components/admin/confirm/confirm-seller.component";
import ProductCompare from "./components/compare-product/product-compare.component";

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
            <Route path="/chat" element={<Chat />} />
            <Route index element={<Home />} />
            <Route path="/categories/:cateId" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/product-detail/:productId"
              element={<ProductDetail />}
            />
            <Route path="/compare-product" element={<ProductCompare/>}/>
            <Route path="/shop-create" element={<ShopCreate />} />
            <Route path="/products" element={<ProductSales />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/user" element={<UserProfile />}>
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/user/address" element={<Address />} />
              <Route path="orders" element={<OrderUser />} />
            </Route>
            <Route path="/register-seller" element={<RegisterSeller />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/shop-forbidden" element={<ForbiddenV2 />} />
            {/* Route Shop */}
            <Route path="/shop/:shopId" element={<Shop />}>
              <Route index element={<ShopProfile />} />
              <Route path="dashboard" element={<DashBoardShop />}>
                <Route index element={<MainDashBoard />} />
                <Route path="add-product" element={<AddProduct />} />
                <Route path="products" element={<ProductManage />}></Route>
                <Route
                  path="products/:productId/edit"
                  element={<EditProduct />}
                />
                <Route path="orders" element={<OrderManage />}></Route>
                <Route
                  path="promotion-manager"
                  element={<PromotionManager />}
                ></Route>
                <Route
                  path="promotion-create"
                  element={<PromotionCreate />}
                ></Route>
                <Route path="stats" element={<Stats />}></Route>
              </Route>

              {/* <Route index element={<ProductShop />} />
            <Route path="manage" element={<ManageShop />}>
              <Route index element={<DashboardShop />} />
              <Route path="products" element={<ManageProduct />} />
              <Route path="confirm" element={<ConfirmOrder />} />
              <Route path="stats-by-product" element={<Stats />} />
              <Route path="stats-by-cate" element={<StatsByCate />} /> */}
            </Route>

            {/* <Route path="/promotion/:shopId" element={<Promotion />}>
              <Route path="/promotion/:shopId/manager" element={<PromotionManager />} />
              <Route path="/promotion/:shopId/create" element={<PromotionCreate />} />
            </Route> */}
          </Route>
        </Routes>

        {/* Route Admin */}
        <Routes>
          <Route path="/admin" element={<Admin />}>
            <Route path="/admin/login" element={<LoginAdmin />} />
            <Route path="/admin/home" element={<HomeAdminV2 />} />
            <Route path="/admin/sellers" element={<SellerAdmin />} />
            <Route path="/admin/shops" element={<AdminShop />} />
            <Route path="/admin/forbidden" element={<Forbidden />} />
            <Route path="/admin/stats" element={<StatsAdmin />} />
            <Route path="/admin/confirm-seller" element={<ConfirmSeller />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
