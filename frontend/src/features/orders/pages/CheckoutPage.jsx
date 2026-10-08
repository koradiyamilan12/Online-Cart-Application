import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "@/components/common/ErrorMessage";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/button-variants";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import CartEmptyState from "@/features/cart/components/CartEmptyState";
import CartSkeleton from "@/features/cart/components/CartSkeleton";
import {
  clearCart,
  fetchCart,
  selectCartState,
} from "@/features/cart/slices/cartSlice";
import CheckoutItem from "@/features/orders/components/CheckoutItem";
import CheckoutSummary from "@/features/orders/components/CheckoutSummary";
import {
  createOrder,
  selectOrdersState,
} from "@/features/orders/slices/orderSlice";

function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, grandTotal, totalItems, isLoading, error } =
    useSelector(selectCartState);
  const { isSubmitting, error: orderError } = useSelector(selectOrdersState);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handlePlaceOrder = async () => {
    const result = await dispatch(createOrder());

    if (createOrder.fulfilled.match(result)) {
      toast.success("Order placed successfully!");
      dispatch(clearCart());
      navigate(`${ROUTES.ORDERS}/${result.payload?.id}`, {
        state: { orderJustPlaced: true },
      });
      return;
    }

    if (!result.meta.condition) {
      toast.error("Unable to place your order. Please try again.");
    }
  };

  const heading = (
    <PageHeader
      action={
        <Link
          className={cn(buttonVariants({ variant: "ghost" }), "gap-2")}
          to={ROUTES.CART}
        >
          <FiArrowLeft aria-hidden="true" className="size-4" /> Back to cart
        </Link>
      }
      description="Review your items and confirm your order."
      eyebrow="Almost there"
      title="Checkout"
    />
  );

  if (isLoading) {
    return (
      <Container className="py-8 sm:py-10 lg:py-12">
        {heading}
        <CartSkeleton />
      </Container>
    );
  }

  if (error && !items.length) {
    return (
      <Container className="py-8 sm:py-10 lg:py-12">
        {heading}
        <div className="max-w-xl space-y-4">
          <ErrorMessage message={error} />
          <Button
            onClick={() => dispatch(fetchCart())}
            type="button"
            variant="outline"
          >
            Try again
          </Button>
        </div>
      </Container>
    );
  }

  if (!items.length) {
    return (
      <Container className="py-8 sm:py-10 lg:py-12">
        {heading}
        <CartEmptyState />
      </Container>
    );
  }

  return (
    <Container className="py-8 sm:py-10 lg:py-12">
      {heading}
      {error || orderError ? (
        <ErrorMessage className="mb-5" message={orderError || error} />
      ) : null}
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-6">
        <section
          aria-labelledby="checkout-items-title"
          className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.035)] sm:p-6"
        >
          <div className="mb-2 flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <h2
              className="text-base font-semibold tracking-tight text-slate-900"
              id="checkout-items-title"
            >
              Your items
            </h2>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium tabular-nums text-slate-600">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </div>
          <div>
            {items.map((item) => (
              <CheckoutItem item={item} key={item.id} />
            ))}
          </div>
        </section>
        <CheckoutSummary
          grandTotal={grandTotal}
          isSubmitting={isSubmitting}
          itemCount={totalItems}
          onPlaceOrder={handlePlaceOrder}
        />
      </div>
    </Container>
  );
}

export default CheckoutPage;
