import { createElement, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PageSkeleton from "@/components/common/PageSkeleton";
import { ROUTES } from "@/constants/routes";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const HomePage = lazy(() => import("@/pages/HomePage"));
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/RegisterPage"));
const CartPage = lazy(() => import("@/features/cart/pages/CartPage"));
const CheckoutPage = lazy(() => import("@/features/orders/pages/CheckoutPage"));
const OrderDetailsPage = lazy(
  () => import("@/features/orders/pages/OrderDetailsPage"),
);
const OrdersPage = lazy(() => import("@/features/orders/pages/OrdersPage"));
const ProductsPage = lazy(
  () => import("@/features/products/pages/ProductsPage"),
);
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function renderPage(Page) {
  return <Suspense fallback={<PageSkeleton />}>{createElement(Page)}</Suspense>;
}

function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={renderPage(HomePage)} path={ROUTES.HOME} />

        <Route element={<PublicRoute />}>
          <Route element={renderPage(LoginPage)} path={ROUTES.LOGIN} />
          <Route element={renderPage(RegisterPage)} path={ROUTES.REGISTER} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={renderPage(ProductsPage)} path={ROUTES.DASHBOARD} />
          <Route element={renderPage(CartPage)} path={ROUTES.CART} />
          <Route element={renderPage(CheckoutPage)} path={ROUTES.CHECKOUT} />
          <Route element={renderPage(OrdersPage)} path={ROUTES.ORDERS} />
          <Route
            element={renderPage(OrderDetailsPage)}
            path={ROUTES.ORDER_DETAILS}
          />
        </Route>

        <Route element={renderPage(NotFoundPage)} path="*" />
      </Route>
    </Routes>
  );
}

export default AppRouter;
