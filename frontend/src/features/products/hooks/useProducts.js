import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectProductsState } from "@/store/slices/productSlice";

function useProducts() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(selectProductsState);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return {
    products: items,
    isLoading: status === "loading",
    isSuccess: status === "succeeded",
    error,
    refetch: () => dispatch(fetchProducts()),
  };
}

export default useProducts;
