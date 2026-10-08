import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";

function CartEmptyState() {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
      <FiShoppingBag aria-hidden="true" className="mx-auto size-10 text-indigo-600" />
      <h2 className="mt-4 text-xl font-semibold text-slate-900">Your cart is empty</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">Browse products and add something you like.</p>
      <Button className="mt-5 gap-2" onClick={() => navigate(ROUTES.DASHBOARD)} type="button" variant="outline">
        Continue shopping
        <FiArrowRight aria-hidden="true" className="size-4" />
      </Button>
    </div>
  );
}

export default CartEmptyState;
