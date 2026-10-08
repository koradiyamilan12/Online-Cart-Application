import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

function CartSummary({ itemCount, grandTotal }) {
  const navigate = useNavigate();

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.22em] text-indigo-600">Order summary</p>
      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Items</span>
          <span>{itemCount}</span>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-base font-semibold text-slate-900">
          <span>Total</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>
      </div>

      <Button className="mt-6 w-full gap-2" onClick={() => navigate(ROUTES.CHECKOUT)} type="button">
        Proceed to checkout
        <FiArrowRight aria-hidden="true" className="size-4" />
      </Button>
    </aside>
  );
}

export default CartSummary;
