import { Route, Routes } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import PlaceholderPage from "@/pages/PlaceholderPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />

        <Route element={<PublicRoute />}>
          <Route
            path={ROUTES.LOGIN}
            element={<PlaceholderPage description="Sign-in will be implemented in Phase 1." title="Sign in" />}
          />
          <Route
            path={ROUTES.REGISTER}
            element={<PlaceholderPage description="Registration will be implemented in Phase 1." title="Create an account" />}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path={ROUTES.DASHBOARD}
            element={<PlaceholderPage description="Product discovery will be implemented in a future phase." title="Dashboard" />}
          />
          <Route
            path={ROUTES.CART}
            element={<PlaceholderPage description="Cart management will be implemented in a future phase." title="Your cart" />}
          />
          <Route
            path={ROUTES.CHECKOUT}
            element={<PlaceholderPage description="Checkout will be implemented in a future phase." title="Checkout" />}
          />
          <Route
            path={ROUTES.ORDERS}
            element={<PlaceholderPage description="Order history will be implemented in a future phase." title="Orders" />}
          />
          <Route
            path={ROUTES.ORDER_DETAILS}
            element={<PlaceholderPage description="Order details will be implemented in a future phase." title="Order details" />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
