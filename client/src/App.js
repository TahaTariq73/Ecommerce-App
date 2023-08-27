import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/userAction";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

import Navbar from './components/layout/navbar/Navbar';
import Footer from './components/layout/footer/Footer';
import Alert from "./components/layout/alert/Alert";
import Home from "./components/home/Home";
import Product from './components/product/product/Product';
import Search from "./components/product/search/Search";
import Products from "./components/product/products/Products";
import LoginSignUp from './components/user/loginSignUp/LoginSignUp';
import Profile from "./components/user/profile/Profile";
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/updateProfile/UpdateProfile';
import UpdatePassword from './components/user/updatePassword/UpdatePassword';
import ForgotPassword from './components/user/forgotPassword/ForgotPassword';
import ResetPassword from './components/user/resetPassword/ResetPassword';
import CartItems from './components/cart/cartItems/CartItems';
import ShippingInfo from './components/cart/shippingInfo/ShippingInfo';
import ConfirmOrder from './components/cart/confirmOrder/ConfirmOrder';
import Payment from "./components/cart/payment/Payment";
import OrderSuccess from "./components/cart/orderSuccess/OrderSuccess";
import NotFound from "./components/layout/notFound/NotFound";
import MyOrders from './components/order/myOrders/MyOrders';
import OrderDetails from './components/order/orderDetails/OrderDetails';

// Admin Components

import { 
  DashboardPanel,
  CreateProductPanel,
  EditProductPanel,
  AdminProductsPanel,
  AdminUsersPanel,
  AdminReviewsPanel,
  AdminOrdersPanel,
  AdminProcessOrder
} from './components/admin/Admin';

function App() {
  const dispatch = useDispatch();

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey); 
    } catch (error) {
      console.log("Failed To Load Stripe Payment Key: Unauthorized");
    }
  }

  useEffect(() => {
    dispatch(loadUser());
    getStripeApiKey();
  }, [dispatch])

  return (
    <Fragment>
      <Navbar />
      <Alert />

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}> 
          <Routes>
            <Route exact path="/process/payment" element={
              <ProtectedRoute Component={Payment} />
            } />
          </Routes>
        </Elements>
      )}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<Product />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/cart" element={<CartItems />} />
        <Route exact path="/order/success" element={<OrderSuccess />} />

        <Route exact path="/account" element={
          <ProtectedRoute Component={Profile} />
        } />
        <Route exact path="/me/update" element={
          <ProtectedRoute Component={UpdateProfile} />
        } />
        <Route exact path="/password/update" element={
          <ProtectedRoute Component={UpdatePassword} />
        } />
        <Route exact path="/shipping" element={
          <ProtectedRoute Component={ShippingInfo} />
        } />
        <Route exact path="/order/confirm" element={
          <ProtectedRoute Component={ConfirmOrder} />
        } />
        <Route exact path="/orders" element={
          <ProtectedRoute Component={MyOrders} />
        } />
        <Route exact path="/orders/:id" element={
          <ProtectedRoute Component={OrderDetails} />
        } />

        <Route exact path="/admin/dashboard" element={
          <ProtectedRoute Component={DashboardPanel} isAdmin={true} />
        } />
        <Route exact path="/admin/products" element={
          <ProtectedRoute Component={AdminProductsPanel} isAdmin={true} />
        } />
        <Route exact path="/admin/product" element={
          <ProtectedRoute Component={CreateProductPanel} isAdmin={true} />
        } />
        <Route exact path="/admin/product/:id" element={
          <ProtectedRoute Component={EditProductPanel} isAdmin={true} />
        } />
        <Route exact path="/admin/users" element={
          <ProtectedRoute Component={AdminUsersPanel} isAdmin={true} />
        } />
        <Route exact path="/admin/reviews" element={
          <ProtectedRoute Component={AdminReviewsPanel} isAdmin={true} />
        } />
        <Route exact path="/admin/orders" element={
          <ProtectedRoute Component={AdminOrdersPanel} isAdmin={true} />
        } />
        <Route exact path="/admin/order/:id" element={
          <ProtectedRoute Component={AdminProcessOrder} isAdmin={true} />
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Fragment>
  )
}

export default App;