import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Container from "@/components/layout/Container";
import OrderDetails from "@/features/orders/components/OrderDetails";
import OrderErrorState from "@/features/orders/components/OrderErrorState";
import OrderSkeleton from "@/features/orders/components/OrderSkeleton";
import {
  fetchOrderById,
  selectOrdersState,
} from "@/features/orders/slices/orderSlice";

function OrderDetailsPage() {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const location = useLocation();
  const { currentOrder, isLoadingOrder, error } =
    useSelector(selectOrdersState);
  const orderMatchesRoute =
    currentOrder && String(currentOrder.id) === String(orderId);

  useEffect(() => {
    if (orderId) dispatch(fetchOrderById(orderId));
  }, [dispatch, orderId]);

  if (isLoadingOrder || (!orderMatchesRoute && !error)) {
    return (
      <Container className="py-8 sm:py-10 lg:py-12">
        <OrderSkeleton />
      </Container>
    );
  }

  if (error && !orderMatchesRoute) {
    return (
      <Container className="py-8 sm:py-10 lg:py-12">
        <OrderErrorState
          message={error}
          onRetry={() => dispatch(fetchOrderById(orderId))}
        />
      </Container>
    );
  }

  return (
    <>
      {error ? (
        <Container className="pt-6">
          <OrderErrorState
            message={error}
            onRetry={() => dispatch(fetchOrderById(orderId))}
          />
        </Container>
      ) : null}
      <OrderDetails
        isNewlyPlaced={Boolean(location.state?.orderJustPlaced)}
        order={currentOrder}
      />
    </>
  );
}

export default OrderDetailsPage;
