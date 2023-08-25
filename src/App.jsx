import { useEffect } from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAuthAsync,
  selectLoggedInUser,
  selectUserChecked,
} from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserInfoAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import StripeCheckout from "./pages/StripeCheckout";

function App() {
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchLoggedInUserInfoAsync());
    }
  }, [dispatch, user]);

  return (
    <>
      {userChecked && (
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <Home />
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
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
            path="/admin"
            element={
              <ProtectedAdmin>
                <AdminHome />
              </ProtectedAdmin>
            }
          />

          <Route
            path="/admin/product-detail/:id"
            element={<AdminProductDetailPage />}
          />
          <Route
            path="/admin/product-form"
            element={
              <ProtectedAdmin>
                <AdminProductFormPage />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/product-form/edit/:id"
            element={
              <ProtectedAdmin>
                <AdminProductFormPage />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedAdmin>
                <AdminOrdersPage />
              </ProtectedAdmin>
            }
          />
          <Route path="order-success/:id" element={<OrderSuccessPage />} />
          <Route path="/orders" element={<UserOrdersPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route
            path="/stripe-checkout/"
            element={
              <Protected>
                <StripeCheckout />
              </Protected>
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </>
  );
}

export default App;
