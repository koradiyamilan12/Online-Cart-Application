import { FiLogOut, FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { APP_NAME } from "@/constants/app";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { clearCart, selectCartState } from "@/features/cart/slices/cartSlice";
import { logoutUser, selectAuthState } from "@/store/slices/authSlice";
import Container from "./Container";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(selectAuthState);
  const { totalItems } = useSelector(selectCartState);

  const handleLogout = async () => {
    dispatch(clearCart());
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      navigate(ROUTES.HOME, { replace: true });
    }
  };

  return (
    <header className="border-b bg-white">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link className="flex items-center gap-2 font-semibold text-slate-900" to={ROUTES.HOME}>
          <span className="grid size-8 place-items-center rounded-md bg-indigo-600 text-white">
            <FiShoppingCart aria-hidden="true" className="size-4" />
          </span>
          <span>{APP_NAME}</span>
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Link className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900" to={ROUTES.CART}>
              <FiShoppingCart aria-hidden="true" className="size-4" />
              <span>Cart</span>
              {totalItems > 0 ? (
                <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {totalItems}
                </span>
              ) : null}
            </Link>
            <Link className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900" to={ROUTES.ORDERS}>
              Orders
            </Link>
            <Link className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900" to={ROUTES.DASHBOARD}>
              Dashboard
            </Link>
            <span className="hidden text-sm font-medium text-slate-600 sm:inline">Hi, {user?.name?.split(" ")[0] || "there"}</span>
            <Button className="gap-2" onClick={handleLogout} type="button" variant="outline">
              <FiLogOut aria-hidden="true" className="size-4" />
              Sign out
            </Button>
          </div>
        ) : (
          <Link className={cn(buttonVariants({ variant: "outline", size: "sm" }))} to={ROUTES.LOGIN}>
            Sign in
          </Link>
        )}
      </Container>
    </header>
  );
}

export default Header;
