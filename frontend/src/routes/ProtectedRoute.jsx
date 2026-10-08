import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { ROUTES } from "@/constants/routes";
import { selectAuthState } from "@/store/slices/authSlice";

function ProtectedRoute() {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useSelector(selectAuthState);

  if (isLoading) {
    return (
      <div className="p-8">
        <LoadingSpinner label="Checking your session" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
