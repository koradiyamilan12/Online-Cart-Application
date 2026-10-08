import { useCallback } from "react";
import { FiRefreshCw } from "react-icons/fi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import {
  addToCart,
  selectIsCartMutating,
  selectPendingCartProductId,
} from "@/features/cart/slices/cartSlice";
import ProductGrid from "@/features/products/components/ProductGrid";
import ProductListSkeleton from "@/features/products/components/ProductListSkeleton";
import useProducts from "@/features/products/hooks/useProducts";
import { fetchProducts } from "@/store/slices/productSlice";

function ProductsPage() {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useProducts();
  const pendingProductId = useSelector(selectPendingCartProductId);
  const isMutating = useSelector(selectIsCartMutating);

  const handleRefresh = () => {
    dispatch(fetchProducts());
  };

  const handleAddToCart = useCallback(
    async (product) => {
      const result = await dispatch(
        addToCart({ productId: product.id, quantity: 1 }),
      );

      if (addToCart.fulfilled.match(result)) {
        toast.success("Product added to cart.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }

      return result;
    },
    [dispatch],
  );

  return (
    <Container className="py-8 sm:py-10 lg:py-12">
      <PageHeader
        description="Browse the collection and find something that fits your day."
        eyebrow="The collection"
        title="Discover products"
        action={
          products.length > 0 ? (
            <span className="inline-flex rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600">
              {products.length} {products.length === 1 ? "item" : "items"}
            </span>
          ) : null
        }
      />

      {isLoading ? <ProductListSkeleton /> : null}

      {!isLoading && error ? (
        <div className="space-y-4">
          <ErrorMessage message={error} />
          <Button
            className="gap-2"
            onClick={handleRefresh}
            type="button"
            variant="outline"
          >
            <FiRefreshCw aria-hidden="true" className="size-4" />
            Try again
          </Button>
        </div>
      ) : null}

      {!isLoading && !error && !products.length ? (
        <EmptyState
          action={
            <Button
              className="gap-2"
              onClick={handleRefresh}
              type="button"
              variant="outline"
            >
              <FiRefreshCw aria-hidden="true" className="size-4" />
              Refresh products
            </Button>
          }
          description="The catalog is empty right now. Check back shortly for new arrivals."
          title="No products available"
        />
      ) : null}

      {!isLoading && !error && products.length ? (
        <ProductGrid
          addingProductId={pendingProductId}
          isMutating={isMutating}
          onAddToCart={handleAddToCart}
          products={products}
        />
      ) : null}
    </Container>
  );
}

export default ProductsPage;
