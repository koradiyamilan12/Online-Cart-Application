import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowLeft, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "@/components/common/ErrorMessage";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import CartEmptyState from "@/features/cart/components/CartEmptyState";
import { clearCart, fetchCart, selectCartState } from "@/features/cart/slices/cartSlice";
import CheckoutItem from "@/features/orders/components/CheckoutItem";
import CheckoutSummary from "@/features/orders/components/CheckoutSummary";
import { createOrder, selectOrdersState } from "@/features/orders/slices/orderSlice";

function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, grandTotal, totalItems, isLoading, error } = useSelector(selectCartState);
  const { isSubmitting, error: orderError } = useSelector(selectOrdersState);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handlePlaceOrder = async () => {
    const result = await dispatch(createOrder());

    if (createOrder.fulfilled.match(result)) {
      dispatch(clearCart());
      navigate(`${ROUTES.ORDERS}/${result.payload?.id}`);
    }
  };

  if (isLoading) {
    return (
      <Container className="py-8 sm:py-10 lg:py-12">
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-slate-500 shadow-sm">Loading checkout…</div>
      </Container>
    );
  }

  if (error && !items.length) {
    return (
      <Container className="py-8 sm:py-10 lg:py-12">
        <div className="space-y-4">
          <ErrorMessage message={error} />
          <Button onClick={() => dispatch(fetchCart())} type="button" variant="outline">
            Try again
          </Button>
        </div>
      </Container>
    );
  }

  if (!items.length) {
    return (
      <Container className="py-8 sm:py-10 lg:py-12">
        <CartEmptyState />
      </Container>
    );
  }

  return (
    <Container className="py-8 sm:py-10 lg:py-12">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-indigo-100 text-indigo-700">
            <FiShoppingCart aria-hidden="true" className="size-4" />
          </span>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-600">Checkout</p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Review your order</h1>
          </div>
        </div>

        <Button className="gap-2" onClick={() => navigate(ROUTES.CART)} type="button" variant="ghost">
          <FiArrowLeft aria-hidden="true" className="size-4" />
          Back to cart
        </Button>
      </div>

      {(error || orderError) ? (
        <div className="mb-4">
          <ErrorMessage message={orderError || error} />
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-600">Cart items</p>
            <p className="text-sm text-slate-600">{totalItems} item{totalItems === 1 ? "" : "s"}</p>
          </div>

          <div className="space-y-0">
            {items.map((item) => (
              <CheckoutItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        <CheckoutSummary grandTotal={grandTotal} isSubmitting={isSubmitting} itemCount={totalItems} onPlaceOrder={handlePlaceOrder} />
      </div>
    </Container>
  );
}

export default CheckoutPage;
