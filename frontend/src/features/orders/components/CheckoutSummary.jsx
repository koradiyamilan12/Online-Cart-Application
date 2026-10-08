import { FiCheck, FiLock } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

function CheckoutSummary({
  grandTotal,
  itemCount,
  isSubmitting,
  onPlaceOrder,
}) {
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
      <Button
        aria-label={isSubmitting ? "Placing order" : "Place order"}
        className="mt-6 w-full gap-2"
        loading={isSubmitting}
        loadingText="Placing order…"
        onClick={onPlaceOrder}
        type="button"
        size="lg"
      >
        <>
          <FiCheck aria-hidden="true" className="size-4" /> Place order
        </>
      </Button>
      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
        <FiLock aria-hidden="true" className="size-3.5" /> Secure order
        processing
      </p>
    </aside>
  );
}

export default CheckoutSummary;
