import React from "react";

import "./shop.style.scss";
import { Outlet } from "react-router-dom";

const Shop = () => {
  return (
    <section className="shop__manage--container">
      <Outlet />
    </section>
  );
};

export default Shop;
