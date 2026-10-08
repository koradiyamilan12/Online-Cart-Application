import { memo, useEffect, useState } from "react";
import { FiCheck, FiPlus, FiShoppingBag } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

function ProductCard({ product, onAddToCart, isAdding, isDisabled }) {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (!isAdded) return undefined;
    const timeoutId = window.setTimeout(() => setIsAdded(false), 1600);
    return () => window.clearTimeout(timeoutId);
  }, [isAdded]);

  if (!product) return null;

  const handleAddToCart = async () => {
    if (!onAddToCart || isAdding || isDisabled) return;
    const result = await onAddToCart(product);
    if (result?.meta?.requestStatus === "fulfilled") setIsAdded(true);
  };

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-[transform,border-color,box-shadow] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_12px_30px_rgba(26,32,55,0.09)]">
      <div className="relative flex aspect-[1.55/1] items-center justify-center overflow-hidden bg-gradient-to-br from-brand-50 via-white to-slate-100">
        <div
          aria-hidden="true"
          className="absolute -right-8 -top-10 size-36 rounded-full border border-brand-100/80 transition-transform duration-300 motion-safe:group-hover:scale-110"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-14 -left-5 size-36 rounded-full bg-white/70"
        />
        <div className="relative grid size-[4.5rem] place-items-center rounded-[1.4rem] bg-white text-brand-600 shadow-[0_8px_26px_rgba(65,57,159,0.12)] ring-1 ring-brand-100/80 transition-transform duration-200 motion-safe:group-hover:-translate-y-1">
          <FiShoppingBag aria-hidden="true" className="size-8" />
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="line-clamp-2 min-h-12 text-base font-semibold leading-6 tracking-tight text-slate-900">
          {product.name}
        </h2>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-slate-500">Price</p>
            <p className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
              {formatCurrency(product.price)}
            </p>
          </div>
        </div>
        <Button
          aria-label={
            isAdding
              ? `Adding ${product.name} to cart`
              : isAdded
                ? `${product.name} added to cart`
                : `Add ${product.name} to cart`
          }
          className="mt-5 w-full"
          disabled={Boolean(isDisabled)}
          loading={isAdding}
          loadingText="Adding…"
          onClick={handleAddToCart}
          type="button"
          variant={isAdded ? "secondary" : "default"}
        >
          {isAdded ? (
            <FiCheck aria-hidden="true" className="size-4" />
          ) : (
            <FiPlus aria-hidden="true" className="size-4" />
          )}
          {isAdded ? "Added to cart" : "Add to cart"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default memo(ProductCard);
