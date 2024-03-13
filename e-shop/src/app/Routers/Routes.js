import React from "react";
import { BrowserRouter, Routes as Router, Route } from "react-router-dom";
import CategoriesList from "../pages/CategoriesList.js";
import Items from "../pages/Items";
import Layout from "../layout/Layout.js";
import CartItems from "../pages/CartItems.js";
import ViewItem from "../pages/ViewItem.js";
import Orders from "../pages/Orders.js";

const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <Router>
          <Route path="/" element={<Layout />}>
            <Route index element={<CategoriesList />} />
            <Route path="/item" element={<Items />} />
            <Route path="/cart" element={<CartItems />} />
            <Route path="/viewItem" element={<ViewItem />} />
            <Route path="/order" element={<Orders />} />
          </Route>
        </Router>
      </BrowserRouter>
    </>
  );
};

export default Routes;
