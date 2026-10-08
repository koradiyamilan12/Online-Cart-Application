import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { ROUTES } from "@/constants/routes";
import { selectAuthenticationStatus, selectCurrentUser } from "@/store/slices/authSlice";

function ProtectedRoute() {
  const location = useLocation();
  const user = useSelector(selectCurrentUser);
  const authStatus = useSelector(selectAuthenticationStatus);

  if (authStatus === "checking") {
    return (
      <div className="p-8">
        <LoadingSpinner label="Checking your session" />
      </div>
    );
  }

  if (!user) {
    return <Navigate replace state={{ from: location }} to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
