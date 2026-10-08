import { FiCalendar, FiPackage } from "react-icons/fi";
import { formatCurrency } from "@/lib/utils";

function OrderSummary({ createdAt, itemCount, totalAmount }) {
  const dateLabel = createdAt
    ? new Date(createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <aside className="h-fit rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.035)] sm:p-6 lg:sticky lg:top-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        Order summary
      </p>
      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between gap-3 text-sm text-slate-600">
          <span className="inline-flex items-center gap-2">
            <FiPackage aria-hidden="true" className="size-4 text-slate-400" />{" "}
            Items
          </span>
          <span className="font-medium tabular-nums text-slate-800">
            {itemCount}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 text-sm text-slate-600">
          <span className="inline-flex items-center gap-2">
            <FiCalendar aria-hidden="true" className="size-4 text-slate-400" />{" "}
            Placed on
          </span>
          <span className="font-medium text-slate-800">{dateLabel}</span>
        </div>
        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-end justify-between gap-3">
            <span className="text-sm font-medium text-slate-700">Total</span>
            <span className="text-xl font-semibold tabular-nums tracking-tight text-slate-950">
              {formatCurrency(totalAmount)}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default OrderSummary;
