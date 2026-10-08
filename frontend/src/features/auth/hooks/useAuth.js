import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { bootstrapAuth, logoutUser, selectAuthState } from "@/store/slices/authSlice";

function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(selectAuthState);

  const checkAuth = () => {
    dispatch(bootstrapAuth());
  };

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      navigate(ROUTES.HOME, { replace: true });
    }
  };

  return {
    ...auth,
    checkAuth,
    handleLogout,
  };
}

export default useAuth;
