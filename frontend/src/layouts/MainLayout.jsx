import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

function MainLayout() {
  const location = useLocation();
  const pageName =
    location.pathname === ROUTES.HOME
      ? "Home"
      : location.pathname === ROUTES.LOGIN
        ? "Sign in"
        : location.pathname === ROUTES.REGISTER
          ? "Create account"
          : location.pathname === ROUTES.DASHBOARD
            ? "Products"
            : location.pathname === ROUTES.CART
              ? "Cart"
              : location.pathname === ROUTES.CHECKOUT
                ? "Checkout"
                : location.pathname === ROUTES.ORDERS
                  ? "Orders"
                  : location.pathname.startsWith(`${ROUTES.ORDERS}/`)
                    ? "Order details"
                    : "Page not found";

  useEffect(() => {
    document.title = `Cartly — ${pageName}`;
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, [location.pathname, pageName]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main
        className="flex-1"
        id="main-content"
        key={location.pathname}
        tabIndex={-1}
      >
        <div className="page-enter min-h-full">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
