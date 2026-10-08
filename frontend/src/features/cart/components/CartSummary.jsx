import { FiArrowRight, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";

function CartSummary({ itemCount, grandTotal }) {
  return (
    <aside className="h-fit rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.035)] sm:p-6 lg:sticky lg:top-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        Order summary
      </p>
      <div className="mt-5 flex items-center justify-between text-sm text-slate-600">
        <span>Items</span>
        <span className="font-medium tabular-nums text-slate-800">
          {itemCount}
        </span>
      </div>
      <div className="mt-4 border-t border-slate-100 pt-4">
        <div className="flex items-end justify-between gap-3">
          <span className="text-sm font-medium text-slate-700">Total</span>
          <span className="text-xl font-semibold tabular-nums tracking-tight text-slate-950">
            {formatCurrency(grandTotal)}
          </span>
        </div>
      </div>
      <Link
        className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full")}
        to={ROUTES.CHECKOUT}
      >
        Continue to checkout
        <FiArrowRight aria-hidden="true" className="size-4" />
      </Link>
      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
        <FiLock aria-hidden="true" className="size-3.5" /> Secure checkout
      </p>
    </aside>
  );
}

export default CartSummary;
