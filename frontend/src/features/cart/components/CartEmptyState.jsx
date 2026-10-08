import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

function CartEmptyState() {
  return (
    <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-[0_2px_8px_rgba(15,23,42,0.025)] sm:py-16">
      <span className="mx-auto grid size-16 place-items-center rounded-[1.35rem] bg-brand-50 text-brand-700">
        <FiShoppingBag aria-hidden="true" className="size-7" />
      </span>
      <h2 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">
        Your cart is empty
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">
        Add some products to get started.
      </p>
      <Link className={cn(buttonVariants(), "mt-6")} to={ROUTES.DASHBOARD}>
        Continue shopping <FiArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </section>
  );
}

export default CartEmptyState;
