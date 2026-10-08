import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import ErrorMessage from "@/components/common/ErrorMessage";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/button-variants";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import CartEmptyState from "@/features/cart/components/CartEmptyState";
import CartList from "@/features/cart/components/CartList";
import CartSkeleton from "@/features/cart/components/CartSkeleton";
import CartSummary from "@/features/cart/components/CartSummary";
import {
  decreaseCartItem,
  fetchCart,
  increaseCartItem,
  removeCartItem,
  selectCartState,
} from "@/features/cart/slices/cartSlice";

function CartPage() {
  const dispatch = useDispatch();

  const [itemToRemove, setItemToRemove] = useState(null);
  const {
    items,
    grandTotal,
    totalItems,
    isLoading,
    isMutating,
    mutatingItemId,
    error,
  } = useSelector(selectCartState);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrease = useCallback(
    async (cartItemId) => {
      const result = await dispatch(increaseCartItem(cartItemId));
      if (increaseCartItem.fulfilled.match(result)) {
        toast.success("Quantity updated.", { id: "cart-quantity-updated" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
    [dispatch],
  );
  const handleDecrease = useCallback(
    async (cartItemId) => {
      const result = await dispatch(decreaseCartItem(cartItemId));
      if (decreaseCartItem.fulfilled.match(result)) {
        toast.success("Quantity updated.", { id: "cart-quantity-updated" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
    [dispatch],
  );
  const handleRemove = useCallback(
    async (cartItemId) => {
      const result = await dispatch(removeCartItem(cartItemId));
      if (removeCartItem.fulfilled.match(result)) {
        toast.success("Product removed from cart.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      setItemToRemove(null);
    },
    [dispatch],
  );
  const refreshCart = useCallback(() => dispatch(fetchCart()), [dispatch]);
  const heading = (
    <PageHeader
      action={
        <Link
          className={cn(buttonVariants({ variant: "ghost" }), "gap-2")}
          to={ROUTES.DASHBOARD}
        >
          <FiArrowLeft aria-hidden="true" className="size-4" /> Continue
          shopping
        </Link>
      }
      description={`${totalItems} ${totalItems === 1 ? "item" : "items"} in your cart. Review your picks before checkout.`}
      eyebrow="Your selection"
      title="Shopping cart"
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
          <Button onClick={refreshCart} type="button" variant="outline">
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
      {error ? <ErrorMessage className="mb-5" message={error} /> : null}
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-6">
        <CartList
          isMutating={isMutating}
          items={items}
          mutatingItemId={mutatingItemId}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
          onRemove={setItemToRemove}
        />
        <CartSummary grandTotal={grandTotal} itemCount={totalItems} />
      </div>
      <ConfirmDialog
        cancelLabel="Cancel"
        confirmLabel="Remove"
        description="Are you sure you want to remove this product from your cart?"
        loading={Boolean(
          itemToRemove && isMutating && mutatingItemId === itemToRemove.id,
        )}
        loadingText="Removing…"
        onConfirm={() => handleRemove(itemToRemove.id)}
        onOpenChange={(open) => {
          if (!open) setItemToRemove(null);
        }}
        open={Boolean(itemToRemove)}
        title="Remove item?"
      />
    </Container>
  );
}

export default CartPage;
