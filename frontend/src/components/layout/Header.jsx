import { useEffect, useRef, useState } from "react";
import {
  FiLogOut,
  FiMenu,
  FiPackage,
  FiShoppingBag,
  FiShoppingCart,
  FiX,
} from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { APP_NAME } from "@/constants/app";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { selectCartItemCount } from "@/features/cart/slices/cartSlice";
import { logoutUser, selectAuthState } from "@/store/slices/authSlice";
import Container from "./Container";

const navLinkClass = ({ isActive }) =>
  cn(
    "inline-flex min-h-11 items-center rounded-xl px-3.5 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-brand-50 text-brand-700"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
  );

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(selectAuthState);
  const totalItems = useSelector(selectCartItemCount);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const menuToggleRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const handleLogout = async () => {
    setIsSigningOut(true);
    setMenuOpen(false);
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      toast.success("You have been logged out.");
      navigate(ROUTES.HOME, { replace: true });
      return;
    }

    toast.error("Something went wrong. Please try again.");
    setIsSigningOut(false);
  };

  const firstName = user?.name?.trim().split(/\s+/)[0] || "there";
  const initials =
    user?.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";
  const cartLabel = `Shopping cart, ${totalItems} ${totalItems === 1 ? "item" : "items"}`;

  return (
    <>
      <a
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:not-sr-only focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-slate-900 focus:shadow-lg"
        href="#main-content"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <Container>
          <div className="flex h-[68px] items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-8">
              <Link
                className="flex shrink-0 items-center gap-2.5 rounded-lg text-slate-950"
                onClick={() => setMenuOpen(false)}
                to={ROUTES.HOME}
              >
                <span className="grid size-9 place-items-center rounded-xl bg-brand-600 text-white shadow-sm shadow-brand-600/20">
                  <FiShoppingBag aria-hidden="true" className="size-[18px]" />
                </span>
                <span className="text-[15px] font-semibold tracking-tight">
                  {APP_NAME}
                </span>
              </Link>

              {isAuthenticated ? (
                <nav
                  aria-label="Main navigation"
                  className="hidden items-center gap-1 lg:flex"
                >
                  <NavLink className={navLinkClass} end to={ROUTES.DASHBOARD}>
                    Shop
                  </NavLink>
                  <NavLink className={navLinkClass} to={ROUTES.ORDERS}>
                    Orders
                  </NavLink>
                </nav>
              ) : null}
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    aria-label={cartLabel}
                    className="relative inline-flex size-11 items-center justify-center rounded-xl text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950"
                    onClick={() => setMenuOpen(false)}
                    to={ROUTES.CART}
                  >
                    <FiShoppingCart
                      aria-hidden="true"
                      className="size-[18px]"
                    />
                    {totalItems > 0 ? (
                      <span
                        className="badge-pop absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-brand-600 px-1 text-[10px] font-bold leading-none text-white"
                        key={totalItems}
                      >
                        {totalItems}
                      </span>
                    ) : null}
                  </Link>

                  <div className="hidden items-center gap-2 border-l border-slate-200 pl-3 lg:flex">
                    <span
                      aria-hidden="true"
                      className="grid size-9 place-items-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700"
                    >
                      {initials}
                    </span>
                    <span className="max-w-28 truncate text-sm font-medium text-slate-700">
                      {firstName}
                    </span>
                  </div>

                  <Button
                    className="hidden gap-2 lg:inline-flex"
                    loading={isSigningOut}
                    loadingText="Signing out…"
                    onClick={handleLogout}
                    type="button"
                    variant="ghost"
                    size="sm"
                  >
                    <FiLogOut aria-hidden="true" className="size-4" />
                    Sign out
                  </Button>

                  <Button
                    aria-controls="mobile-navigation"
                    aria-expanded={menuOpen}
                    aria-label={
                      menuOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                    }
                    className="size-11 lg:hidden"
                    onClick={() => setMenuOpen((open) => !open)}
                    ref={menuToggleRef}
                    size="icon"
                    type="button"
                    variant="ghost"
                  >
                    {menuOpen ? (
                      <FiX aria-hidden="true" className="size-5" />
                    ) : (
                      <FiMenu aria-hidden="true" className="size-5" />
                    )}
                  </Button>
                </>
              ) : (
                <Link
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
                  to={ROUTES.LOGIN}
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>

          {isAuthenticated ? (
            <nav
              aria-hidden={!menuOpen}
              aria-label="Mobile navigation"
              className={cn(
                "overflow-hidden border-t border-slate-200 transition-[max-height,opacity,transform,padding] duration-200 ease-out lg:hidden",
                menuOpen
                  ? "max-h-96 motion-safe:translate-y-0 py-3 opacity-100"
                  : "pointer-events-none max-h-0 motion-safe:-translate-y-1 py-0 opacity-0",
              )}
              id="mobile-navigation"
              inert={!menuOpen}
            >
              <div className="flex items-center gap-3 px-2 pb-3">
                <span
                  aria-hidden="true"
                  className="grid size-10 place-items-center rounded-full bg-brand-50 text-sm font-semibold text-brand-700"
                >
                  {initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {user?.name || "Your account"}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {user?.email || "Signed in"}
                  </p>
                </div>
              </div>
              <div className="grid gap-1">
                <NavLink
                  className={navLinkClass}
                  end
                  onClick={() => setMenuOpen(false)}
                  to={ROUTES.DASHBOARD}
                >
                  <span className="inline-flex items-center gap-2">
                    <FiShoppingBag aria-hidden="true" className="size-4" /> Shop
                  </span>
                </NavLink>
                <NavLink
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                  to={ROUTES.ORDERS}
                >
                  <span className="inline-flex items-center gap-2">
                    <FiPackage aria-hidden="true" className="size-4" /> Orders
                  </span>
                </NavLink>
                <Button
                  className="justify-start"
                  loading={isSigningOut}
                  loadingText="Signing out…"
                  onClick={handleLogout}
                  type="button"
                  variant="ghost"
                >
                  <FiLogOut aria-hidden="true" className="size-4" />
                  Sign out
                </Button>
              </div>
            </nav>
          ) : null}
        </Container>
      </header>
    </>
  );
}

export default Header;
