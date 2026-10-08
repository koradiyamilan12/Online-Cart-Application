import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, fetchOrderById, fetchOrders, selectOrdersState } from "@/features/orders/slices/orderSlice";

function useOrders() {
  const dispatch = useDispatch();
  const orderState = useSelector(selectOrdersState);

  const loadOrders = useCallback(() => dispatch(fetchOrders()), [dispatch]);
  const loadOrder = useCallback((orderId) => dispatch(fetchOrderById(orderId)), [dispatch]);
  const submitOrder = useCallback(() => dispatch(createOrder()), [dispatch]);

  return {
    ...orderState,
    loadOrders,
    loadOrder,
    submitOrder,
  };
}

export default useOrders;
