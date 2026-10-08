import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "@/constants/routes";
import { selectCurrentUser } from "@/store/slices/authSlice";

function PublicRoute() {
  const user = useSelector(selectCurrentUser);

  return user ? <Navigate replace to={ROUTES.DASHBOARD} /> : <Outlet />;
}

export default PublicRoute;
