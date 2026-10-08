import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import AppRouter from "./routes/AppRouter";
import { bootstrapAuth, selectAuthState } from "./store/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectAuthState);

  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);

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
