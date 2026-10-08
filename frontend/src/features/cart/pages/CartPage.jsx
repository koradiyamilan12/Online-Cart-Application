import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowLeft, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "@/components/common/ErrorMessage";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
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
  const navigate = useNavigate();
  const { items, grandTotal, totalItems, isLoading, isMutating, mutatingItemId, error } = useSelector(selectCartState);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchCart());
  };

  const handleIncrease = (cartItemId) => {
    dispatch(increaseCartItem(cartItemId));
  };

  const handleDecrease = (cartItemId) => {
    dispatch(decreaseCartItem(cartItemId));
  };

  const handleRemove = (cartItemId) => {
    dispatch(removeCartItem(cartItemId));
  };

  if (isLoading) {
    return (
      <Container className="py-8 sm:py-10 lg:py-12">
        <CartSkeleton />
      </Container>
    );
  }

  if (error && !items.length) {
    return (
      <Container className="py-8 sm:py-10 lg:py-12">
        <div className="space-y-4">
          <ErrorMessage message={error} />
          <Button className="gap-2" onClick={handleRefresh} type="button" variant="outline">
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
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-600">Shopping cart</p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Your cart</h1>
          </div>
        </div>

        <Button className="gap-2" onClick={() => navigate(ROUTES.DASHBOARD)} type="button" variant="ghost">
          <FiArrowLeft aria-hidden="true" className="size-4" />
          Continue shopping
        </Button>
      </div>

      {error ? (
        <div className="mb-4">
          <ErrorMessage message={error} />
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <CartList
          isMutating={isMutating}
          items={items}
          mutatingItemId={mutatingItemId}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
          onRemove={handleRemove}
        />
        <CartSummary grandTotal={grandTotal} itemCount={totalItems} />
      </div>
    </Container>
  );
}

export default CartPage;
