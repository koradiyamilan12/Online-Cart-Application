import { FiPlus, FiShoppingCart } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

function ProductCard({ product, onAddToCart }) {
  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <Card className="group overflow-hidden border-slate-200 transition-shadow hover:shadow-md">
      <div className="flex h-32 items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-slate-100">
        <div className="grid size-16 place-items-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
          <FiShoppingCart aria-hidden="true" className="size-7 text-indigo-600" />
        </div>
      </div>

      <CardContent className="space-y-5 pt-5">
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-600">Featured</p>
          <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Price</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">{formatCurrency(product.price)}</p>
          </div>

          <Button className="gap-2" onClick={handleAddToCart} type="button">
            <FiPlus aria-hidden="true" className="size-4" />
            Add to cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
