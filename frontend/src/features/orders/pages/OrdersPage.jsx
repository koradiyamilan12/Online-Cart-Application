import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@/components/layout/Container";
import OrderEmptyState from "@/features/orders/components/OrderEmptyState";
import OrderErrorState from "@/features/orders/components/OrderErrorState";
import OrderList from "@/features/orders/components/OrderList";
import OrderSkeleton from "@/features/orders/components/OrderSkeleton";
import { fetchOrders, selectOrdersState } from "@/features/orders/slices/orderSlice";

function OrdersPage() {
  const dispatch = useDispatch();
  const { orders, isLoadingOrders, error } = useSelector(selectOrdersState);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (isLoadingOrders && !orders.length) {
    return (
      <Container className="py-8 sm:py-10 lg:py-12">
        <OrderSkeleton />
      </Container>
    );
  }

  if (error && !orders.length) {
    return (
      <Container className="py-8 sm:py-10 lg:py-12">
        <OrderErrorState message={error} onRetry={() => dispatch(fetchOrders())} />
      </Container>
    );
  }

  if (!orders.length) {
    return (
      <Container className="py-8 sm:py-10 lg:py-12">
        <OrderEmptyState onRefresh={() => dispatch(fetchOrders())} />
      </Container>
    );
  }

  return (
    <Container className="py-8 sm:py-10 lg:py-12">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">My orders</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Order history</h1>
      </div>
      {error ? (
        <div className="mb-4">
          <OrderErrorState message={error} onRetry={() => dispatch(fetchOrders())} />
        </div>
      ) : null}
      <OrderList orders={orders} />
    </Container>
  );
}

export default OrdersPage;
