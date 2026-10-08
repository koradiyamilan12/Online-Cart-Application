import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { clearCart, fetchCart } from "@/features/cart/slices/cartSlice";
import AppRouter from "./routes/AppRouter";
import { bootstrapAuth, selectAuthState } from "./store/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useSelector(selectAuthState);

  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      dispatch(clearCart());
      return;
    }

    if (!isLoading && isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <LoadingSpinner label="Checking your session" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
