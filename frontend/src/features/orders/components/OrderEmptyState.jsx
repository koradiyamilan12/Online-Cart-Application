import { FiArrowRight, FiPackage, FiRefreshCw } from "react-icons/fi";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button-variants";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

function OrderEmptyState({ onRefresh }) {
  return (
    <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-[0_2px_8px_rgba(15,23,42,0.025)] sm:py-16">
      <span className="mx-auto grid size-16 place-items-center rounded-[1.35rem] bg-brand-50 text-brand-700">
        <FiPackage aria-hidden="true" className="size-7" />
      </span>
      <h2 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">
        No orders yet
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">
        Your completed orders will appear here.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Link className={cn(buttonVariants(), "gap-2")} to={ROUTES.DASHBOARD}>
          Browse products <FiArrowRight aria-hidden="true" className="size-4" />
        </Link>
        {onRefresh ? (
          <Button
            className="gap-2"
            onClick={onRefresh}
            type="button"
            variant="outline"
          >
            <FiRefreshCw aria-hidden="true" className="size-4" /> Refresh orders
          </Button>
        ) : null}
      </div>
    </section>
  );
}

export default OrderEmptyState;
