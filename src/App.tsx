import React, { useEffect } from 'react';
import "./App.scss"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/login/login.component';
import Header from './components/header/header.component'
import ReactGa from 'react-ga'
import Register from './components/register/register.component';
import ShopCreate from './components/shop/createshop.component';
import Home from './components/home/home.component';
import Admin from './components/admin/admin.component';
import AdminSeller from './components/admin/seller.component';
import AdminShop from './components/admin/shop/shop.component';
import HomeAdmin from './components/admin/home/home.component';
import MainLayout from './components/layout/main.layout';
import ProductDetail from './components/product-detail/productdetail.component';
import ProductSales from './components/products-sales/productsales.component';


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/product-detail' element={<ProductDetail />} />
            <Route path='/shop-create' element={<ShopCreate />} />
            <Route path='/products' element={<ProductSales />} />
          </Route>
        </Routes>
        {/* Route Admin */}
        <Routes>
          <Route path='/admin' element={<Admin />}>
            <Route path='/admin/home' element={<HomeAdmin />} />
            <Route path='/admin/sellers' element={<AdminSeller />} />
            <Route path='/admin/shops' element={<AdminShop />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
