import { FiLogOut, FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { APP_NAME } from "@/constants/app";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { logoutUser, selectAuthState } from "@/store/slices/authSlice";
import Container from "./Container";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(selectAuthState);

  const handleLogout = async () => {
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
