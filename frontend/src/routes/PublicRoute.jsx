import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { ROUTES } from "@/constants/routes";
import { selectAuthState } from "@/store/slices/authSlice";

function PublicRoute() {
  const { isAuthenticated, isLoading } = useSelector(selectAuthState);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner label="Checking your session" />
      </div>
    );
  }

  return isAuthenticated ? <Navigate replace to={ROUTES.DASHBOARD} /> : <Outlet />;
}

export default PublicRoute;
