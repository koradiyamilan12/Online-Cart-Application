import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import OrderEmptyState from "@/features/orders/components/OrderEmptyState";
import OrderErrorState from "@/features/orders/components/OrderErrorState";
import OrderList from "@/features/orders/components/OrderList";
import OrderSkeleton from "@/features/orders/components/OrderSkeleton";
import {
  fetchOrders,
  selectOrdersState,
} from "@/features/orders/slices/orderSlice";

function OrdersPage() {
  const dispatch = useDispatch();
  const { orders, isLoadingOrders, error } = useSelector(selectOrdersState);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const heading = (
    <PageHeader
      action={
        orders.length ? (
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600">
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </span>
        ) : null
      }
      description="A clear record of the things you’ve ordered."
      eyebrow="Your account"
      title="Order history"
    />
  );

  if (isLoadingOrders && !orders.length) {
    return (
      <Container className="py-8 sm:py-10 lg:py-12">
        {heading}
        <OrderSkeleton />
      </Container>
    );
  }

  if (error && !orders.length) {
    return (
      <Container className="py-8 sm:py-10 lg:py-12">
        {heading}
        <OrderErrorState
          message={error}
          onRetry={() => dispatch(fetchOrders())}
        />
      </Container>
    );
  }

  if (!orders.length) {
    return (
      <Container className="py-8 sm:py-10 lg:py-12">
        {heading}
        <OrderEmptyState onRefresh={() => dispatch(fetchOrders())} />
      </Container>
    );
  }

  return (
    <Container className="py-8 sm:py-10 lg:py-12">
      {heading}
      {error ? (
        <div className="mb-5">
          <OrderErrorState
            message={error}
            onRetry={() => dispatch(fetchOrders())}
          />
        </div>
      ) : null}
      <OrderList orders={orders} />
    </Container>
  );
}

export default OrdersPage;
