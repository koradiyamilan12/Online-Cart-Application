import { Route, Routes } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import CartPage from "@/features/cart/pages/CartPage";
import CheckoutPage from "@/features/orders/pages/CheckoutPage";
import OrderDetailsPage from "@/features/orders/pages/OrderDetailsPage";
import OrdersPage from "@/features/orders/pages/OrdersPage";
import ProductsPage from "@/features/products/pages/ProductsPage";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />

        <Route element={<PublicRoute />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.DASHBOARD} element={<ProductsPage />} />
          <Route path={ROUTES.CART} element={<CartPage />} />
          <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
          <Route path={ROUTES.ORDERS} element={<OrdersPage />} />
          <Route path={ROUTES.ORDER_DETAILS} element={<OrderDetailsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
