import React, { useEffect } from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrders from "./features/user/components/UserOrders";

function App() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
    }
  }, [dispatch, user]);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/cart"
          element={
            <Protected>
              <CartPage />
            </Protected>
          }
        />
        <Route
          path="/checkout"
          element={
            <Protected>
              <Checkout />
            </Protected>
          }
        />
        <Route
          path="/product-detail/:id"
          element={
            <Protected>
              <ProductDetailPage />
            </Protected>
          }
        />
        <Route path="order-success/:id" element={<OrderSuccessPage />} />
        <Route path="orders" element={<UserOrders />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
