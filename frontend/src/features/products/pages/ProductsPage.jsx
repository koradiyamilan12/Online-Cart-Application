import { FiRefreshCw } from "react-icons/fi";
import { useDispatch } from "react-redux";
import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/features/products/components/ProductGrid";
import ProductListSkeleton from "@/features/products/components/ProductListSkeleton";
import useProducts from "@/features/products/hooks/useProducts";
import { fetchProducts } from "@/store/slices/productSlice";

function ProductsPage() {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useProducts();

  const handleRefresh = () => {
    dispatch(fetchProducts());
  };

  if (isLoading) {
    return (
      <Container className="py-8 sm:py-10 lg:py-12">
        <ProductListSkeleton />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-8 sm:py-10 lg:py-12">
        <div className="space-y-4">
          <ErrorMessage message={error} />
          <Button className="gap-2" onClick={handleRefresh} type="button" variant="outline">
            <FiRefreshCw aria-hidden="true" className="size-4" />
            Try again
          </Button>
        </div>
      </Container>
    );
  }

  if (!products.length) {
    return (
      <Container className="py-8 sm:py-10 lg:py-12">
        <EmptyState
          action={
            <Button className="gap-2" onClick={handleRefresh} type="button" variant="outline">
              <FiRefreshCw aria-hidden="true" className="size-4" />
              Refresh products
            </Button>
          }
          description="The catalog is empty right now. Check back shortly for new arrivals."
          title="No products available"
        />
      </Container>
    );
  }

  return (
    <Container className="py-8 sm:py-10 lg:py-12">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Explore products</h1>
        </div>
        <p className="text-sm text-slate-600">{products.length} items available</p>
      </div>

      <ProductGrid products={products} />
    </Container>
  );
}

export default ProductsPage;
